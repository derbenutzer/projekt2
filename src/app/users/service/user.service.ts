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

    console.log("updateUser");
    console.log(userId);
    console.log(keyValuePairs);

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
    const url = `${this.apiUrl}/${forumId}`;
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

  registerUserAsInstitution(userId:string, keyValuePairs:Object){
    console.log(keyValuePairs);
    this.updateUser(userId, keyValuePairs)
  }

  checkIfUserIsInstitution(userId:string) :Promise<boolean>{
    return this.getUser(userId)
      .then(user => user.isInstitution);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


/*
  getPostList(): Promise<PostList> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => new PostList(response.json() as Post[]))
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



  getDividedPostsArrays2(forumId,divideBy:number): Promise<Post[][]> {

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

  updatePost(id:string, keyValuePairs: Object): Promise<Post> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${this.apiUrl}/${id}`;

    return this.http.put(url,keyValuePairs,options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
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

  handlePostFormSubmit(postId:string, keyValuePairs:Object){
    if(postId){
      this.updatePost(postId,keyValuePairs);
    }
    else{
      this.createNewPost(keyValuePairs);
    }
  }*/



}
