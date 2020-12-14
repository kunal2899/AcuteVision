import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import {FormsModule} from '@angular/forms'
import { ReactiveFormsModule} from '@angular/forms';
import { AuthenticationService } from './service/authentication.service';
import { DatabaseService } from './service/database.service';
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    LogRegComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService,DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
