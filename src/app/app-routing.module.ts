import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';


const routes: Routes = [{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{
  path: 'dashboard',
  loadChildren: './views/dashboard/dashboard.module#DashboardModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
