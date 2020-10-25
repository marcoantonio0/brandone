import { OrderService } from 'src/app/_services/order.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './budgetdialog.component.html',
  styleUrls: ['./budgetdialog.component.scss']
})
export class BudgetDialogComponent implements OnInit {
  public prices: any;
  public budgetForm = new FormGroup({
    price: new FormControl(''),
    user: new FormControl(''),
    commission: new FormControl('')
  })
  constructor(
    public dialogRef: MatDialogRef<BudgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sOrder: OrderService
  ) {}

  ngOnInit(): void {
    this.budgetForm.get('price').setValue(this.data.price);
    this.budgetForm.get('commission').setValue(this.data.commission);

    this.budgetForm.valueChanges.subscribe(r => {
      if(this.getUserId() != null && this.budgetForm.get('commission').value != ''){
        this.sOrder.getOrderPrice(this.data.id, this.getUserId()._id, this.budgetForm.get('commission').value).subscribe(r => {
          this.prices = r;
        });
      }
    });

  }

  onSubmit(){
    this.sOrder.setBudget(this.data.id, this.getUserId()._id, this.prices).subscribe(r => {
      this.dialogRef.close(true);
    }, e => {
      console.log(e);
    });
  }

  getUserId(){
    const index = this.data.freelancers.findIndex(x => x.name === this.budgetForm.get('user').value);
    if(index >= 0){
      return this.data.freelancers[index];
    } else {
      return null;
    }
  }

  getSelectedFreelancer(){
    const lancer = this.budgetForm.get('user').value;
    for (const freelancer of this.data.freelancers) {
      if (freelancer.name === lancer){
        return freelancer;
      }
    }
  }

}
