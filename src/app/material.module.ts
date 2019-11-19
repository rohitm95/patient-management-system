import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
	MatInputModule,
	MatCardModule,
	MatButtonModule,
	MatTableModule,
	MatPaginatorModule,
	MatDialogModule,
	MatSortModule,
	MatTooltipModule,
	MatIconModule
} from '@angular/material';

@NgModule({
	exports:[
		MatInputModule,
		MatCardModule,
		MatButtonModule,
		MatTableModule,
		MatPaginatorModule,
		MatDialogModule,
		MatSortModule,
		MatTooltipModule,
		MatIconModule
	]
})

export class AppMaterialModule {}