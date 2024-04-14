import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioPeluqueriaComponent } from './servicio-peluqueria.component';

describe('ServicioPeluqueriaComponent', () => {
  let component: ServicioPeluqueriaComponent;
  let fixture: ComponentFixture<ServicioPeluqueriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioPeluqueriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioPeluqueriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
