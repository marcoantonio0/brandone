import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverPasswordRoutingModule } from './recover-password-routing.module';
import { RecoverPasswordComponent } from './recover-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoverComponent } from './recover/recover.component';


@NgModule({
  declarations: [RecoverPasswordComponent, RecoverComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecoverPasswordRoutingModule
  ]
})
export class RecoverPasswordModule { }
