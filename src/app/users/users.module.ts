import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BriefingComponent } from './briefing/briefing.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ObrigadoComponent } from './obrigado/obrigado.component';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    BriefingComponent,
    ObrigadoComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    CommonModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
