import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreateForumComponent} from "./forum-detail/create-forum.component";
import {ForumDetailComponent} from "./forum-detail/forum-detail.component";
import {PostDetailComponent} from "./posts/post-detail.component";
import {CreatePostComponent} from "./posts/create-post.component";
import {ForumListComponent} from "./forum-list/forum-list.component";
import {RegisterOwnerComponent} from "./users/register-owner.component";
import {MapViewComponent} from "./forum-list/map-view.component";
//import {EditProfileComponent} from "./users/edit-profile.component";
import {ProfileComponent} from "./users/profile.component";
import {SubmitOKComponent} from "./users/submit-ok.component";

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
  { path: 'create-post', component: CreatePostComponent},
  //{ path: 'edit-profile',     component: EditProfileComponent},
  { path: 'profile',     component: ProfileComponent},
  { path: 'submit-ok',     component: SubmitOKComponent},

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
