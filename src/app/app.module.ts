import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {MomentModule} from 'angular2-moment/moment.module';

import { AppComponent }  from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./home.component";
import {CreateForumComponent} from "./create-forum.component";
import {ForumService} from "./forum.service";
import {ForumDetailComponent} from "./forum-detail.component";
import {ForumsComponent} from "./forums.component";
import {PostDetailComponent} from "./post-detail.component";

import {AuthService} from "./auth.service";
import {MockPostService} from "./mock-post.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    CreateForumComponent,
    ForumDetailComponent,
    ForumsComponent,
    PostDetailComponent
  ],
  providers: [ AuthService, ForumService, MockPostService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
