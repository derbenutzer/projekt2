import { Component, OnInit } from '@angular/core';
import {ForumService} from "./service/forum.service";
import {ForumList} from "./model/forum-list";

import {AuthHttp} from "angular2-jwt";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../users/service/user.service";
import {ForumFilterPipe} from "./service/forum-filter.pipe";
import {ForumSearchPipe} from "./service/forum-search.pipe";

@Component({
  selector: 'forum-list',
  template: `
    <h2>{{title}}</h2>
    
    <div class="row section">
    
      <div class="input-field col l4 m4 s6">
        <forum-list-filter *ngIf="filters"
          [name]="filters[0].name" 
          [choices]="filters[0].choices"
          (onFilterChange)="filterByInstitution($event)">       
        </forum-list-filter>
      </div>
      
    
      <div class="input-field col l4 m4 s6">
        <forum-list-filter *ngIf="filters"
          [name]="filters[1].name"
          [choices]="filters[1].choices"
          (onFilterChange)="filterByCategory($event)">    
        </forum-list-filter>
      </div>
      
      <div class="col l4 m4 s12">
        <nav>
          <div class="nav-wrapper blue">
            <form>
            <div class="input-field">
              <input (keyup)="mapMarkerFilter()" name="searchInput" id="search" type="search" [(ngModel)]="searchFilter">
              <label for="search"><i class="material-icons">search</i></label>
              <i (click)="resetSearchInput()" class="material-icons">close</i>
            </div>
            </form>
          </div>
        </nav>
      </div>
      
	</div>
	
	<div class="row">
		<div class="switchButton col s4" *ngIf="listViewActive"><a class="waves-effect waves-light btn" (click)=toggleListView(false) ><i class="material-icons left">my_location</i>Karte</a></div>
		<div class="switchButton col s4" *ngIf="!listViewActive"><a class="waves-effect waves-light btn" (click)=toggleListView(true) ><i class="material-icons left">view_list</i>Liste</a></div>
		<div *ngIf="authService.loggedIn() && isRegisteredForAForum" class="checkboxFilter col s4">
		  <input type="checkbox" (change)="filterById()" [(ngModel)]="idFilterIsSet" class="filled-in" id="filled-in-box" [checked]="idFilterIsSet && this.authService.loggedIn()"/>
      <label for="filled-in-box">Nur Meine</label>
    </div>
	</div>
    <ul class="collection" *ngIf="listViewActive && forumList">
      <li (click)="openForum(forum._id)" *ngFor="let forum of forumList.getSortedByDate() | forumSearch:searchFilter | forumFilter:{categories: categoryFilter} | forumFilter:{institution: institutionFilter} | forumFilter:{_id: idFilter}" class="hoverable collection-item avatar">
        <img class="material-icons circle" src="https://i1.wp.com/cdn.auth0.com/avatars/{{ forum.categories[0].substring(0, 2).toLowerCase() }}.png?ssl=1">
        <span class="title">{{forum.title}}<span class="titleDivider"> -</span> <span class="titleInstitution"> {{forum.institution}}</span></span>
        <p class="listItemContent">{{ forum.location }}<br>
        <span *ngFor="let category of forum.categories" class="category">
                {{category}}
              </span>
        </p>
        <a (click)="openForum(forum._id)" class="jsLink secondary-content"><i class="material-icons">send</i></a>
      </li>
	  </ul>
	  <div *ngIf="!listViewActive">
    <ng2-map 
      class="mapView"
      zoom="8" 
      center="Switzerland"
      (mapReady$)="onMapReady($event)"
      (mapClick)="onMapClick($event)"
      (idle)="onIdle($event)">
        <marker *ngFor="let pos of positions" 
        [position]="pos"
        (initialized$)="onMarkerInit($event)"></marker>
    </ng2-map>
  </div>
  `,
  styleUrls: ['forum-list.component.scss'],
  providers:[AuthHttp]
})

export class ForumListComponent implements OnInit {

  title="Runde Tische";
  searchFilter: string;
  categoryFilter: string[] = [];
  institutionFilter:string[] = [];
  idFilter=[];
  idFilterIsSet=false;
  isRegisteredForAForum=false;

  listViewActive=true;

  catChoices = [];
  instChoices = [];

  filters:{}[];

  forumStash = [];
  markerStash = [];

