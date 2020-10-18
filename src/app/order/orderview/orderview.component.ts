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
  public status = [
    {
      description: 'Aguardando orçamento',
      idstatus: 1,
      active: false
    },
    {
      description: 'Aguardando pagamento',
      idstatus: 2,
      active: false
    },
    {
      description: 'Pagamento em analise',
      idstatus: 3,
      active: false
    },
    {
      description: 'Projeto em execução',
      idstatus: 4,
      active: false
    },
    {
      description: 'Projeto em análise',
      idstatus: 5,
      active: false
    },
    {
      description: 'Concluído',
      idstatus: 6,
      active: false
    }
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sOrder: OrderService
  ) {
    this.route.params.subscribe(params => {
      if(Object.keys(params).length > 0) {
          this.sOrder.getOrderById(params.id).subscribe(r => {
            this.order = r;
            this.setStatus(r.status);
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

  setStatus(array){
    for (const status of array) {
      const index = this.status.findIndex(x => x.idstatus === status.idstatus);
      if(index > -1){
        status['active'] = true;
        this.status[index] = status;
      }
    }
    console.log(this.status);
  }

  getSizeTimeline(){
    const stSize = [];
    for (const st of this.status) {
      if(st.active === true){
        stSize.push(st);
      }
    }
    if(stSize.length === 6){
      return 100;
    }
    return Math.floor(((stSize.length * 100) / this.status.length - 5));
  }

}
