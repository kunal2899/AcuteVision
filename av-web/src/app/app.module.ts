import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import {FormsModule} from '@angular/forms'
import { ReactiveFormsModule} from '@angular/forms';
<<<<<<< HEAD
import { AuthenticationService } from './service/authentication.service';
import { DatabaseService } from './service/database.service';
import {HttpClientModule} from '@angular/common/http'
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
>>>>>>> a89b8f903ec19292502d25b27b5732fd2b75f12f

@NgModule({
  declarations: [
    AppComponent,
    LogRegComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    HttpClientModule
=======
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
>>>>>>> a89b8f903ec19292502d25b27b5732fd2b75f12f
  ],
  providers: [AuthenticationService,DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
