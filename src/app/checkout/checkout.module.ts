import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { BriefingComponent } from './briefing/briefing.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ObrigadoComponent } from './obrigado/obrigado.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    BriefingComponent,
    ObrigadoComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    CommonModule,
    CheckoutRoutingModule,
    MatSnackBarModule
  ]
})
export class CheckoutModule { }
