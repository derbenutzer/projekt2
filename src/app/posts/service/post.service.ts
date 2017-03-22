import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {PostList} from "../model/post-list";

@Injectable()
export class PostService {

  private apiUrl = 'http://localhost:8180/api/post';  // URL to web api
  private apiUrl2 = 'http://localhost:8180/api/posts';  // URL to web api

  public idOfPostToModify:string;

  constructor (private http: Http){};

  getPostList(): Promise<PostList> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => new PostList(response.json() as Post[]))
      .catch(this.handleError);
  }

  getPostsByForumId(forumId): Promise<Post[]> {
    const url = `${this.apiUrl2}/${forumId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Post[])
      .catch(this.handleError);
  }

  getDividedPostsArrays(forumId,divideBy:number): Promise<Post[][]> {

    return this.getPostsByForumId(forumId)
      .then(postArray => {
        let postList = new PostList(postArray);
        let ArrayToDivide = postList.getSortedByDate();
        let dividedArrays=[];

        let i,j,temparray,chunk = divideBy;
        for (i=0,j=ArrayToDivide.length; i<j; i+=chunk) {
          temparray = ArrayToDivide.slice(i,i+chunk);
          dividedArrays[((i+chunk)/chunk)-1]=temparray;
        }
        return dividedArrays;
      })
      .catch(this.handleError);
  }


/*  getPost(id: string): Promise<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Post)
      .catch(this.handleError);
  }*/

  getPost(): Promise<Post> {
    if(!this.idOfPostToModify){
      return Promise.resolve(new Post());
    }

    const url = `${this.apiUrl}/${this.idOfPostToModify}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Post)
      .catch(this.handleError);
  }

  getAllPosts(): Promise<Post[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json() as Post[])
      .catch(this.handleError);
  }

  createNewPost(keyValuePairs:Object): Promise<Post>{
    return this.initializePost(keyValuePairs);
  }

  initializePost(keyValuePairs: Object): Promise<Post> {
    return this.http.post(this.apiUrl,"test")
      .toPromise()
      .then(response => {
        let id = response.json().id;
        return this.updatePost(id,keyValuePairs);
      })
      .catch(this.handleError);
  }

  updatePost(id:string, keyValuePairs: Object): Promise<Post> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url,keyValuePairs,options)
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
    return this.http.delete(url)
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