  forumFilter :ForumFilterPipe;
  forumSearch :ForumSearchPipe;

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
      this.setIdFilter(this.authService.userProfile);
    }
    else{
      this.authService.lock.on('authenticated', (authResult: any) => {
        this.authService.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
          if (error) {
            console.log(error);
          }
          this.idFilterIsSet=false;
          this.setIdFilter(profile);

        });
      });
    }

    this.forumFilter = new ForumFilterPipe();
    this.forumSearch = new ForumSearchPipe();

  }


  setFilters(forumList){
    for (let forum of forumList.forums) {
      for(let category of forum.categories){
        if(this.catChoices.indexOf(category) < 0){
          this.catChoices.push(category);
        }
      }
      if(this.instChoices.indexOf(forum.institution) < 0){
        this.instChoices.push(forum.institution);
      }
    }
    this.filters=[{name:"Institutionen",choices:this.instChoices},{name:"Kategorien",choices:this.catChoices}];
    //this.filters=[{name:"Institutionen",choices:["test","rest","best"]},{name:"Kategorien",choices:this.catChoices}];
  }

  resetSearchInput(): void{
    this.searchFilter="";
    this.mapMarkerFilter();
  }

  filterByInstitution(filterStrings){
    this.institutionFilter=filterStrings;
    this.mapMarkerFilter();
  }

  filterByCategory(filterStrings){
    this.categoryFilter=filterStrings;
    this.mapMarkerFilter();
  }

  filterById(){
    if(!this.idFilterIsSet){
      this.idFilter=[];
      this.mapMarkerFilter();
    }
    else {
      this.setIdFilter(this.authService.userProfile);

    }
  }

  setIdFilter(profile: Object){
    if(!profile['user_metadata']){
      return;
    }

    this.userService.getUser(profile['user_metadata']['databaseId'])
      .then(user => {
        if (user.registeredFor.length>0){
          if(this.idFilterIsSet){
            this.idFilter = user.registeredFor;
            this.mapMarkerFilter();
          }
          this.isRegisteredForAForum = true;
        }
      });
  }

  openForum(forumId:string){
    this.router.navigate(['/forum', forumId]);
  }

  toggleListView(status){
    this.listViewActive = status;
  }

/*  mapMarkerFilter2(type, filterStrings) {
    for (var i = 0; i < this.markerStash.length; i++) {
      var marker = this.markerStash[i];
      if(marker[type] == filterStrings || filterStrings == "" || filterStrings.includes(marker[type])) {
        marker.setVisible(true);
      } else {
        marker.setVisible(false);
      }
    }
  }*/

  mapMarkerFilter() {

    let filteredBySearch =  this.forumSearch.transform(this.forumList.getSortedByDate(),this.searchFilter);
    let filteredByCategory = this.forumFilter.transform(filteredBySearch,{"categories": this.categoryFilter});
    let filteredByInstitution = this.forumFilter.transform(filteredByCategory,{"institution": this.institutionFilter});
    let filteredByUserId = this.forumFilter.transform(filteredByInstitution,{"_id": this.idFilter});

    let ArrayOfIds = filteredByUserId.map(forum => forum._id);

    for (let marker of this.markerStash){
      if(ArrayOfIds.indexOf(marker.title)!=-1){
        marker.setVisible(true);
      }
      else{
        marker.setVisible(false);
      }
    }


  }

  // todo: link search field to map search (not entry search..). hide one marker overlay on click of another and on map click.
  // todo: move parts of this into init function so it does not initialize the markers every time the map is built
  onMapReady(map) {
    // filling forum stash
    for (let entry of this.forumList.forums) {
      this.forumStash.push(entry);
    }

    // filling marker stash
    for (let latlon of this.forumStash) {
      // prepare marker content:
      let contentString = '<div class="markerContent">'+
        '<h5>'+latlon.title+'</h5>'+
        '<h6>'+latlon.institution+'</h6>'+
        '<p>'+latlon.categories[0]+'</p>'+
        '<a href="/forum/'+latlon._id+'" class="jsLink secondary-content"><i class="material-icons">send</i></a>'+
        '</div>';
      let infoWindow = new google.maps.InfoWindow({
        content: contentString
      });
      // get coordinates to put marker
      let coords = { lat: latlon.lat, lng: latlon.lon};
      let category = latlon.categories[0];
      let institution = latlon.institution;
      let forumId = latlon._id;
      // create marker
      let marker = new google.maps.Marker({
        map: map,
        position: coords,
        title:forumId
        //,
        //category: category,
        //institution: institution
      });
      // add content to marker
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
      // store marker in stash
      this.markerStash.push(marker);

    }
    this.mapMarkerFilter();
  }

  // map events, not used at this time
  onIdle(event) {
    /*console.log('map', event.target);*/
  }
  onMarkerInit(marker) {
    /*console.log('marker', marker);*/
  }
  onMapClick(event) {
    /*console.log('click');*/
  }
}
