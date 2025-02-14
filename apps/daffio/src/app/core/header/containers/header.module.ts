import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DaffLogoModule } from '@daffodil/branding';
import { DaffButtonModule } from '@daffodil/design';
import { DaffThemeSwitchButtonModule } from '@daffodil/theme-switch';

import { DaffioHeaderComponentModule } from '../components/header.module';
import { DaffioHeaderContainer } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    DaffioHeaderComponentModule,
    DaffLogoModule,
    DaffButtonModule,
    DaffThemeSwitchButtonModule,

    FontAwesomeModule,
  ],
  declarations: [
    DaffioHeaderContainer,
  ],
  exports: [
    DaffioHeaderContainer,
  ],
})
export class DaffioHeaderModule { }
