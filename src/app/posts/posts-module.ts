import { NgModule } from '@angular/core';
import {PostDetailComponent} from "./post-detail.component";
import {CreatePostComponent} from "./create-post.component";
import {SharedModule} from "../shared/shared.module";
import {MomentModule} from 'angular2-moment/moment.module';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {MockPostService} from "./service/mock-post.service";





@NgModule({
  imports: [SharedModule,MomentModule,FormsModule,CommonModule],
  declarations: [PostDetailComponent,CreatePostComponent],
  providers: [MockPostService],
})
export class PostsModule { }
