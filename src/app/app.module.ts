import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import {HttpModule, Http}    from '@angular/http';
import {MomentModule} from 'angular2-moment/moment.module';

import { AppComponent }  from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./home.component";
import {ForumListComponent} from "./forum-list.component";
import {CreateForumComponent} from "./create-forum.component";
import {ForumService} from "./forum.service";
import {ForumDetailComponent} from "./forum-detail.component";
import {ForumsComponent} from "./forums.component";
import {PostDetailComponent} from "./post-detail.component";
import {CreatePostComponent} from "./create-post.component";

import {MaterializeDirective} from "angular2-materialize";
import {AuthService} from "./auth.service";
import {MockPostService} from "./mock-post.service";
import { AuthHttp, AuthConfig, AUTH_PROVIDERS, provideAuth } from 'angular2-jwt';
import {RegisterOwnerComponent} from "./register-owner.component";
import {ForumFilterPipe} from "./forum-filter.pipe";
import {CategoryFilterPipe} from "./forum-category-filter.pipe";
import {MapViewComponent} from "./map-view.component";


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
    RegisterOwnerComponent,
    ForumListComponent,
    MapViewComponent,
    CreateForumComponent,
    ForumDetailComponent,
    ForumsComponent,
    PostDetailComponent,
    CreatePostComponent,
    MaterializeDirective,
    ForumFilterPipe,
    CategoryFilterPipe
  ],
  providers: [ AuthService, ForumService, MockPostService ],
  bootstrap: [ AppComponent]
})
export class AppModule { }



