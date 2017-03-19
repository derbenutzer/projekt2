import { NgModule } from '@angular/core';
import {ForumListComponent} from "./forum-list.component";
import {ForumDetailModule} from "../forum-detail/forum-detail.module";
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {AppRoutingModule} from "../app-routing.module";
import  {MaterializeModule} from 'angular2-materialize';

import {ForumService} from "./service/forum.service";
import {ListFilterComponent} from "./list-filter.component";
import {ForumSearchPipe} from "./service/forum-search.pipe";
import {ForumFilterPipe} from "./service/forum-filter.pipe";
import {Ng2MapModule} from 'ng2-map';

@NgModule({
  imports: [
    ForumDetailModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    MaterializeModule,
    Ng2MapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDMUu2F4YnhV2GW-XK3gT0Bla1QhPpIU1w'
    })
  ],
<<<<<<< HEAD
  declarations: [ForumListComponent, ForumSearchPipe, ForumFilterPipe, MapViewComponent, ListFilterComponent],
=======
  declarations: [ForumListComponent, ForumSearchPipe, ForumFilterPipe, ListFilterComponent],
>>>>>>> feat/mapview
  providers: [ForumService],
  exports: [ForumListComponent, ForumFilterPipe]
})
export class ForumListModule { }
