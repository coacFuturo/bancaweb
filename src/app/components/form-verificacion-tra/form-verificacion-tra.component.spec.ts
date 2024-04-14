import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVerificacionTraComponent } from './form-verificacion-tra.component';

describe('FormVerificacionTraComponent', () => {
  let component: FormVerificacionTraComponent;
  let fixture: ComponentFixture<FormVerificacionTraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVerificacionTraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVerificacionTraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
