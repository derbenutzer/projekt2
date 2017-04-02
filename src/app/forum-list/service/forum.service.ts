import { Injectable } from '@angular/core';
import { Forum } from '../../forum-detail/model/forum';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {ForumList} from "../model/forum-list";
import {PostService} from "../../posts/service/post.service";

@Injectable()
export class ForumService {

  private publicApiUrl = 'http://localhost:8180/public/roundtable';
  private privateApiUrl = 'http://localhost:8180/private/roundtable'; // URL to web api

  public idOfForumToModify:string;

  constructor (private http: Http, private postService: PostService){};

  getAuthHeader(){
    let headers = new Headers({ 'Authorization': 'Bearer '+ localStorage.getItem('id_token')});
    let options = new RequestOptions({ headers: headers });

    return options;
  }

  getForums(): Promise<ForumList> {
    return this.http.get(this.publicApiUrl)
      .toPromise()
      .then(response => new ForumList(response.json() as Forum[]))
      .catch(this.handleError);
  }

  getForum(): Promise<Forum> {
    if(!this.idOfForumToModify){
      return Promise.resolve(new Forum());
    }

    const url = `${this.privateApiUrl}/${this.idOfForumToModify}`;
    return this.http.get(url, this.getAuthHeader())
      .toPromise()
      .then(response => response.json() as Forum)
      .catch(this.handleError);
  }

  getForumById(forumId:string): Promise<Forum> {
    const url = `${this.privateApiUrl}/${forumId}`;
    return this.http.get(url, this.getAuthHeader())
      .toPromise()
      .then(response => response.json() as Forum)
      .catch(this.handleError);
  }

  initializeForum(): Promise<string> {
    return this.http.post(this.privateApiUrl, "empty", this.getAuthHeader())
      .toPromise()
      .then(response => response.json().id)
      .catch(this.handleError);
  }

  createNewForum(keyValuePairs:Object): Promise<Forum>{
    return this.initializeForum()
      .then(id => this.updateForum(id, keyValuePairs));
  }

  updateForum(id:string, keyValuePairs: Object): Promise<Forum> {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem('id_token') });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.privateApiUrl}/${id}`;

    return this.http.put(url,keyValuePairs,options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }

  setNumberOfUsers(forumId: string, number: number){
    this.getForumById(forumId)
      .then(forum => {
        let delta =  number - forum.numberOfUsers;
        this.updateForum(forumId,{"numberOfUsers": delta});
      })
  }

  setNumberOfPosts(forumId: string, number: number){
    this.getForumById(forumId)
      .then(forum => {
        let delta =  number - forum.numberOfPosts;
        this.updateForum(forumId,{"numberOfPosts": delta});
      })
  }


  handleForumFormSubmit(forumId:string, keyValuePairs:Object): Promise<Forum>{
    if(forumId){
      return this.updateForum(forumId,keyValuePairs);
    }
    else{
      return this.createNewForum(keyValuePairs);
    }
  }

  addUser(forumId: string):Promise<Forum>{
    return this.updateForum(forumId, {"numberOfUsers":1});
  }

  addPost(forumId: string) :Promise<Forum>{
    return this.updateForum(forumId, {"numberOfPosts":1});
  }

  deleteForum(id: string): Promise<string> {
    const url = `${this.privateApiUrl}/${id}`;
    return this.http.delete(url, this.getAuthHeader())
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
