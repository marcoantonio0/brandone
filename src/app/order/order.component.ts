import { FormGroup, FormControl } from '@angular/forms';
import { OrderService } from './../_services/order.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public orders = [];
  public filters = new FormGroup({
    search: new FormControl(''),
    offset: new FormControl('')
  });
  constructor(
    private sOrder: OrderService,
    private sAuth: AuthenticationService
  ) {

    this.sOrder.getOrderUser(this.sAuth.currentUserValue.id).subscribe(r => {
      this.orders = r.orders;
    });

    this.filters.statusChanges.subscribe(r => {
      this.sOrder.getOrderUser(
        this.sAuth.currentUserValue.id,
        this.filters.value.offset,
        this.filters.value.search
        ).subscribe(r => {
        this.orders = r.orders;
      });
    });

  }

  ngOnInit(): void {
  }

  getLastStatus(array){
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
