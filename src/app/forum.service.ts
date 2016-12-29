import { Injectable } from '@angular/core';
import { Forum } from './forum';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ForumService {

  private apiUrl = 'http://localhost:8180/api/rt';  // URL to web api

  constructor (private http: Http){};

  getForums(): Promise<Forum[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json() as Forum[])
      .catch(this.handleError);
  }

  getForum(id: string): Promise<Forum> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Forum)
      .catch(this.handleError);
  }

  createNewForum(title: string, owner: string, categories: string[]): void{
    this.initializeForum()
      .then(id => this.updateForum(id, title, owner, categories));
  }

  initializeForum(): Promise<string> {
    return this.http.post(this.apiUrl,"test")
      .toPromise()
      .then(response => response.json().id)
      .catch(this.handleError);
  }

  updateForum(id: string, title: string, owner: string, categories: string[] ): Promise<Forum> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("id: "+ id);
    const url = `${this.apiUrl}/${id}`;

    return this.http.put(url,{"title":title,"owner":owner, "categories":categories},options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
