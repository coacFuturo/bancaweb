import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-verificacion',
  templateUrl: './form-verificacion.component.html',
  styleUrls: ['./form-verificacion.component.css']
})
export class FormVerificacionComponent implements OnInit {

  @Output() codigo: EventEmitter<string> = new EventEmitter();

  public num1: string = '';
  public num2: string = '';
  public num3: string = '';
  public num4: string = '';
  public num5: string = '';
  public num6: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  enviarCodigo(): void {
    let cod = this.num1+this.num2+this.num3+this.num4+this.num5+this.num6;
    this.codigo.emit(cod)
  }

}
