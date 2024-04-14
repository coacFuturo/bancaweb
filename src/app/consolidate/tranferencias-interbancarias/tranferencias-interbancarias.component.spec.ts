import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranferenciasInterbancariasComponent } from './tranferencias-interbancarias.component';

describe('TranferenciasInterbancariasComponent', () => {
  let component: TranferenciasInterbancariasComponent;
  let fixture: ComponentFixture<TranferenciasInterbancariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranferenciasInterbancariasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranferenciasInterbancariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
