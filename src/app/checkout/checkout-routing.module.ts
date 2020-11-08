import { ObrigadoComponent } from './obrigado/obrigado.component';
import { AuthGuard } from '../guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { BriefingComponent } from './briefing/briefing.component';



const routes: Routes = [
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
export class CheckoutRoutingModule { }
