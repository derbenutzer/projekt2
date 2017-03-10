import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CreateForumComponent} from "./forum-detail/create-forum.component";
import {ForumDetailComponent} from "./forum-detail/forum-detail.component";
import {CreatePostComponent} from "./posts/create-post.component";
import {ForumListComponent} from "./forum-list/forum-list.component";
import {RegisterInstitutionComponent} from "./institutions/register-institution.component";
import {MapViewComponent} from "./forum-list/map-view.component";
import {ProfileComponent} from "./users/profile.component";
import {SubmitOKComponent} from "./users/submit-ok.component";
import {RegisterForForumComponent} from "./users/register-for-forum.component";
import {InstitutionsStartComponent} from "./institutions/institutions-start.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'forum-list',  component: ForumListComponent },
  { path: 'map-view',  component: MapViewComponent },
  { path: 'forum/:id', component: ForumDetailComponent },
  { path: 'forum/:id/edit', component: CreateForumComponent},
  { path: 'create-forum',     component: CreateForumComponent},
  { path: 'create-post', component: CreatePostComponent},
  { path: 'profile',     component: ProfileComponent},
  { path: 'submit-ok',     component: SubmitOKComponent},
  { path: 'register-for-forum/:id',     component: RegisterForForumComponent},
  { path: 'institutions-start',     component: InstitutionsStartComponent},
  { path: 'register-institution',     component: RegisterInstitutionComponent}

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
