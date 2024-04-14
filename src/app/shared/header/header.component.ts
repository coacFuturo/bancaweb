import { Component, OnInit } from '@angular/core';
import { Password, VerificacionPass } from 'src/app/models/Pasword';
import { TransferenciaService } from 'src/app/services/tranferencias.service';
import { UserService } from 'src/app/services/user.service';
import { modalCambiarClaveOpen, modalCambiarClaveClose, modalVerificarClaveOpen, modalVerificarClaveClose, modalComprobaUpPassOpen, modalComprobaUpPassClose, } from 'src/assets/modal.js';
import Swal from 'sweetalert2';
import { Verificacion } from 'src/app/models/Beneficiario';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public nombre: string;
  public nick: string;
  public img: string;
  public oficina: string;

  public passwordCreate: Password = new Password('', '');
  public estadoPassword: string = 'espera';
  public claveAprobada: number = 0;
  public passwordVerificacion: VerificacionPass = new VerificacionPass('');
  public passwordEstado: string = '';
  public codigoVerificacion: string = '';
  public verificacion: Verificacion = new Verificacion('');
  public codigoCorrecto: boolean = false;
  public codigoIncorrecto: boolean = false;
  public codigoEnviado: boolean = false;

  constructor(
    private userServices: UserService,
    private _trasferenciaService: TransferenciaService,
    private spinner: NgxSpinnerService
  ) {
    this.nombre = userServices.usuario.getNombre;
    this.nick = userServices.usuario.getNick;
    this.img = userServices.usuario.getImg;
    this.oficina = userServices.usuario.getOficina;
  }

  ngOnInit(): void {

  }

  newCodigo(): void {
    if (this.codigoVerificacion.length == 6) {
      this.verificarCodigo();
    }
  }

  closeComprobacion(): void {
    modalComprobaUpPassClose();
    modalVerificarClaveOpen();
  }

  AbrirModalUpdatePass(): void {
    modalComprobaUpPassOpen();
  }

  solicitarCodigo(): void {
    this.spinner.show();
    this._trasferenciaService.solicitarCodigo().subscribe(
      response => {
        this.codigoEnviado = true;
        this.spinner.hide();
        setTimeout(() => {
          this.codigoEnviado = false;
        }, 3000);
      }, error => {
        this.spinner.hide();
        this.codigoEnviado = false;
        console.log(error);
      }
    );
  }

  verificarCodigo(): void {
    this.spinner.show();
    this.verificacion.checker = this.codigoVerificacion;
    this._trasferenciaService.verificarCodigo(this.verificacion).subscribe(
      (response: any) => {
        if (response.ok == true) {
          this.codigoCorrecto = true;
          this.codigoIncorrecto = false;
        } else {
          this.codigoCorrecto = false;
          this.codigoIncorrecto = true;
        }
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        this.codigoIncorrecto = true;
      }
    );
  }

  actualizarClave(): void {
    this.spinner.show();
    this.userServices.createPassword(this.passwordCreate).subscribe(
      (response) => {
        this.spinner.hide();
        modalCambiarClaveClose();
        Swal.fire('Contraseña actualizada correctamente!!', '', 'success');
        this.logout();
      }, (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  verificarClaveActual(): void {
    this.spinner.show();
    this.userServices.verificarPassword(this.passwordVerificacion).subscribe(
      (response: any) => {
        this.spinner.hide();
        if (response.ok == true) {
          modalVerificarClaveClose();
          modalCambiarClaveOpen();
          this.passwordEstado = 'correcto';
        } else {
          this.passwordEstado = 'incorrecto';
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  validarClaves(): void {
    if (this.passwordCreate.password == this.passwordCreate.passwordV) {
      this.estadoPassword = 'correcto';
      this.validatePassword(this.passwordCreate.password);
    } else {
      this.estadoPassword = 'incorrecto';
      this.claveAprobada = 0;
    }
  }

  validatePassword(password): void {
    if (password.length >= 6) {
      var mayuscula = false;
      var minuscula = false;
      var numero = false;
      var caracterEsp = false;
      for (var i = 0; i < password.length; i++) {
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
          mayuscula = true;
        } else if (
          password.charCodeAt(i) >= 97 &&
          password.charCodeAt(i) <= 122
        ) {
          minuscula = true;
        } else if (
          password.charCodeAt(i) >= 48 &&
          password.charCodeAt(i) <= 57
        ) {
          numero = true;
        } else {
          caracterEsp = true;
        }
      }
      if (
        mayuscula == true &&
        minuscula == true &&
        caracterEsp == true &&
        numero == true
      ) {
        this.claveAprobada = 1;
      } else {
        this.claveAprobada = 2;
      }
    }
  }

  logout() {
    this.userServices.logout();
  }
}
