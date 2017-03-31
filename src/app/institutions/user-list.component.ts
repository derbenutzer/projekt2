import { Component } from '@angular/core';
import {UserService} from "../users/service/user.service";
import {Router} from "@angular/router";
import {User} from "../users/model/user";
import {ForumDetailService} from "../forum-detail/service/forum-detail.service";
import {ForumService} from "../forum-list/service/forum.service";
import {PostService} from "../posts/service/post.service";
import {AuthService} from "../shared/auth.service";
declare let $: any;


@Component({
  selector: 'dashboard',
  template: `
      <h2 class="visually-hidden">{{title}}</h2>

      <div *ngIf="authService.loggedIn() && isInstitution > 0" class="row listContainer">
        <div *ngIf="userList && userList.length > 0" class="buttonPanel"><button (click)="goBack()" class="waves-effect waves-light btn">Zurück</button></div>
        <ul *ngIf="userList && userList.length > 0" class="collection">
          <li *ngFor="let user of userList" class="collection-item avatar">
          <div>
            <img class="circle" src="{{user.userImageUrl}}"/>
            <h3 class="title">{{user.firstName}} <span>{{user.lastName}}</span></h3>
            <p>
              {{user.email}}<br>
              {{user.phone}}<br>
              {{user.address}}<br>
              Kontakt: {{user.preferredContact}}<br>
              Beigetreten am: {{user.createDate | amDateFormat: 'DD-MM-YYYY'}}<br>
            </p>
            <div class="buttonPanel"><button (click)="deleteUser(user._id)" class="waves-effect waves-light btn">Nutzer Löschen</button></div>
            </div>
          </li>
        </ul>
        <div *ngIf="userList && userList.length > 0" class="buttonPanel"><button (click)="goBack()" class="waves-effect waves-light btn">Zurück</button></div>
        <div *ngIf="userList && userList.length < 1">
        <p class="flow-text">Bis jetzt haben sich noch keine Nutzer für dieses Forum registriert.</p>
        <div class="buttonPanel"><button (click)="goBack()" class="waves-effect waves-light btn">Zurück</button></div>
        </div>
      </div>
      
      <div *ngIf="!authService.loggedIn()">
       <login-to-continue [backUrl]="backUrl"></login-to-continue>
      </div>
        
  `,
  styles:[`
    .buttonPanel {
      margin: 1rem 0;
    }
    
  `]
})


export class UserListComponent {

  title = "Benutzer Verwaltung";
  ownerId: string;
  forumId: string;
  isInstitution = true;
  backUrl="/dashboard";
  userList: User[];

  constructor(private forumService: ForumService,
              private authService: AuthService,
              private userService: UserService,
              private postService: PostService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.forumId = this.forumService.idOfForumToModify;
    this.getUsersFromService();
  }

  getUsersFromService() {
    this.userService.getUsersByForumId(this.forumId)
      .then(userList => {
        //console.log(userList);
        this.userList = userList.filter(user => user.ownerOf.indexOf(this.forumId)==-1);
        console.log(this.userList);
        console.log(this.userList.length);
      });
  }

  checkIfIsInstitution(): Promise<boolean> {
    return this.userService.checkIfUserIsInstitution(this.ownerId)
      .then(res => this.isInstitution = res);
  }

  deleteUser(userId){
    this.userService.unRegisterUserForForum(userId, this.forumId)
      .then(userId => {
        this.getUsersFromService();
        this.postService.deleteAllPostsOfUserInForum(userId, this.forumId);
      })
  }

  goBack(){
    this.router.navigate([this.backUrl]);
  }

}


