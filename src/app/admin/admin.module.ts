import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { MatIconModule } from '@angular/material/icon';
import { UserComponent } from './users/user/user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BudgetDialogComponent } from './dialogs/budget/budgetdialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NotificationComponent } from './notification/notification.component';

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
  declarations: [AdminComponent, UsersComponent, UserComponent, OrdersComponent, OrderComponent, BudgetDialogComponent, NotificationComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatChipsModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ]
})
export class AdminModule { }
