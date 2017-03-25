import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router}   from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Forum } from './model/forum';
import { ForumService } from '../forum-list/service/forum.service';
import {Post} from "../posts/model/post";
import {PostService} from "../posts/service/post.service";
import {ForumDetailService} from "./service/forum-detail.service";
import {UserService} from "../users/service/user.service";
import {AuthService} from "../shared/auth.service";
import {PostList} from "../posts/model/post-list";
import {User} from "../users/model/user";
declare let $: any;



@Component({
  selector: 'my-forum-detail',
  template: `
    <div *ngIf="authService.loggedIn() && forum">
      <h2>{{forum.title}}</h2>
      <div>
      <p class="flow-text">{{forum.description}}</p>
        <h3>Beiträge</h3>
        <button routerLink="/create-post" class="btn">Eintrag erstellen</button>
        
        <div *ngIf="postList" class="row section">
          <div *ngFor="let post of postList.getSortedByDate()" class="col sm12 m6">
            <div class="card sticky-action medium hoverable">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="https://i1.wp.com/cdn.auth0.com/avatars/{{ post.author.substring(0, 2).toLowerCase() }}.png?ssl=1" />
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4"><span class="activator">{{ post.title }}</span><i class="material-icons right">more_vert</i></span>
                <p>{{ post.author }}</p>
              </div>
              <div class="card-action">
                <a class="jsLink" *ngIf="!(userId == post.authorId)" (click)="contactPostAuthor(post.authorId)">Kontaktieren</a>
                <a class="jsLink" *ngIf="userIsOwner || userId == post.authorId" (click)="modifyPost(post._id)">Bearbeiten</a>
                <a class="jsLink" *ngIf="userIsOwner || userId == post.authorId" (click)="openDialog(post)">Löschen</a>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">{{ post.title }}<i class="material-icons right">close</i></span>
                <p>{{ post.content }}</p>
                <p>Datum: <time>{{ post.createDate | amDateFormat: 'DD-MM-YYYY'}}</time></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div *ngIf="!authService.loggedIn()">
       <login-to-continue [backUrl]="backUrl"></login-to-continue>
    </div>
    
    <div id="confirmDialog" class="modal">
      <div class="modal-content">
        <h4>Beitrag löschen</h4>
        <p class="flow-text">Möchten sie diesen Beitrag wirklich löschen?</p>
      </div>
      <div class="modal-footer">
        <a (click)="deletePost()" class=" modal-action modal-close waves-effect waves-light btn-flat">Löschen</a>
        <a (click)="closeDialog()" class=" modal-action modal-close waves-effect waves-light btn-flat">Abbrechen</a>
      </div>
    </div>
    
    <div  id="contactDialog" class="modal">
      <div *ngIf="userToContact" class="modal-content">
        <h4>{{userToContact.firstName+" "+userToContact.lastName}} kontaktieren</h4>
        <div *ngIf="userToContact.preferredContact=='phone'">
          <p class="flow-text">{{userToContact.firstName+" "+userToContact.lastName}} möchte telefonisch kontaktiert werden.</p>
          <p class="flow-text"> {{userToContact.phone}}</p>
        </div>
        <div *ngIf="userToContact.preferredContact=='email'">
          <p class="flow-text">{{userToContact.firstName+" "+userToContact.lastName}} möchte per E-Mail kontaktiert werden.</p>
          <p class="flow-text"> {{userToContact.email}}</p>
        </div>
      </div>
      <div class="modal-footer">
        <a (click)="closeContactDialog()" class=" modal-action modal-close waves-effect waves-light btn-flat">OK</a>
      </div>
    </div>
    
    
  `,
  styles:[`
  
    @media only screen and (min-width: 10px){
      .row .col.m6 {
          width: 100%;
      }
      
      .card.medium {
          height: 480px;
      }
    }
    
    @media only screen and (min-width: 320px){
      
      .card.medium {
          height: 520px;
      }
    }
    
    @media only screen and (min-width: 360px){
      .row .col.m6 {
          width: 50%;
      }
      .card.medium {
          height: 450px;
      }
    }
    
    @media only screen and (min-width: 680px){
      .row .col.m6 {
          width: 33%;
      }
      
      .card.medium {
          height: 450px;
      }
    }
    
    @media only screen and (min-width: 1260px){
      .row .col.m6 {
          width: 25%;
      }
      
      .card.medium {
          height: 500px;
      }
    }
    
    .card-title span{
      display: inline-block;
      width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      float: left;
    }
    
    .card-title i {
      width:10%;
      line-height: 48px;
      margin-left:0;
    }
    
    .card .card-reveal .card-title {
      word-break:break-all;
    }
    
`]
})

export class ForumDetailComponent implements OnInit {

  @Input() forum: Forum;
  postList: PostList;
  forumId:string;
  userId:string;
  userIsOwner:boolean;
  backUrl="/forum-list";
  postToDelete:Post;
  userToContact:User;

  constructor(
    private forumService: ForumService,
    private forumDetailService: ForumDetailService,
    private userService:UserService,
    private authService:AuthService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}



  ngOnInit(): void {

    if(this.authService.userProfile){

      if(this.authService.userProfile['user_metadata']) {
        this.userId = this.authService.userProfile['user_metadata']['databaseId'];
        this.openForum(this.userId);
        return;
      }
      else{
        this.router.navigate(['/home']);
      }
    }

    //this.authService.checkLoginAndOpenLogin();

    this.authService.lock.on('authenticated', (authResult: any) => {
      //localStorage.setItem('id_token', authResult.idToken);

      this.authService.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }

        let metaData=profile["user_metadata"];

        if(!metaData){
          this.router.navigate(['/forum-list']);
        }
        else{
          this.userId = metaData.databaseId;
          this.openForum(this.userId);
        }
      });
    });
  }

  openForum(userId){
    this.route.params
      .switchMap((params: Params) => {
        this.forumId = params['id'];
        return this.forumService.getForumById(this.forumId)
      })
      .subscribe(forum => {
        this.forum = forum;
        this.getPosts(this.forum._id);
        this.forumDetailService.openForumId = this.forum._id;
      });

    this.userService.isRegistered(userId, this.forumId)
      .then(isRegistered =>  {
        if(!isRegistered){
          this.router.navigate(['/register-for-forum', this.forumId]);
        }
      });

    this.userService.isOwner(userId, this.forumId)
      .then(isOwner=>  {
        this.userIsOwner = isOwner;
      });
    $('.modal').modal();
  }

  goBack(): void {
    this.router.navigate([this.backUrl]);
  }

  openDialog(post:Post) {
    this.postToDelete = post;
    $('#confirmDialog').modal('open');
  }

  openContactDialog() {
    console.log("contactDialogOpen");
    $('#contactDialog').modal('open');
  }

  deletePost(): void {
    this.postService.deletePost(this.postToDelete._id)
      .then(res => this.openForum(this.userId));
  }

  closeDialog() {
    this.postToDelete = null;
    $('#confirmDialog').modal('close');
  }

  closeContactDialog() {
    this.userToContact = null;
    $('#contactDialog').modal('close');
  }

  getPosts(forumId:string) {
    this.postService.getPostsByForumId(forumId)
      .then(posts => {
        this.postList = new PostList(posts);
      });
  }

  modifyPost(postId) {
    this.router.navigate(['/create-post']);
    this.postService.idOfPostToModify = postId;
  }

  contactPostAuthor(authorId: string){
    this.userService.getUser(authorId)
      .then(user =>{
        console.log(user);
        this.userToContact = user;
        this.openContactDialog();
      })
  }
}



