import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent {
  //@Input('renombrar') progres: number = 0;
  @Input() progres: number = 0;
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  cambiarProgress(v: number) {
    this.progres = this.progres + v;
    this.valorSalida.emit(this.progres);
    if (this.progres > 100) return (this.progres = 100);
    if (this.progres < 0) return (this.progres = 0);
  }
}
