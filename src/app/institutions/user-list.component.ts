import { Component } from '@angular/core';
import {UserService} from "../users/service/user.service";
import {Router} from "@angular/router";
import {User} from "../users/model/user";
import {ForumDetailService} from "../forum-detail/service/forum-detail.service";
import {ForumService} from "../forum-list/service/forum.service";
declare let $: any;


@Component({
  selector: 'dashboard',
  template: `
      <h2 class="visually-hidden">{{title}}</h2>

      <div class="row listContainer">
      
        <ul class="collection">
          <li *ngFor="let user of userList" class="collection-item avatar">
          <div>
            <img class="circle" src="{{user.userImageUrl}}"/>
            <h3 class="title">{{user.firstName}} <span>{{user.lastName}}</span></h3>
            </div>
          </li>
        </ul>
        
      </div>
        
  `,
})


export class UserListComponent {

  title = "Benutzer Verwaltung";
  ownerId: string;
  forumId: string;
  isInstitution = true;
  backUrl="/dashboard";
  userList: User[];

  constructor(private forumService: ForumService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.forumId = this.forumService.idOfForumToModify;
    this.getUsersFromService();
  }

  getUsersFromService() {
    this.userService.getUsersByForumId(this.forumId)
      .then(userList => {
        console.log(userList);
        this.userList = userList;
      });
  }

  checkIfIsInstitution(): Promise<boolean> {
    return this.userService.checkIfUserIsInstitution(this.ownerId)
      .then(res => this.isInstitution = res);
  }

  goBack(){
    this.router.navigate([this.backUrl]);
  }

}


