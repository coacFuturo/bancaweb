import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  modalComprobacionRegistroOpen,
  modalComprobacionRegistroClose,
  modalAsignarPasswordOpen,
  modalAsignarPasswordClose,
} from 'src/assets/modal.js';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransferenciaService } from 'src/app/services/tranferencias.service';
import { Verificacion } from 'src/app/models/Beneficiario';
import { Password } from 'src/app/models/Pasword';
import { Router } from '@angular/router';
import { VisitasService } from 'src/app/services/visitas.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;
  public registerForm = this.fb.group({
    cuenta: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    cedula: ['', [Validators.required]],
    sms: [false, Validators.required],
    nick: ['', Validators.required],
    terminos: ['', Validators.required],
  });
  public verificacion: Verificacion = new Verificacion('');
  public terminos: boolean = false;
  public codigoCorrecto: boolean = false;
  public codigoIncorrecto: boolean = false;
  public codigoVerificacion: string = '';
  public passwordCreate: Password = new Password('', '');
  public estadoPassword: string = 'espera';
  public claveAprobada: number = 0;

  public passEstado: boolean = false;
  public passEstado2: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userServices: UserService,
    private spinner: NgxSpinnerService,
    private _tranferenciaService: TransferenciaService,
    private _router: Router,
    private _visitaService: VisitasService
  ) { }

  ngOnInit(): void {
  }

  isActiveToggleTextPassword: Boolean = true;
  toggleTextPassword(): void {
    if (this.passEstado == false) {
      this.passEstado = true;
    } else if (this.passEstado == true) {
      this.passEstado = false;
    }
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }

  getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

  isActiveToggleTextPassword2: Boolean = true;
  toggleTextPassword2(): void {
    if (this.passEstado2 == false) {
      this.passEstado2 = true;
    } else if (this.passEstado2 == true) {
      this.passEstado2 = false;
    }
    this.isActiveToggleTextPassword2 = (this.isActiveToggleTextPassword2 == true) ? false : true;
  }

  getType2() {
    return this.isActiveToggleTextPassword2 ? 'password' : 'text';
  }

  newCodigo($event): void {
    this.codigoVerificacion = $event;
    this.verificarCodigo();
  }

  closeComprobacion(): void {
    modalComprobacionRegistroClose();
    modalAsignarPasswordOpen();
  }

  registrarContrasenas(): void {
    if (this.passwordCreate.password == this.passwordCreate.passwordV) {
      this.userServices.createPassword(this.passwordCreate).subscribe(
        (response) => {
          modalAsignarPasswordClose();
          Swal.fire('Proceso finalizado correctamente!!', '', 'success');
          this.aumentarUsuarioRegistrado();
          this._router.navigateByUrl('/banca/cuentas');
        },
        (error) => {
          console.log('Error RCRC001');
          Swal.fire('Error al registrar!!', '', 'error');
        }
      );
    } else {
      this.estadoPassword = 'incorrecto';
      this.claveAprobada = 0;
    }
  }

  aumentarUsuarioRegistrado(): void {
    this._visitaService.aumentarUsuarios().subscribe(
      response => { }, error => {
        console.log(error)
      }
    )
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

  validarClaves(): void {
    if (this.passwordCreate.password == this.passwordCreate.passwordV) {
      this.estadoPassword = 'correcto';
      this.validatePassword(this.passwordCreate.password);
    } else {
      this.estadoPassword = 'incorrecto';
      this.claveAprobada = 0;
    }
  }



  verificarCodigo(): void {
    this.spinner.show();
    this.verificacion.checker = this.codigoVerificacion;
    this._tranferenciaService.verificarCodigo(this.verificacion).subscribe(
      (response: any) => {
        if (response.ok == true) {
          this.codigoCorrecto = true;
          this.codigoIncorrecto = false;
        } else {
          this.codigoCorrecto = false;
          this.codigoIncorrecto = true;
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.log('Error RCVC001');
        this.codigoIncorrecto = true;
      }
    );
  }

  newUser() {
    this.spinner.show();
    this.formSubmitted = true;
    if (this.registerForm.invalid) return;
    this.userServices.createUSer(this.registerForm.value).subscribe(
      (resp) => {
        //this.solicitarCodigo()
        modalComprobacionRegistroOpen();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        Swal.fire('Error', JSON.stringify(err.error), 'error');
      }
    );
  }

  solicitarCodigo(): void {
    this.spinner.show();
    this._tranferenciaService.solicitarCodigo().subscribe(
      (response) => {
        this.spinner.hide();
      }, (error) => {
        console.log('Error TCSC001');
        this.spinner.hide();
      }
    );
  }

  onChange() {
    this.terminos = !this.terminos;
  }

  NotValid(validar: string): boolean {
    if (this.registerForm.get(validar).invalid && this.formSubmitted) {
      return true;
    } else return false;
  }
}
