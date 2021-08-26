import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarGuestComponent } from './components/navbar-guest/navbar-guest.component';
import { RegisterComponent } from './pages/register/register.component';

import {  HttpClientModule } from '@angular/common/http';
import { AppErrorHandler } from './common/ErrorHandling/app-error-handler';
import { MessageAlertComponent } from './components/message-alert/message-alert.component';
import { ShowMessagesComponent } from './components/show-messages/show-messages.component';
import { MessageService } from './common/services/message/message.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Error404Component,
    LoginComponent,
    NavbarGuestComponent,
    RegisterComponent,
    MessageAlertComponent,
    ShowMessagesComponent,
  ],
  imports: [ 
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    MessageService,
    {provide:ErrorHandler, useClass:AppErrorHandler},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
