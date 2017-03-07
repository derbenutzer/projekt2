import { Injectable } from '@angular/core';
import { Forum } from '../../forum-detail/model/forum';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {ForumList} from "../model/forum-list";
import {Post} from "../../posts/model/post";
import {PostService} from "../../posts/service/post.service";

@Injectable()
export class ForumService {

  private apiUrl = 'http://localhost:8180/api/roundtable';  // URL to web api

  constructor (private http: Http, private postService: PostService){};

  getForums(): Promise<ForumList> {
    let headers = new Headers({ 'Authorization': 'Bearer '+ localStorage.getItem('id_token')});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.apiUrl,options)
      .toPromise()
      .then(response => new ForumList(response.json() as Forum[]))
      .catch(this.handleError);
  }

  getForum(id: string): Promise<Forum> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Forum)
      .catch(this.handleError);
  }

  getPostsById(id: string): Promise<Post[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(forum => {
        let myForum = forum.json() as Forum;

        console.log("myForum.posts");
        console.log(myForum.posts);

        return myForum.posts;
      })
      .catch(this.handleError);
  }

/*  addPostToForum(forumId:string, post:Post){
    this.getPostsById(forumId)
      .then(posts => {
        posts.push(post);
        console.log(posts);
        this.updateForum(forumId, {"posts":posts});
      })
  }*/

  createNewForum(title: string, owner: string, categories: string[], institutions: string[]): void{
    this.initializeForum()
      .then(id => this.updateForum(id, {"title":title, "owner":owner, "categories": categories, "institutions": institutions}));
  }

  initializeForum(): Promise<string> {
    return this.http.post(this.apiUrl,"test")
      .toPromise()
      .then(response => response.json().id)
      .catch(this.handleError);
  }


  updateForum(id:string, keyValuePairs: Object): Promise<Forum> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.apiUrl}/${id}`;

      return this.http.put(url,keyValuePairs,options)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);

  }


/*  updateForum2(id: string, title: string, owner: string, categories: string[], institutions: string[] ): Promise<Forum> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.apiUrl}/${id}`;

    return this.http.put(url,{"title":title,"owner":owner, "categories":categories, "institutions":institutions},options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }*/


  deleteForum(id: string): Promise<string> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(response => response.json())
      .then(response => this.postService.deletePostsAfterForumDelete(id))
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
