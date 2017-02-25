import { NgModule } from '@angular/core';
import {ForumListComponent} from "./forum-list.component";
import {ForumDetailModule} from "../forum-detail/forum-detail.module";
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {AppRoutingModule} from "../app-routing.module";
import {ForumFilterPipe} from "./service/forum-filter.pipe";
import {CategoryFilterPipe} from "./service/forum-category-filter.pipe";
import {MapViewComponent} from "./map-view.component";
import {ForumService} from "./service/forum.service";
import {MaterializeDirective} from "angular2-materialize";
import {ListFilterComponent} from "./list-filter.component";

@NgModule({
  imports: [ForumDetailModule, CommonModule, FormsModule, AppRoutingModule],
  declarations: [ForumListComponent, ForumFilterPipe, CategoryFilterPipe, MapViewComponent, MaterializeDirective, ListFilterComponent],
  providers: [ForumService],
  exports: [ForumListComponent]
})
export class ForumListModule { }
