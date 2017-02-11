import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {CreateForumComponent} from "./create-forum.component";
import {ForumDetailComponent} from "./forum-detail.component";
import {PostDetailComponent} from "./post-detail.component";
import {CreatePostComponent} from "./create-post.component";
import {ForumListComponent} from "./forum-list.component";
import {RegisterOwnerComponent} from "./register-owner.component";
import {MapViewComponent} from "./map-view.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'forum-list',  component: ForumListComponent },
  { path: 'map-view',  component: MapViewComponent },
  { path: 'register-owner',  component: RegisterOwnerComponent },
  { path: 'forum/:id', component: ForumDetailComponent },
  { path: 'forum/:id/edit', component: CreateForumComponent},
  { path: 'create-forum',     component: CreateForumComponent},
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'create-post',     component: CreatePostComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
