import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastOptions,ToastModule } from 'ng2-toastr/ng2-toastr';
import { AngularWebStorageModule } from 'angular-web-storage';

import { AccountModule } from './account/account.module';
import { GoodiesModule } from './goodies/goodies.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { CustomOptions } from './shared/config/toastr-options';


@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule,
    AppRoutingModule, AngularWebStorageModule, AccountModule,
    GoodiesModule, HomeModule, BrowserAnimationsModule,
    NgbModule.forRoot(), SharedModule.forRoot(), ToastModule.forRoot()],
  declarations: [AppComponent],
  providers: [
    {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'}
    ,{provide: ToastOptions, useClass: CustomOptions}
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
