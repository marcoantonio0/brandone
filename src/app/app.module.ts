import { RegisterModule } from './register/register.module';
import { CheckoutModule } from './checkout/checkout.module';
import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from './guard/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './guard/jwt.interceptor';
import { ErrorInterceptor } from './guard/error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './content/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AuctionModule } from './auction/auction.module';
import { FilterDatePipe } from './_pipes/filter-date.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    IndexComponent,
    ContentComponent,
    HeaderComponent,
    FilterDatePipe
  ],
  imports: [
    MatMenuModule,
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
    MatListModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    AuctionModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AdminModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    CheckoutModule,
    RegisterModule,
    LoginModule,
    MatBadgeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    FilterDatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
