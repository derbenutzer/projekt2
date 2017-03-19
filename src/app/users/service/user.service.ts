import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import {User} from "../model/user";

import 'rxjs/add/operator/toPromise';
import {Institution} from "../../institutions/model/Institution";


@Injectable()
export class UserService {

  userId:string;

  private apiUrl = 'http://localhost:8180/api/user';  // URL to web api
  private apiUrl2 = 'http://localhost:8180/api/users';  // URL to web api

  constructor (private http: Http){};

  initializeUser(): Promise<string> {
    return this.http.post(this.apiUrl,"test")
      .toPromise()
      .then(response => response.json().id as string)
      .catch(this.handleError);
  }

  updateUser(userId:string, keyValuePairs: Object): Promise<string> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.apiUrl}/${userId}`;

    return this.http.put(url,keyValuePairs,options)
      .toPromise()
      .then(response => userId)
      .catch(this.handleError);
  }


  createNewUser(keyValuePairs:Object): Promise<string>{
    return this.initializeUser()
      .then(id => {
        this.updateUser(id, keyValuePairs);
        return id;
      })
      .catch(this.handleError);
  }

  getUsersByForumId(forumId): Promise<User[]> {
    const url = `${this.apiUrl2}/${forumId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  userIsRegisteredForForum(userId, forumId): Promise<User[]> {
    const url = `${this.apiUrl}/${forumId}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getInstitution(id:string): Promise<Institution>{
    return this.getUser(id);
  }

  getUser(id: string): Promise<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  registerUserForForum(userId:string ,forumId:string) :Promise<string>{
    return this.updateUser(userId,{"registeredFor": forumId});
  }

  isRegistered(userId: string, forumId: string) :Promise<boolean>{
    return this.getUser(userId)
      .then(user => !(user.registeredFor.indexOf(forumId)==-1))
      .catch(this.handleError);
  }

  isOwner(userId: string, forumId: string) :Promise<boolean>{
    return this.getUser(userId)
      .then(user => !(user.ownerOf.indexOf(forumId)==-1))
      .catch(this.handleError);
  }

  registerUserAsInstitution(userId:string, keyValuePairs:Object){
    console.log(keyValuePairs);
    this.updateUser(userId, keyValuePairs)
  }

  checkIfUserIsInstitution(institutionId:string) :Promise<boolean>{
    return this.getInstitution(institutionId)
      .then(institution => institution.isInstitution && institution.isVerified);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
