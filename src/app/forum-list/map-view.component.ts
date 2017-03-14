import { Component, OnInit } from '@angular/core';
import {Forum} from "../forum-detail/model/forum";
import {ForumService} from "./service/forum.service";
import {ForumList} from "./model/forum-list";
import {Router} from "@angular/router";

import {AuthHttp} from "angular2-jwt";

@Component({
  selector: 'map-view',
  styles: ['.mapView { height: 50vh; }'],
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
  providers:[AuthHttp]
})


export class MapViewComponent implements OnInit {

  title="Kartenansicht";
  searchFilter: string;
  categoryFilter: string;
  forumStash = [];
  markerStash = [];

  forumList: ForumList = new ForumList([]);

  constructor(private forumService: ForumService,
              private router: Router) { }

  ngOnInit(): void {
    this.forumService.getForums()
      .then(forumList => this.forumList = forumList);
    console.log('list of stuff:');
    console.log(this.forumService.getForums());
  }

  resetSearchInput(): void{
    this.searchFilter="";
  }
/*todo: make a marker for each forum and place on map via lat and lon. */
  onMapReady(map) {
    // filling forum stash
    for (let entry of this.forumList.forums) {
      this.forumStash.push(entry);
    }

    // filling marker stash
    for (let latlon of this.forumStash) {
      // prepare marker content:
      let contentString = '<div class="markerContent">'+
        '<h4>'+latlon.title+'</h4>'+
        '<h5>'+latlon.institution+'</h5>'+
        '<a href="/forum/'+latlon._id+'" class="jsLink secondary-content"><i class="material-icons">send</i></a>'+
        '</div>';
      let infoWindow = new google.maps.InfoWindow({
        content: contentString
      });
      // get coordinates to put marker
      let coords = { lat: latlon.lat, lng: latlon.lon};
      // create marker
      let marker = new google.maps.Marker({
        map: map,
        position: coords
      });
      // add content to marker
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
      // store marker in stash
      this.markerStash.push(marker);
    }
    console.log(this.markerStash);
  }

  // map events, not used at the time
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
