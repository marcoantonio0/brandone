import { AuctionviewComponent } from './auctionview/auctionview.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuctionComponent } from './auction.component';

const routes: Routes = [
  { path: '', component: AuctionComponent },
  { path: ':id', component: AuctionviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
