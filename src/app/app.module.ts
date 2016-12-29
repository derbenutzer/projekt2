import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./home.component";
import {CreateForumComponent} from "./create-forum.component";
import {ForumService} from "./forum.service";
import {ForumDetailComponent} from "./forum-detail.component";
import {ForumsComponent} from "./forums.component";
import {AuthService} from "./auth.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    CreateForumComponent,
    ForumDetailComponent,
    ForumsComponent
  ],
  providers: [ ForumService, AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
