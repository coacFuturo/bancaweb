import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { FormVerificacionModule } from '../components/form-verificacion/form-verificacion.module';
import { SpinnerModule } from '../components/spinner/spinner.module';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    AsideComponent,
    FooterComponent,
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    AsideComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule,FormsModule, FormVerificacionModule, SpinnerModule],
})
export class SharedModule {}
