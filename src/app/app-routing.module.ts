import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { InsertComponent } from './layout/insert/insert.component';
import { UpdateComponent } from './layout/update/update.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
	{path: '', component: LayoutComponent,
		children: [
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: 'dashboard', component: DashboardComponent}
		], canActivate: [AuthGuard]},
	{path: 'login', component: LoginComponent},
	{ path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//{path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard]},