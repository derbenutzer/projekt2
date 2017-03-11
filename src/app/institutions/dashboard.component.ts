import { Component } from '@angular/core';
import {Institution} from "./model/Institution";
import {ForumList} from "../forum-list/model/forum-list";
import {AuthService} from "../shared/auth.service";
import {ForumService} from "../forum-list/service/forum.service";
import {UserService} from "../users/service/user.service";
import {Router} from "@angular/router";
import {Forum} from "../forum-detail/model/forum";
declare var $: any;


@Component({
  selector: 'dashboard',
  template: `
      <h2 class="visually-hidden">{{title}}</h2>

      <div *ngIf="forumList.forums.length > 0" class="row listContainer">
        <ul class="collection">
          <li *ngFor="let forum of forumList.getSortedByDate()" class="collection-item avatar">
            <i class="material-icons circle blue">room</i>
            <h3 class="title">{{forum.title}} - <span>{{forum.institution}}</span></h3>
            <p>
              <span class="label">Kategorie(n):</span><span *ngFor="let category of forum.categories" class="category"> {{category}}</span>
            </p>
            <p id="additional" *ngIf="forum.expanded">
              <span class="label">Erstellt am:</span><span> {{forum.createDate | amDateFormat: 'DD-MM-YYYY'}}</span><br>
              <span class="label">Letzte Aktivität am:</span><span> {{forum.lastModified | amDateFormat: 'DD-MM-YYYY'}}</span><br>
              <span class="label">Anzahl Nutzer:</span><span> {{forum.numberOfUsers}}</span><br>
              <span class="label">Anzahl Beiträge:</span><span> {{forum.numberOfPosts}}</span><br>
            </p>
            <div class="buttonPanel">
              <a (click)="openDialog(forum)" class="jsLink secondary-content clear"><i class="material-icons">clear</i></a>
              <a (click)="editForum(forum)" class="jsLink secondary-content edit"><i class="material-icons">mode_edit</i></a>
              <a *ngIf="!forum.expanded" (click)="toggleExpand(forum)" class="jsLink secondary-content expand"><i class="material-icons">add</i></a>
              <a *ngIf="forum.expanded" (click)="toggleExpand(forum)" class="jsLink secondary-content expand"><i class="material-icons">remove</i></a>
            </div>
          </li>
        </ul>
      </div>
      
      <div *ngIf="forumList.forums == 0" class="row listContainer">
        <p>Sie haben noch keine runden Tische eröffnet.</p>
      </div>
      
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>Runden Tisch löschen</h4>
      <p>Möchten sie diesen Runden Tisch wirklich löschen?</p>
    </div>
    <div class="modal-footer">
      <a (click)="deleteForum()" class=" modal-action modal-close waves-effect waves-light btn-flat">Löschen</a>
      <a (click)="closeDialog()" class=" modal-action modal-close waves-effect waves-light btn-flat">Abbrechen</a>
    </div>
  </div>
          
      
      <div class="row section">
        <button (click)="createNewForum()" class="btn waves-effect waves-light" name="action">Neuen Tisch erstellen
          <i class="material-icons right">send</i>
        </button>
      </div>
  `,
  styles:[`
    .collection-item h3 {
      font-weight: bold;
      margin: initial;
      margin-bottom: 0.4rem;
    }
    
    .collection .collection-item.avatar .secondary-content {
      top: 32px;
    }
    
    .listContainer{
      margin-top:4rem;    
    }
    
    .label {
      font-weight:bold;
    }
    
    #additional {
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    
    .buttonPanel .expand{
      right: 176px;
    }
    
    .buttonPanel .edit{
      right: 92px;
    }
    
  `],
})


export class DashboardComponent {

  title="Verwaltung";
  ownerId:string;
  forumList: ForumList = new ForumList([]);
  forumToDelete: Forum;

  constructor(private authService: AuthService,
              private forumService: ForumService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {

    if(this.authService.loggedIn()){
      this.ownerId = this.authService.userProfile['user_metadata']['databaseId'];
      this.getForumsFromService();
    }
    else{
      this.authService.lock.on('authenticated', (authResult: any) => {
        this.authService.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
          if (error) {
            console.log(error);
          }
          this.ownerId = profile['user_metadata']['databaseId'];
          this.getForumsFromService();
        });
      });
    }
    $('.modal').modal();
  }

  getForumsFromService(){
    this.forumService.getForums()
      .then(forumList => {
        this.forumList = new ForumList(forumList.getFilteredByOwnerId(this.ownerId));
        this.initializeExpanded();
      });
  }

  openForum(forumId:string){
    this.router.navigate(['/forum', forumId]);
  }

  createNewForum(){
    this.forumService.idOfForumToModify = null;
    this.router.navigate(['/forum']);
  }

  editForum(forum){
    this.forumService.idOfForumToModify = forum._id;
    this.router.navigate(['/forum']);
  }

  deleteForum() {
    this.forumService.deleteForum(this.forumToDelete._id)
     .then(res => {
     this.ngOnInit();
     })
  }

  openDialog(forum){
    this.forumToDelete=forum;
    $('#modal1').modal('open');
  }

  closeDialog(){
    this.forumToDelete=null;
    $('#modal1').modal('close');
  }

  toggleExpand(forum){
    forum.expanded = !forum.expanded;
  }

  initializeExpanded(){
    for (let forum of this.forumList.forums){
      forum['expanded']=false;
    }
  }

}


