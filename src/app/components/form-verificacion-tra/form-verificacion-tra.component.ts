import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-verificacion-tra',
  templateUrl: './form-verificacion-tra.component.html',
  styleUrls: ['./form-verificacion-tra.component.css']
})
export class FormVerificacionTraComponent implements OnInit {

  @Output() codigo: EventEmitter<string> = new EventEmitter();

  public numt1: string = '';
  public numt2: string = '';
  public numt3: string = '';
  public numt4: string = '';
  public numt5: string = '';
  public numt6: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  enviarCodigo(): void {
    let cod = this.numt1+this.numt2+this.numt3+this.numt4+this.numt5+this.numt6;
    this.codigo.emit(cod)
  }

}
