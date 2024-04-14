import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorAhorroprogramadoComponent } from './simulador-ahorroprogramado.component';

describe('SimuladorAhorroprogramadoComponent', () => {
  let component: SimuladorAhorroprogramadoComponent;
  let fixture: ComponentFixture<SimuladorAhorroprogramadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuladorAhorroprogramadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladorAhorroprogramadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
