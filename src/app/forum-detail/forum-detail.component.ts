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



@Component({
  selector: 'my-forum-detail',
  template: `
    <div *ngIf="authService.loggedIn() && forum">
      <h2>{{forum.title}}</h2>
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
  `,
})

export class ForumDetailComponent implements OnInit {

  @Input() forum: Forum;
  dividedPostArrays: Post[][];
  forumId:string;
  backUrl="/forum-list";

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
        this.openForum(this.authService.userProfile['user_metadata']['databaseId']);
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
          this.openForum(metaData.databaseId);
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
      })

    this.userService.isRegistered(userId, this.forumId)
      .then(isRegistered =>  {
        if(!isRegistered){
          this.router.navigate(['/register-for-forum', this.forumId]);
        }
      });
  }

  goBack(): void {
    this.router.navigate([this.backUrl]);
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



