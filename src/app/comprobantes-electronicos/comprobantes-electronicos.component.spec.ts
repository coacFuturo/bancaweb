import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantesElectronicosComponent } from './comprobantes-electronicos.component';

describe('ComprobantesElectronicosComponent', () => {
  let component: ComprobantesElectronicosComponent;
  let fixture: ComponentFixture<ComprobantesElectronicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprobantesElectronicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobantesElectronicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
