import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {MomentModule} from 'angular2-moment/moment.module';
import {MaterializeModule} from 'angular2-materialize';
import { MaterialModule } from '@angular/material';

import {AppComponent}  from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeModule} from "./home/home.module";
import {UserModule} from "./users/user.module";
import {InstitutionsModule} from "./institutions/institutions.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    AppRoutingModule,
    HomeModule,
    UserModule,
    InstitutionsModule,
    MaterializeModule,
    MaterialModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [ AppComponent]
})
export class AppModule { }



