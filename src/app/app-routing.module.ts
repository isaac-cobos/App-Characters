import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './auth/login.module';
import { LoginComponent } from './auth/login/login.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full', loadChildren: () => import('./auth/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
