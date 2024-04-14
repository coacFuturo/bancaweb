import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Banner } from 'src/app/models/Banner';
import { Visita } from 'src/app/models/Visita';
import { BanersService } from 'src/app/services/baners.service';
import { Fecha } from 'src/app/services/fecha.service';
import { UserService } from 'src/app/services/user.service';
import { VisitasService } from 'src/app/services/visitas.service';
import Swal from 'sweetalert2';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  anio = new Date().getFullYear();
  deviceType = 'web';

  public formSubmitted = false;
  public loginForm = this.fb.group({
    nick: ['Jordan', Validators.required],
    password: ['1GTKG7', Validators.required],
  });

  public passEstado: boolean = false;
  public visita: Visita = new Visita('', '', '');
  public banners: Banner[] = [];
  public primerBanner: string = '';
  public urlGlobal: string = 'https://sistemflm.futurolamanense.fin.ec/archivosCoat/banersbancadigital/';


  constructor(
    private fb: FormBuilder,
    private userServices: UserService,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private _visitaService: VisitasService,
    private _bannerService: BanersService,
    private deviceService: DeviceDetectorService,

  ) {
    sessionStorage.removeItem('token');
    this.getDevice();
  }

  getDevice() {
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();

    if (isMobile) {
      this.deviceType = 'movil';
    } else if (isTablet) {
      this.deviceType = 'movil';
    } else if (isDesktopDevice) {
      this.deviceType = 'web';
    }
  }

  getBanners(): void {
    this._bannerService.getAll().subscribe(
      response => {
        var data = response.response;
        this.primerBanner = data[0].imagen;
        for (let i = 0; i < data.length; i++) {
          if (i > 0) {
            this.banners.push(data[i]);
          }
        }
      }, error => {
        console.log(error);
      }
    )
  }

  agregarVisita(): void {
    this.visita = new Visita(this.mascaraFecha(Fecha.fechaActual()), Fecha.horaActual(), 'Página Web');
    this._visitaService.agregarVisitaUser(this.visita).subscribe(
      response => { }, error => {
        console.log(error);
      }
    )
  }

  mascaraFecha(fecha): string {
    var partes = fecha.split('');
    let anio = partes[0] + partes[1] + partes[2] + partes[3];
    let mes = partes[4] + partes[5];
    let dia = partes[6] + partes[7];

    return anio + '-' + mes + '-' + dia;
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

  callUser() {
    this.spinner.show();
    if (this.loginForm.invalid) {
      this.spinner.hide();
      return;
    }
    this.userServices.callUser(this.loginForm.value).subscribe(
      (resp) => {
        console.log(resp)
        this.spinner.hide();
        this.agregarVisita();
        this._router.navigate(['/banca/cuentas']);
      },
      (err) => {
        console.log('Error CA001');
        this.spinner.hide();
        Swal.fire('Error', err.error.er.message, 'error');
      }
    );
  }

  NotValid(validar: string): boolean {
    if (this.loginForm.get(validar).invalid && this.formSubmitted) {
      return true;
    } else return false;
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  ngAfterViewInit() {
    this.loadScript('../assets/javascript/theme.js');
  }

  ngOnInit(): void {
    this.getBanners();
  }
}
