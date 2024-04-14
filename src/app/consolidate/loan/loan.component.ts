import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styles: [],
})
export class LoanComponent implements OnInit {
  public movements: any[];
  public movementsForm;
  public Prestamos: any[];
  public numeroPrestamo: string = '';
  public tipoPrestamo: string = '';
  public numeroCuotas: string = '';
  public deudaInicial: string = '';
  public saldoActual: string = '';
  public oficina: string = '';
  public proximaCuota: string = '';
  public proximaFecha: string = '';
  public cuentaSecuencial: string;
  public ffin = new Date();
  public fini = new Date();
  public movementsEstado: string = 'esperando';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getCuentas();
  }

  irACreditos(): void {
    window.open('https://futurolamanense.fin.ec/credito-de-consumo/', '_blank');
  }

  getCuentas(): void {
    this.spinner.show();
    this.authService.callConsolidated().subscribe(
      (resp: any) => {
        this.Prestamos = resp.prestamos;
        if (resp.prestamos) {
          this.scanearPrestamos(this.Prestamos[0].NumeroPrestamo);
        }
        this.spinner.hide();
      },
      (err) => {
        console.log('Error LCC001');
        this.spinner.hide();
      }
    );
  }

  scanearPrestamos(numeroPrestamo: string): void {
    try {
      this.Prestamos.forEach((presta) => {
        if (presta.NumeroPrestamo == numeroPrestamo) {
          this.numeroPrestamo = presta.NumeroPrestamo;
          this.tipoPrestamo = presta.NombreTipoPrestamo;
          this.numeroCuotas = presta.NumeroCuotas;
          this.deudaInicial = presta.DeudaInicial;
          this.saldoActual = presta.SaldoActual;
          this.oficina = presta.NombreOficina;
          this.proximaCuota = presta.ValorParaCancelarHastaCuotaEnCurso;
          this.proximaFecha = presta.FechaProximoVencimiento;
          this.cuentaSecuencial = presta.Secuencial;
          this.movimientos(this.cuentaSecuencial, new Date(), new Date());
        }
      });
    } catch (error) {
      console.log('Error LCC002');
    }
  }

  mascaraFechas(fecha: any): any {
    var event = new Date(fecha);
    let date = JSON.stringify(event);
    date = date.slice(1, 11);
    return date;
  }

  convertirFechas(fecha: Date): any {
    var event = new Date(fecha);
    let date = JSON.stringify(event);
    date = date.slice(1, 11);
    return date;
  }

  movimientos(secuencial: string, fini: Date = null, ffin: Date = null) {
    const url = 'movimientop';
    if (fini == new Date()) {
      fini.setDate(this.ffin.getDate() - 30);
    }
    this.fini = this.convertirFechas(fini);
    this.ffin = this.convertirFechas(ffin);

    this.movementsForm = this.fb.group({
      secuencial: secuencial,
      tipo: 'prestamo',
      fini: fini.toISOString(),
      ffin: ffin.toISOString(),
    });
    this.movementsEstado = 'esperando';
    this.authService.movimiento(this.movementsForm.value, url).subscribe(
      (resp: any) => {
        if (
          resp.result.DevuelveMovimientoPrestamoPorSecuencialResult
            .DatoMovimientos.MovimientosPrestamoPorPagoResumen
            .MovimientoPrestamoComponenteCarteraPorPagoResumen
        ) {
          this.movements =
            resp.result.DevuelveMovimientoPrestamoPorSecuencialResult.DatoMovimientos.MovimientosPrestamoPorPagoResumen.MovimientoPrestamoComponenteCarteraPorPagoResumen;
          this.movementsEstado = 'con-datos';
        } else {
          this.movements = null;
          this.movementsEstado = 'sin-datos';
        }
      },
      (err) => {
        console.log('Error LCM001');
      }
    );
  }

  buscar(): void {
    this.movimientos(
      this.cuentaSecuencial,
      new Date(this.fini),
      new Date(this.ffin)
    );
  }
}
