import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import {User} from "../model/user";

import 'rxjs/add/operator/toPromise';
import {Institution} from "../../institutions/model/Institution";


@Injectable()
export class UserService {

  private apiUrl = 'http://localhost:8180/private/user';  // URL to web api
  private apiUrl2 = 'http://localhost:8180/private/users';  // URL to web api

  constructor (private http: Http){};

  getAuthHeader(){
    let headers = new Headers({ 'Authorization': 'Bearer '+ localStorage.getItem('id_token')});
    let options = new RequestOptions({ headers: headers });

    return options;
  }

  initializeUser(): Promise<string> {
    return this.http.post(this.apiUrl, "empty", this.getAuthHeader())
      .toPromise()
      .then(response => response.json().id as string)
      .catch(this.handleError);
  }

  updateUser(userId:string, keyValuePairs: Object): Promise<string> {

    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ localStorage.getItem('id_token') });
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
    return this.http.get(url, this.getAuthHeader())
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getInstitution(id:string): Promise<Institution>{
    return this.getUser(id);
  }

  getUser(id: string): Promise<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url, this.getAuthHeader())
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  unRegisterUserForForum(userId:string ,forumId:string) :Promise<string>{
    return this.getUser(userId)
      .then(user => {
        let forumArray = user.registeredFor;
        let index = forumArray.indexOf(forumId);
        if (index > -1) {
          forumArray.splice(index, 1);
        }
        return this.updateUser(userId,{"registeredFor": forumArray});
      })
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

  checkIfUserIsInstitution(userId:string) :Promise<boolean>{
    return this.getInstitution(userId)
      .then(institution => institution.isInstitution && institution.isVerified);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



}
