import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranferenciasInternasComponent } from './tranferencias-internas.component';

describe('TranferenciasInternasComponent', () => {
  let component: TranferenciasInternasComponent;
  let fixture: ComponentFixture<TranferenciasInternasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranferenciasInternasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranferenciasInternasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
