import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimuladorInversionesComponent } from './simulador-inversiones.component';

describe('SimuladorInversionesComponent', () => {
  let component: SimuladorInversionesComponent;
  let fixture: ComponentFixture<SimuladorInversionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimuladorInversionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimuladorInversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
