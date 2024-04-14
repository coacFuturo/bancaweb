import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioOdontologiaComponent } from './servicio-odontologia.component';

describe('ServicioOdontologiaComponent', () => {
  let component: ServicioOdontologiaComponent;
  let fixture: ComponentFixture<ServicioOdontologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioOdontologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioOdontologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
