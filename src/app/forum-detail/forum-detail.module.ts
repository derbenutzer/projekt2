import { NgModule } from '@angular/core';
import {ForumDetailComponent} from "./forum-detail.component";
import {PostsModule} from "../posts/posts-module";
import {MomentModule} from 'angular2-moment/moment.module';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {AppRoutingModule} from "../app-routing.module";
import {ForumDetailService} from "./service/forum-detail.service";
import {SharedModule} from "../shared/shared.module";




@NgModule({
  imports: [PostsModule, MomentModule,FormsModule,CommonModule,AppRoutingModule, SharedModule],
  declarations: [ForumDetailComponent,],
  providers: [ForumDetailService],
})
export class ForumDetailModule { }
