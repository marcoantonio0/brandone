import { RecoverComponent } from './recover/recover.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoverPasswordComponent } from './recover-password.component';

const routes: Routes = [
  { path: '', component: RecoverPasswordComponent },
  { path: ':token', component: RecoverComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoverPasswordRoutingModule { }
