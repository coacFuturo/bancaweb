import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Verificacion } from 'src/app/models/Beneficiario';
import { Password, VerificacionPass } from 'src/app/models/Pasword';
import { TransferenciaService } from 'src/app/services/tranferencias.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrls: ['./cambiar-clave.component.css']
})
export class CambiarClaveComponent implements OnInit {

  public codigoVerificacion: string = '';
  public verificacion: Verificacion = new Verificacion('');
  public codigoCorrecto: boolean = false;
  public codigoIncorrecto: boolean = false;
  public passwordVerificacion: VerificacionPass = new VerificacionPass('');

  public passwordEstado: string = '';

  public passEstado: boolean = false;
  public passEstado2: boolean = false;
  public passEstado3: boolean = false;

  public verificacionCodigoSms: boolean = false;
  public passwordCreate: Password = new Password('', '');
  public claveAprobada: number = 0;

  constructor(
    private _trasferenciaService: TransferenciaService,
    private spinner: NgxSpinnerService,
    private userServices: UserService,
  ) { }

  ngOnInit(): void {
  }

  actualizarClave(): void {
    this.spinner.show();
    this.userServices.createPassword(this.passwordCreate).subscribe(
      (response) => {
        this.spinner.hide();
        Swal.fire('Contraseña actualizada correctamente!!', '', 'success');
        this.logout();
      }, (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  logout() {
    this.userServices.logout();
  }

  isActiveToggleTextPassword: Boolean = true;
  isActiveToggleTextPassword2: Boolean = true;
  isActiveToggleTextPassword3: Boolean = true;

  toggleTextPassword(): void {
    if (this.passEstado == false) {
      this.passEstado = true;
    } else if (this.passEstado == true) {
      this.passEstado = false;
    }
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }

  toggleTextPassword2(): void {
    if (this.passEstado2 == false) {
      this.passEstado2 = true;
    } else if (this.passEstado2 == true) {
      this.passEstado2 = false;
    }
    this.isActiveToggleTextPassword2 = (this.isActiveToggleTextPassword2 == true) ? false : true;
  }

  toggleTextPassword3(): void {
    if (this.passEstado3 == false) {
      this.passEstado3 = true;
    } else if (this.passEstado3 == true) {
      this.passEstado3 = false;
    }
    this.isActiveToggleTextPassword3 = (this.isActiveToggleTextPassword3 == true) ? false : true;
  }

  getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  getType2() {
    return this.isActiveToggleTextPassword2 ? 'password' : 'text';
  }

  getType3() {
    return this.isActiveToggleTextPassword3 ? 'password' : 'text';
  }

  verificarClaveActual(): void {
    this.spinner.show();
    this.userServices.verificarPassword(this.passwordVerificacion).subscribe(
      (response: any) => {
        this.spinner.hide();
        if (response.ok == true) {
          this.passwordEstado = 'correcto';
          this.solicitarCodigo();
        } else {
          this.passwordEstado = 'incorrecto';
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }


  solicitarCodigo(): void {
    this.spinner.show();
    this._trasferenciaService.solicitarCodigo().subscribe(
      response => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  newCodigo(): void {
    if (this.codigoVerificacion.length == 6) {
      this.verificarCodigo();
    }
  }

  verificarCodigo(): void {
    this.spinner.show();
    this.verificacion.checker = this.codigoVerificacion;
    this._trasferenciaService.verificarCodigo(this.verificacion).subscribe(
      (response: any) => {
        if (response.ok == true) {
          this.codigoCorrecto = true;
          this.codigoIncorrecto = false;
          this.verificacionCodigoSms = true;
          this.passwordEstado = 'realizado'
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

  validarClaves(): void {
    if (this.passwordCreate.password == this.passwordCreate.passwordV) {
      this.validatePassword(this.passwordCreate.password);
    } else {
      this.claveAprobada = 0;
    }
  }

  validatePassword(password): void {
    if (password.length >= 6) {
      var numero = false;
      var caracterEsp = false;
      for (var i = 0; i < password.length; i++) {
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
          //mayusculas
        } else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
          // minusculas
        } else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
          numero = true;
        } else {
          caracterEsp = true;
        }
      }
      if (caracterEsp == true && numero == true) {
        this.claveAprobada = 1;
      } else {
        this.claveAprobada = 2;
      }
    }
  }

  /*
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
      if (mayuscula == true && minuscula == true && caracterEsp == true && numero == true) {
        this.claveAprobada = 1;
      } else {
        this.claveAprobada = 2;
      }
    }
  }
  */

}
