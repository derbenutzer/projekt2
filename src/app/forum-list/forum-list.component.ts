import { Component, OnInit } from '@angular/core';
import {Forum} from "../forum-detail/model/forum";
import {ForumService} from "./service/forum.service";
import {ForumList} from "./model/forum-list";

import {AuthHttp} from "angular2-jwt";

@Component({
  selector: 'forum-list',
  template: `
    <h2>{{title}}</h2>
    
    <div class="row section">
    
      <div class="input-field col s4">
        <select materialize="material_select" multiple>
          <option value="" disabled selected>Alle Institutionen</option>
          <option value="1">Caritas</option>
          <option value="2">Pro Infirmis</option>
          <option value="3">Andere</option>
        </select>
        <label for="myselect">Filter nach Institution</label>
      </div>

      <div class="input-field col s4">
        <select materialize="material_select" multiple [(ngModel)]="categoryFilter">
          <option value="" disabled selected>Alle Kategorien</option>
          <option value="Betreuung">Betreuung</option>
          <option value="Gesellschaft">Gesellschaft</option>
          <option value="Andere">Andere</option>
        </select>
        <label>Filter nach Kategorie</label>
      </div>
      
      <div class="col s4">
        <nav>
          <div class="nav-wrapper blue">
            <form>
            <div class="input-field">
              <input name="searchInput" id="search" type="search" [(ngModel)]="searchFilter">
              <label for="search"><i class="material-icons">search</i></label>
              <i (click)="resetSearchInput()" class="material-icons">close</i>
            </div>
            </form>
          </div>
        </nav>
      </div>
      
	</div>
	
	<div class="row">
		<div class="col s4"><a [routerLink]="['/map-view']" class="waves-effect waves-light btn"><i class="material-icons left">my_location</i>Karte</a></div>
	</div>
    <ul class="collection">
      <li *ngFor="let forum of forumList.getSortedByDate() | forumFilter:searchFilter | forumCategoryFilter:categoryFilter" class="collection-item avatar">
        <i class="material-icons circle blue">room</i>
        <h3 class="title">{{forum.title}}</h3>
        <p>Ort und Wirkungsgebiet<br>
        <span *ngFor="let category of forum.categories" class="category">
                {{category}}
              </span>
        </p>
        <a [routerLink]="['/forum', forum._id]" class="secondary-content"><i class="material-icons">send</i></a>
      </li>
	  </ul>
<!--    <div class="forumList collection">
      <a *ngFor="let forum of forumList.getSortedByDate()" class="collection-item" [routerLink]="['/forum', forum._id]">
        <div class="categoriesContainer right">
          <div class="categories right">
            <div *ngFor="let category of forum.categories" class="chip">
              {{category}}
            </div>
          </div>
        </div>
        <span class="forumLITitle">{{forum.title}}</span>
        <span class="forumLICreateDate"><i class="fa fa-calendar" aria-hidden="true"></i>{{forum.createDate | amDateFormat:'LL'}}</span>
      </a>
    </div> -->
  `,
  styleUrls: ['forum-list.component.scss'],
  providers:[AuthHttp]
})


export class ForumListComponent implements OnInit {

  title="Runde Tische";
  searchFilter: string;
  categoryFilter: string;

  forumList: ForumList = new ForumList([]);

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getForums()
      .then(forumList => this.forumList = forumList);
  }

  resetSearchInput(): void{
    this.searchFilter="";
  }
}
