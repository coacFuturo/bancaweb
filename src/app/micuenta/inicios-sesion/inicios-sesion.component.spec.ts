import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciosSesionComponent } from './inicios-sesion.component';

describe('IniciosSesionComponent', () => {
  let component: IniciosSesionComponent;
  let fixture: ComponentFixture<IniciosSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IniciosSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciosSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
