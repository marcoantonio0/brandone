import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/_services/order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal, * as swal from 'sweetalert2';

@Component({
  selector: 'app-auctionview',
  templateUrl: './auctionview.component.html',
  styleUrls: ['./auctionview.component.scss']
})
export class AuctionviewComponent implements OnInit {
  public auction;
  public id;
  public bids;
  public auctionForm = new FormGroup({
    price: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required,Validators.maxLength(250)])
  });
  isLoading: boolean = false;
  constructor(
    private sOrder: OrderService,
    private router: ActivatedRoute,
    private sAuth: AuthenticationService
  ) {
    this.router.params.subscribe(params => {
      if(Object.keys(params).length > 0){
        this.id = params.id;
        this.sOrder.getAuction(params.id).subscribe(r => {
          this.auction = r;

          this.sOrder.getBidsByOrderId(params.id).subscribe(r => {
            this.bids = r;
          })

        });
      }
    });
  }

  ngOnInit(): void {
  }


  checkErros(value){
    if(value.price == '') {
      return 'Insira um valor.';
    }
    else if (value.description == ''){
      return 'Insira uma descrição.';
    }
    else if (value.price == 0 || value.price == 0.00){
      return 'O valor não pode ser zero.';
    }
    else {
      return '';
    }
  }

  clearForm(){
    this.auctionForm.reset();
  }

  submitBid() {
    if(this.checkErros(this.auctionForm.value) !== ''){
      Swal.fire({text: this.checkErros(this.auctionForm.value), icon: 'warning', timer: 2500});
    } else if(this.auctionForm.invalid){
      Swal.fire({text: 'Verifique todos os campos e tente novamente.', icon: 'warning', timer: 2500});
    } else {
      this.isLoading = true;
      this.auctionForm.disable();
      this.sOrder.setBidToAuction(this.id, {
        user: this.sAuth.currentUserValue.id,
        price: this.auctionForm.value.price,
        orderid: this.id,
        description: this.auctionForm.value.description
      }).subscribe(r => {
        Swal.fire({text: 'Aplicação feita com sucesso!', icon: 'success', timer: 2500});
        this.clearForm();
        this.isLoading = false;
        this.auctionForm.enable();
      }, e => {
        Swal.fire({text: e, icon: 'error'});
        this.isLoading = false;
        this.auctionForm.enable();
      });
    }

  }

}
