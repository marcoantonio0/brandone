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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';
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


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    IndexComponent,
    ContentComponent,
    HeaderComponent
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
    UsersModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AdminModule,
    MatTabsModule,
    MatSlideToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
