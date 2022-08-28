import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component'
import { AuthGuard } from './guards/auth.guard';
import { CronComponent } from './pages/cron/cron.component';
import { ProjectsComponent } from './pages/projects/projects.component';

const routes: Routes = [
  {
    path : 'cron',
    component : CronComponent,
    canActivate : [AuthGuard],
  },
  {
    path : 'projects',
    component : ProjectsComponent,
    canActivate : [AuthGuard],
  },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
