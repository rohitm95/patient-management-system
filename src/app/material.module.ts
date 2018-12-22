import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
	MatProgressSpinnerModule,
	MatInputModule,
	MatCardModule,
	MatButtonModule,
	MatTableModule,
	MatPaginatorModule,
	MatDialogModule
} from '@angular/material';

@NgModule({
	exports:[
		MatProgressSpinnerModule,
		MatInputModule,
		MatCardModule,
		MatButtonModule,
		MatTableModule,
		MatPaginatorModule,
		MatDialogModule
	]
})

export class AppMaterialModule {}