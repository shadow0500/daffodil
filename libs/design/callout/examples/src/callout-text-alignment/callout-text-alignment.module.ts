import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  DaffButtonModule,
  DaffCalloutModule,
  DaffContainerModule,
} from '@daffodil/design';

import { CalloutTextAlignmentComponent } from './callout-text-alignment.component';

@NgModule({
  declarations: [
    CalloutTextAlignmentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DaffCalloutModule,
    DaffContainerModule,
    DaffButtonModule,
    FontAwesomeModule,
  ],
})
export class CalloutTextAlignmentModule { }
