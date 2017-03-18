import { Component } from '@angular/core';
import {ForumList} from "../forum-list/model/forum-list";
import {AuthService} from "../shared/auth.service";
import {ForumService} from "../forum-list/service/forum.service";
import {UserService} from "../users/service/user.service";
import {Router} from "@angular/router";
import {Forum} from "../forum-detail/model/forum";
declare let $: any;


@Component({
  selector: 'dashboard',
  template: `
      <h2 class="visually-hidden">{{title}}</h2>

      <div *ngIf="authService.loggedIn()">
        <div *ngIf="forumList.forums.length > 0" class="row listContainer">
        
          <ul class="collection collapsible" data-collapsible="expandable">
            <li *ngFor="let forum of forumList.getSortedByDate()" class="collection-item avatar">
            <div class="collapsible-header">
              <i class="material-icons circle blue">room</i>
              <h3 class="title">{{forum.title}} - <span>{{forum.institution}}</span></h3>
              <p>
                <span class="label">Kategorie(n):</span><span *ngFor="let category of forum.categories" class="category"> {{category}}</span>
              </p>
              </div>
              <div class="collapsible-body">
                <div>
                  <div class="additional">                    
                    <div class="additionalInfo">
                      <span class="label">Erstellt am:</span><span> {{forum.createDate | amDateFormat: 'DD-MM-YYYY'}}</span><br>
                      <span class="label">Letzte Aktivität am:</span><span> {{forum.lastModified | amDateFormat: 'DD-MM-YYYY'}}</span><br>
                      <span class="label">Anzahl Nutzer:</span><span> {{forum.numberOfUsers}}</span><br>
                      <span class="label">Anzahl Beiträge:</span><span> {{forum.numberOfPosts}}</span><br>
                    </div>
                    
                    <div class="additionalDescription">
                      <p>{{forum.description}}</p>
                    </div>
                    
                    <div class="buttonPanel">
                      <a (click)="openDialog(forum)" class="jsLink secondary-content clear"><i class="material-icons">clear</i></a>
                      <a (click)="editForum(forum)" class="jsLink secondary-content edit"><i class="material-icons">mode_edit</i></a>
                      <a (click)="openForum(forum._id)" class="jsLink secondary-content expand"><i class="material-icons">launch</i></a>
                    </div>
                  </div>
                </div>

              </div>
            </li>
          </ul>
        </div>
        
        <div *ngIf="forumListIsLoaded && isInstitution && forumList.forums == 0" class="row listContainer">
          <p class="flow-text">Sie haben noch keine runden Tische eröffnet.</p>
        </div>
    <div *ngIf="isInstitution" class="row section">
      <button (click)="createNewForum()" class="btn waves-effect waves-light" name="action">Neuen Tisch erstellen
        <i class="material-icons right">send</i>
      </button>
    </div>
  </div>
  
  <div *ngIf="!authService.loggedIn()">
   <login-to-continue [backUrl]="backUrl"></login-to-continue>
  </div>
  
  <div *ngIf="authService.loggedIn()&& !isInstitution">
    <div>
      <p class="flow-text">Sie sind noch nicht als Institution registriert oder ihre Registrierung wurde noch nicht verifiziert.</p>
    </div>
    <div>
      <button type="button" (click)="goBack()" class="btn">Zurück</button>
    </div>
  </div>
  
  <div id="confirmDialog" class="modal">
  <div class="modal-content">
    <h4>Runden Tisch löschen</h4>
    <p class="flow-text">Möchten sie diesen Runden Tisch wirklich löschen?</p>
  </div>
  <div class="modal-footer">
    <a (click)="deleteForum()" class=" modal-action modal-close waves-effect waves-light btn-flat">Löschen</a>
    <a (click)="closeDialog()" class=" modal-action modal-close waves-effect waves-light btn-flat">Abbrechen</a>
  </div>
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
    
    .buttonPanel .expand{
      right: 176px;
    }
    
    .buttonPanel .edit{
      right: 92px;
    }
    
    .collection .collection-item.active {
      background-color: #fff;
      color: black;
    }
    
    .collection .collection-item.active .secondary-content {
      color: #039be5;
    }
    
    .collapsible-header, .collapsible-body {
      border:none;
    }
    
    .additional {
      border-top:1px solid #e0e0e0;
      padding:1rem;
    }
    
    .collapsible-body p {
        margin: 0;
        padding-left: 0;
    }
    
  `],
})


export class DashboardComponent {

  title = "Verwaltung";
  ownerId: string;
  forumList: ForumList = new ForumList([]);
  forumToDelete: Forum;
  isInstitution = true;
  backUrl="/institutions-start";
  forumListIsLoaded = false;
  init = false;

  constructor(private authService: AuthService,
              private forumService: ForumService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {

    console.log("on init");

    this.isInstitution=true;

    if (this.authService.loggedIn() && this.authService.userProfile['user_metadata']) {
      this.ownerId = this.authService.userProfile['user_metadata']['databaseId'];
      this.checkIfIsInstitution()
        .then(isInstitution => this.getForumsFromService());
    }
    else {
      this.authService.lock.on('authenticated', (authResult: any) => {
        this.authService.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
          if (error) {
            console.log(error);
          }
          if (profile['user_metadata']) {
            this.ownerId = profile['user_metadata']['databaseId'];
            this.checkIfIsInstitution()
              .then(isInstitution => this.getForumsFromService());
          }
        });
      });
    }
    $('.modal').modal();
    $('.collapsible').collapsible();
    this.init = false;
  }

  ngAfterViewChecked(){
    if(!this.init && $('.collapsible')[0]) {
      $('.collapsible').collapsible();
      this.init = true;
    }
  }

  getForumsFromService() {
    this.forumService.getForums()
      .then(forumList => {
        this.forumList = new ForumList(forumList.getFilteredByOwnerId(this.ownerId));
        this.forumListIsLoaded = true;
      });
  }

  openForum(forumId: string) {
    this.router.navigate(['/forum', forumId]);
  }

  createNewForum() {
    this.forumService.idOfForumToModify = null;
    this.router.navigate(['/forum']);
  }

  editForum(forum) {
    this.forumService.idOfForumToModify = forum._id;
    this.init = false;
    this.router.navigate(['/forum']);

  }

  deleteForum() {
    this.forumService.deleteForum(this.forumToDelete._id)
      .then(res => {
        this.ngOnInit();
      })
  }

  openDialog(forum) {
    console.log("delete");
    this.forumToDelete = forum;
    $('#confirmDialog').modal('open');
  }

  closeDialog() {
    this.forumToDelete = null;
    $('#confirmDialog').modal('close');
  }

  checkIfIsInstitution(): Promise<boolean> {
    return this.userService.checkIfUserIsInstitution(this.ownerId)
      .then(res => this.isInstitution = res);
  }

  goBack(){
    this.router.navigate([this.backUrl]);
  }

}


