import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AppMaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { DialogContentDeleteDialog } from './dashboard/dashboard.component';
import { DialogContentViewDialog } from './dashboard/dashboard.component';
import { DialogContentInsertDialog } from './dashboard/dashboard.component';
import { DialogContentEditDialog } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    HeaderComponent,
    DialogContentDeleteDialog,
    DialogContentViewDialog,
    DialogContentInsertDialog,
    DialogContentEditDialog
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutRoutingModule,
    AppMaterialModule
  ],
  entryComponents: [
    DialogContentDeleteDialog,
    DialogContentViewDialog,
    DialogContentInsertDialog,
    DialogContentEditDialog
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule { }
