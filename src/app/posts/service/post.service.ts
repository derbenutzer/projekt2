import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {PostList} from "../model/post-list";
import {ForumDetailService} from "../../forum-detail/service/forum-detail.service";

@Injectable()
export class PostService {

  private apiUrl = 'http://localhost:8180/api/post';  // URL to web api
  private apiUrl2 = 'http://localhost:8180/api/posts';  // URL to web api

  constructor (private http: Http){};

/*  getPosts(): Promise<Post[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json() as Post[])
      .catch(this.handleError);
  }*/

  getPostList(): Promise<PostList> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => new PostList(response.json() as Post[]))
      .catch(this.handleError);
  }

  getDividedPostsArrays(forumId,divideBy:number): Promise<Post[][]> {

    const url = `${this.apiUrl2}/${forumId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let postList = new PostList(response.json() as Post[]);
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

  getPost(id: string): Promise<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Post)
      .catch(this.handleError);
  }

  createNewPost(keyValuePairs:Object): void{
  this.initializePost()
    .then(id => {
      this.updatePost(id, keyValuePairs);
    });
}

  initializePost(): Promise<string> {
    return this.http.post(this.apiUrl,"test")
      .toPromise()
      .then(response => response.json().id)
      .catch(this.handleError);
  }

/*  updatePost2(id: string, author:string, title: string, content: string, tags: string[] ): Promise<Post> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //console.log("id: "+ id);
    const url = `${this.apiUrl}/${id}`;

    return this.http.put(url,{"title":title,"author":author, "content":content, "tags":tags},options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }*/

  updatePost(id:string, keyValuePairs: Object): Promise<Post> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.apiUrl}/${id}`;

    return this.http.put(url,keyValuePairs,options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
