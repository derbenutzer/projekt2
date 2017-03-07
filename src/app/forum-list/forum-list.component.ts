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
        <forum-list-filter *ngIf="filters"
          [name]="filters[0].name" 
          [choices]="filters[0].choices"
          (onFilterChange)="filterByInstitution($event)">       
        </forum-list-filter>
      </div>
      
    
      <div class="input-field col s4">
        <forum-list-filter *ngIf="filters"
          [name]="filters[1].name"
          [choices]="filters[1].choices"
          (onFilterChange)="filterByCategory($event)">    
        </forum-list-filter>
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
      <li *ngFor="let forum of forumList.getSortedByDate() | forumSearch:searchFilter | forumFilter:{categories: categoryFilter} | forumFilter:{institutions: institutionFilter}" class="collection-item avatar">
        <i class="material-icons circle blue">room</i>
        <h3 class="title">{{forum.title}} - <span *ngFor="let institution of forum.institutions">{{institution}}</span></h3>
        <p>Ort und Wirkungsgebiet<br>
        <span *ngFor="let category of forum.categories" class="category">
                {{category}}
              </span>
        </p>
        <a [routerLink]="['/forum', forum._id]" class="secondary-content"><i class="material-icons">send</i></a>
      </li>
	  </ul>
  `,
  styleUrls: ['forum-list.component.scss'],
  providers:[AuthHttp]
})


export class ForumListComponent implements OnInit {

  title="Runde Tische";
  searchFilter: string;
  categoryFilter = [];
  institutionFilter = [];

  catChoices = [];
  //instChoices = ["test1","test2","test3"];
  instChoices = [];

  filters:{}[];

  forumList: ForumList = new ForumList([]);

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.forumService.getForums()
      .then(forumList => {
        this.forumList = forumList;
        this.setFilters(forumList);
      });
  }


  setFilters(forumList){
    for (let forum of forumList.forums) {
      for(let category of forum.categories){
        if(this.catChoices.indexOf(category) < 0){
          this.catChoices.push(category);
        }
      }
      for(let institution of forum.institutions){
        if(this.instChoices.indexOf(institution) < 0){
          this.instChoices.push(institution);
        }
      }
    }
    this.filters=[{name:"Institutionen",choices:this.instChoices},{name:"Kategorien",choices:this.catChoices}];
    //this.filters=[{name:"Institutionen",choices:["test","rest","best"]},{name:"Kategorien",choices:this.catChoices}];
  }

  resetSearchInput(): void{
    this.searchFilter="";
  }

  filterByInstitution(filterStrings){
    this.institutionFilter=filterStrings;
  }

  filterByCategory(filterStrings){
    this.categoryFilter=filterStrings;
  }
}
