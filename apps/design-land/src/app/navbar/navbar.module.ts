import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  DaffArticleModule,
  DaffNavbarModule,
} from '@daffodil/design';

import { DesignLandArticleEncapsulatedModule } from '../core/article-encapsulated/article-encapsulated.module';
import { DesignLandExampleViewerModule } from '../core/code-preview/container/example-viewer.module';
import { DesignLandNavbarRoutingModule } from './navbar-routing.module';
import { DesignLandNavbarComponent } from './navbar.component';


@NgModule({
  declarations: [
    DesignLandNavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    DesignLandNavbarRoutingModule,
    DesignLandExampleViewerModule,

    DaffNavbarModule,
    DaffArticleModule,
    DesignLandArticleEncapsulatedModule,
  ],
})
export class DesignLandNavbarModule { }
