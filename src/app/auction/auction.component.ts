import { OrderService } from 'src/app/_services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {
  public auctions;
  constructor(
    private sOrder: OrderService
  ) {
    this.sOrder.getAllAuctions().subscribe(r => {
     this.auctions = r;
    });
  }

  ngOnInit(): void {
  }

}
