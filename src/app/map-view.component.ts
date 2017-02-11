import { Component, OnInit } from '@angular/core';
import {Forum} from "./forum";
import {ForumService} from "./forum.service";
import {ForumList} from "./forum-list";

import {AuthHttp} from "angular2-jwt";

@Component({
  selector: 'map-view',
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
    <div class="col s4"><a [routerLink]="['/forum-list']" class="waves-effect waves-light btn"><i class="material-icons left">view_list</i>Liste</a></div>
  </div>
  
  <div>
  <img class="responsive-img" src="assets/images/map-dummy.png">
  </div>
  `,
  providers:[AuthHttp]
})


export class MapViewComponent implements OnInit {

  title="Kartenansicht";
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
