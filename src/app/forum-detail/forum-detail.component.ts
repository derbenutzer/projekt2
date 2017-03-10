import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router}   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Forum } from './model/forum';
import { ForumService } from '../forum-list/service/forum.service';
//import {MockPostService} from "../posts/service/mock-post.service";
import {Post} from "../posts/model/post";
import {PostList} from "../posts/model/post-list";
import {PostService} from "../posts/service/post.service";
import {ForumDetailService} from "./service/forum-detail.service";
import {UserService} from "../users/service/user.service";
import {AuthService} from "../shared/auth.service";



@Component({
  selector: 'my-forum-detail',
  template: `
    <div *ngIf="forum">
      <h2>{{forum.title}}</h2>
      <div>
        <label>Id: </label><span>{{forum._id}}</span></div>
      <div>
        <label>Owner: </label><span>{{forum.owner}}</span></div>
      <div>
        <label>Category: </label><span>{{forum.categories}}</span></div>
      <div>
        <label>Location: </label><span>{{forum.location}}</span></div>
      <button class="waves-effect waves-light btn" (click)="goBack()">Back</button>
      <button class="waves-effect waves-light btn" (click)="deleteForum()"><i class="material-icons left">delete</i>Löschen</button>
      <button [routerLink]="['/forum',forum._id,'edit']" class="waves-effect waves-light btn"><i class="material-icons left">edit</i>Editieren</button>
      <div>
        <h3>Beiträge</h3>
        <button routerLink="/create-post" class="btn">Eintrag erstellen</button>
        
        
        <div *ngFor="let dividedPostList of dividedPostArrays" class="row section">
          <div *ngFor="let post of dividedPostList" class="col sm12 m4">
            <div class="card sticky-action medium hoverable">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="assets/images/einkauf.png">
              </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">{{ post.title }}<i class="material-icons right">more_vert</i></span>
                <p>{{ post.author }}</p>
              </div>
              <div class="card-action">
                <a href="">Kontaktieren</a><a (click)="modifyPost(post._id)" >Bearbeiten</a>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">{{ post.title }}<i class="material-icons right">close</i></span>
                <p>{{ post.content }}</p>
                <p>Ort: ToDo</p>
                <p>Datum: <time>{{ post.createDate | amDateFormat:'LL'}}</time></p>
              </div>
            </div>
          </div>
        </div>
        
<!--        <ul class="postList collection">
          <li class="collection-item avatar" *ngFor="let post of postList.getSortedByDate()">
            <img src="assets/images/fake-user.jpg" alt="user image" class="circle">
            <div>
              <a [routerLink]="['/post', post.id]"  class="linkToPost">{{ post.title }}</a>
              <div>Posted by: {{ post.author.getName() }} on: <time>{{ post.createDate | amDateFormat:'LL'}}</time></div>
            </div>      
          </li>
        </ul>-->
        
      </div>
    </div>
  `,
})

export class ForumDetailComponent implements OnInit {

  @Input() forum: Forum;
  dividedPostArrays: Post[][];
  userIsRegistered: boolean;
  forumId:string;

  constructor(
    private forumService: ForumService,
    private forumDetailService: ForumDetailService,
    private userService:UserService,
    private authService:AuthService,
    private postService: PostService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}



  ngOnInit(): void {

    if(this.authService.userProfile){
      if(this.authService.userProfile['user_metadata']['databaseId']) {
        this.openForum(this.authService.userProfile['user_metadata']['databaseId']);
        return;
      }
      else{
        this.router.navigate(['/home']);
      }
    }

    this.authService.checkLoginAndOpenLogin();

    this.authService.lock.on('authenticated', (authResult: any) => {
      //localStorage.setItem('id_token', authResult.idToken);

      this.authService.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }

        let metaData=profile["user_metadata"];

        if(!metaData.databaseId){
          this.router.navigate(['/home']);
        }
        else{
          this.openForum(metaData.databaseId);
        }
      });
    });
  }

  openForum(userId){
    this.route.params
      .switchMap((params: Params) => {
        this.forumId = params['id'];
        return this.forumService.getForum(this.forumId)
      })
      .subscribe(forum => {
        this.forum = forum;
        this.getPosts(this.forum._id);
        this.forumDetailService.openForumId = this.forum._id;
      })

    this.userService.isRegistered(userId, this.forumId)
      .then(isRegistered =>  {
        if(!isRegistered){
          this.router.navigate(['/register-for-forum', this.forumId]);
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

  deleteForum(): void {
    this.forumService.deleteForum(this.forum._id);
  }

  getPosts(forumId:string){
    //this.forumService.getPostsById(forumId);
    this.postService.getDividedPostsArrays(forumId,3)
      .then(dividedPostArrays => this.dividedPostArrays = dividedPostArrays);
  }

  modifyPost(postId) {
    this.router.navigate(['/create-post']);
    this.postService.idOfPostToModify = postId;
  }
}



