import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {PostList} from "../model/post-list";

@Injectable()
export class PostService {

  private apiUrl = 'http://localhost:8180/private/post';  // URL to web api
  private apiUrl2 = 'http://localhost:8180/private/posts';  // URL to web api

  public idOfPostToModify:string;

  constructor (private http: Http){};

  getAuthHeader(){
    let headers = new Headers({ 'Authorization': 'Bearer '+ localStorage.getItem('id_token')});
    let options = new RequestOptions({ headers: headers });

    return options;
  }

  getPostsByForumId(forumId): Promise<Post[]> {
    const url = `${this.apiUrl2}/${forumId}`;
    return this.http.get(url, this.getAuthHeader())
      .toPromise()
      .then(response => response.json() as Post[])
      .catch(this.handleError);
  }

  getPost(): Promise<Post> {
    if(!this.idOfPostToModify){
      return Promise.resolve(new Post());
    }

    const url = `${this.apiUrl}/${this.idOfPostToModify}`;
    return this.http.get(url, this.getAuthHeader())
      .toPromise()
      .then(response => response.json() as Post)
      .catch(this.handleError);
  }

  getAllPostsForUserInForum(userId: string, forumId: string): Promise<Post[]> {
    return this.http.get(this.apiUrl, this.getAuthHeader())
      .toPromise()
      .then(response => {

        let list = response.json() as Post[];
        list = list.filter(post => post.postedIn==forumId && post.authorId==userId);
        return list;
      })
      .catch(this.handleError);
  }

  deleteAllPostsOfUserInForum(userId: string, forumId: string): Promise<Post[]> {
    return this.getAllPostsForUserInForum(userId, forumId)
      .then(postList =>{

        for(let post of postList){
          this.deletePost(post._id);
        }
        return postList;
      })
  }

  createNewPost(keyValuePairs:Object): Promise<Post>{
    return this.initializePost(keyValuePairs);
  }

  initializePost(keyValuePairs: Object): Promise<Post> {

    return this.http.post(this.apiUrl, "empty", this.getAuthHeader())
      .toPromise()
      .then(response => {
        let id = response.json().id;
        return this.updatePost(id,keyValuePairs);
      })
      .catch(this.handleError);
  }

  updatePost(id:string, keyValuePairs: Object): Promise<Post> {

    let headers = new Headers({ 'Authorization': 'Bearer '+ localStorage.getItem('id_token'), 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, keyValuePairs, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updatePostWithoutAuthorChange(id:string, keyValuePairs: Object): Promise<Post> {
    delete keyValuePairs['author'];
    delete keyValuePairs['authorId'];
    return this.updatePost(id,keyValuePairs);
  }

  deletePost(postId: string): Promise<string> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.delete(url, this.getAuthHeader())
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deletePostsAfterForumDelete(forumId){
    this.getPostsByForumId(forumId)
      .then(postList =>{
        for (let post of postList){
          this.deletePost(post._id);
        }
      })
  }

  handlePostFormSubmit(postId:string, keyValuePairs:Object): Promise<Post>{
    if(postId){
      return this.updatePostWithoutAuthorChange(postId,keyValuePairs);
    }
    else{
      return this.createNewPost(keyValuePairs);
    }
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
