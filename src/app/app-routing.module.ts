import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {CreateForumComponent} from "./create-forum.component";
import {ForumDetailComponent} from "./forum-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'detail/:id', component: ForumDetailComponent },
  { path: 'create-forum',     component: CreateForumComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
