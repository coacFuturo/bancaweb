import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorCreditoComponent } from './simulador-credito.component';

describe('SimuladorCreditoComponent', () => {
  let component: SimuladorCreditoComponent;
  let fixture: ComponentFixture<SimuladorCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuladorCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladorCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
