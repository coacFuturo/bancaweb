import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVerificacionComponent } from './form-verificacion.component';

describe('FormVerificacionComponent', () => {
  let component: FormVerificacionComponent;
  let fixture: ComponentFixture<FormVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVerificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
