import { OrderService } from './../../_services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.component.html',
  styleUrls: ['./orderview.component.scss']
})
export class OrderviewComponent implements OnInit {
  public order;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sOrder: OrderService
  ) {
    this.route.params.subscribe(params => {
      if(params) {
          this.sOrder.getOrderById(params.id).subscribe(r => {
            this.order = r;
          }, e => {
            this.router.navigate(['/order']);
          });
      } else {
        this.router.navigate(['/order']);
      }
    });
  }

  ngOnInit(): void {
  }

}
