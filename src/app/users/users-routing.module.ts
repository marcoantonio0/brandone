import { ObrigadoComponent } from './obrigado/obrigado.component';
import { AuthGuard } from './../guard/auth.guard';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BriefingComponent } from './briefing/briefing.component';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'briefing',
    canActivate: [AuthGuard],
    component: BriefingComponent
  },
  {
    path: 'obrigado',
    canActivate: [AuthGuard],
    component: ObrigadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
