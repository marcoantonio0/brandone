import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { UserComponent } from './users/user/user.component';
import { OrderComponent } from './orders/order/order.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'users', children: [
    { path: '', component: UsersComponent },
    { path: ':id', component: UserComponent }
    ]
  },
  { path: 'orders', children: [
    { path: '', component: OrdersComponent },
    { path: ':id', component: OrderComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
