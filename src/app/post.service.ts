import { Injectable } from '@angular/core';
import { Post } from './post';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {PostList} from "./post-list";

@Injectable()
export class PostService {

  private apiUrl = 'http://localhost:8180/api/rt';  // URL to web api

  constructor (private http: Http){};

/*  getPosts(): Promise<Post[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json() as Post[])
      .catch(this.handleError);
  }*/

  getPosts(): Promise<PostList> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => new PostList(response.json() as Post[]))
      .catch(this.handleError);
  }

  getPost(id: string): Promise<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Post)
      .catch(this.handleError);
  }

  createNewPost(author:string, title: string, content: string, tags: string[]): void{
    this.initializePost()
      .then(id => this.updatePost(id, author, title, content, tags));
  }

  initializePost(): Promise<string> {
    return this.http.post(this.apiUrl,"test")
      .toPromise()
      .then(response => response.json().id)
      .catch(this.handleError);
  }

  updatePost(id: string, author:string, title: string, content: string, tags: string[] ): Promise<Post> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("id: "+ id);
    const url = `${this.apiUrl}/${id}`;

    return this.http.put(url,{"title":title,"author":author, "tags":tags},options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
