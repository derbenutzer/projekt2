import { NgModule } from '@angular/core';
import {ForumListComponent} from "./forum-list.component";
import {ForumDetailModule} from "../forum-detail/forum-detail.module";
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {AppRoutingModule} from "../app-routing.module";

import {MapViewComponent} from "./map-view.component";
import {ForumService} from "./service/forum.service";
import {MaterializeDirective} from "angular2-materialize";
import {ListFilterComponent} from "./list-filter.component";
import {ForumSearchPipe} from "./service/forum-search.pipe";
import {ForumFilterPipe} from "./service/forum-filter.pipe";

@NgModule({
  imports: [ForumDetailModule, CommonModule, FormsModule, AppRoutingModule],
  declarations: [ForumListComponent, ForumSearchPipe, ForumFilterPipe, MapViewComponent, MaterializeDirective, ListFilterComponent],
  providers: [ForumService],
  exports: [ForumListComponent]
})
export class ForumListModule { }
