import { NgModule } from '@angular/core';
import {ForumDetailComponent} from "./forum-detail.component";
import {CreateForumComponent} from "./create-forum.component";
import {PostsModule} from "../posts/posts-module";
import {MomentModule} from 'angular2-moment/moment.module';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {AppRoutingModule} from "../app-routing.module";
import {ForumDetailService} from "./service/forum-detail.service";




@NgModule({
  imports: [PostsModule, MomentModule,FormsModule,CommonModule,AppRoutingModule],
  declarations: [ForumDetailComponent,CreateForumComponent, ],
  providers: [ForumDetailService],
  exports: []
})
export class ForumDetailModule { }
