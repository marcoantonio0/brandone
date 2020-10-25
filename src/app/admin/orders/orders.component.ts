import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public orders;
  constructor(
    private sOrder: OrderService
  ) {}

  ngOnInit(): void {
    this.sOrder.getAll().subscribe(r => {
      this.orders = r;
    });
  }

  getLastStatus(array: any[]){
    return array[array.length-1];
  }

  getColorStatus(id){
    if(id == 1){
      return 'var(--blue)';
    }
    if(id == 2){
      return 'var(--blue)';
    }
    if(id == 3){
      return 'var(--blue)';
    }
    if(id == 4){
      return 'var(--blue)';
    }
    if(id == 5){
      return 'var(--blue)';
    }
    if(id == 6){
      return 'var(--green)';
    }
    if(id == 7){
      return 'var(--red)';
    }
  }


}
