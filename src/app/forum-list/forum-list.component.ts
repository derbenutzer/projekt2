import { Component, OnInit } from '@angular/core';
import {ForumService} from "./service/forum.service";
import {ForumList} from "./model/forum-list";

import {AuthHttp} from "angular2-jwt";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../users/service/user.service";

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
		<div *ngIf="authService.loggedIn() && isRegisteredForAForum" class="col s4">
		  <input type="checkbox" (change)="filterById()" [(ngModel)]="idFilterIsSet" class="filled-in" id="filled-in-box" [checked]="idFilterIsSet && this.authService.loggedIn()"/>
      <label for="filled-in-box">Nur Meine</label>
    </div>
	</div>
    <ul class="collection">
      <li *ngFor="let forum of forumList.getSortedByDate() | forumSearch:searchFilter | forumFilter:{categories: categoryFilter} | forumFilter:{institutions: institutionFilter} | forumFilter:{_id: idFilter}" class="collection-item avatar">
        <i class="material-icons circle blue">room</i>
        <h3 class="title">{{forum.title}} - <span *ngFor="let institution of forum.institutions">{{institution}}</span></h3>
        <p>Ort und Wirkungsgebiet<br>
        <span *ngFor="let category of forum.categories" class="category">
                {{category}}
              </span>
        </p>
        <a (click)="openForum(forum._id)" class="jsLink secondary-content"><i class="material-icons">send</i></a>
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
  idFilter=[];
  idFilterIsSet=false;
  isRegisteredForAForum=false;

  catChoices = [];
  //instChoices = ["test1","test2","test3"];
  instChoices = [];

  filters:{}[];

  forumList: ForumList = new ForumList([]);

  constructor(private authService: AuthService,
              private forumService: ForumService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.forumService.getForums()
      .then(forumList => {
        this.forumList = forumList;
        this.setFilters(forumList);
      });

    this.idFilterIsSet=false;

    if(this.authService.loggedIn()){
      console.log("setIdFilter on init");
      this.setIdFilter();
    }
    else{
      this.authService.lock.on('authenticated', (authResult: any) => {
        this.authService.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
          if (error) {
            console.log(error);
          }
          this.idFilterIsSet=false;
          this.setIdFilter();
        });
      });
    }
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

  filterById(){
    if(!this.idFilterIsSet){
      this.idFilter=[];
    }
    else {
      this.setIdFilter();
    }
  }

  setIdFilter(){
    console.log("setIdFilter");
    this.userService.getUser(this.authService.userProfile['user_metadata']['databaseId'])
      .then(user => {
        console.log(user.registeredFor.length>0);
        if (user.registeredFor.length>0){
          if(this.idFilterIsSet){
            this.idFilter = user.registeredFor;
          }
          this.isRegisteredForAForum = true;
        }
      });
  }

  openForum(forumId:string){
    this.router.navigate(['/forum', forumId]);
  }
}
