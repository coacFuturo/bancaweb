import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styles: [],
})
export class InvestmentComponent implements OnInit {
  public Inversiones: any[];

  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getInversiones();
  }

  irAPlazoFijo(): void {
    window.open('https://futurolamanense.fin.ec/plazo-fijo/', '_blank');
  }

  getInversiones(): void {
    this.spinner.show();
    this.authService.callConsolidated().subscribe(
      (resp: any) => {
        this.Inversiones = resp.depositos;
        if (resp.cuentas) {
          console.log('ok');
        }
        this.spinner.hide();
      },
      (err) => {
        console.log('Error ICI001');
        this.spinner.hide();
      }
    );
  }

  mascaraFechas(fecha: any): any {
    var event = new Date(fecha);
    let date = JSON.stringify(event);
    date = date.slice(1, 11);
    return date;
  }
}
