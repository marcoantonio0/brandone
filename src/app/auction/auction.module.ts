import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionRoutingModule } from './auction-routing.module';
import { AuctionComponent } from './auction.component';
import { AuctionviewComponent } from './auctionview/auctionview.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [AuctionComponent, AuctionviewComponent],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ]
})
export class AuctionModule { }
