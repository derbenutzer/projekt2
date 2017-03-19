import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import {AuthHttp} from 'angular2-jwt';
import {UserService} from "../users/service/user.service";
import {Router} from "@angular/router";

//import { Router } from '@angular/router';

declare let Auth0Lock: any;

@Injectable()
export class AuthService {
  // We'll use the Auth0 Lock widget for capturing user credentials
  lock = new Auth0Lock('duxxII3mXfqfAnFbzbq3KAtF6TGgiWSl', 'scl2.eu.auth0.com', {
    auth:{
      redirect: false},
    },
  );

  userProfile: Object;

  constructor(
    public authHttp: AuthHttp,
    private userService: UserService,
    private router: Router
  ) {

    this.userProfile = JSON.parse(localStorage.getItem("profile"));

    // We'll listen for an authentication event to be raised and if successful will log the user in.
    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('id_token', authResult.idToken);

      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile=profile;

        let metaData=this.userProfile["user_metadata"];

        console.log(metaData);

        if(!metaData){
          this.userService.createNewUser({"authId":this.userProfile['user_id'], "userName": this.userProfile['nickname'], "email": this.userProfile['email'], "userImageUrl": this.userProfile['picture']})
            .then(userId => {
              this.editProfile({"databaseId":userId});
              this.router.navigate(["/profile"]);
            });
        }
      });

      this.lock.hide();
    });
  }

  // This method will display the lock widget
  login() {
    this.lock.show();
  }

  checkLoginAndOpenLogin(){
    if(!this.loggedIn()){
      this.login();
      return false;
    }
    return true;
  }

  logout() {
    // To log out, just remove the token and profile
    // from local storage
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.userProfile = null;
    this.router.navigate(['/home']);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getUserImage() {
    let profileJSON = localStorage.getItem('profile');
    if(profileJSON){
      return JSON.parse(profileJSON).picture;
    }
    return "no image";
  }

  getDatabaseId(){
    if(this.userProfile['user_metadata']) {
      return this.userProfile['user_metadata']['databaseId'];
    }
    else{
      return false;
    }
  }

  updateUserOnDatabase(keyValuePair){
    if(this.getDatabaseId()) {
      this.userService.updateUser(this.getDatabaseId(), keyValuePair);
    }
  }

  editProfile(keyValuePair) {
    var headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }



    let user_metadata = keyValuePair;
    //user_metadata[key]=value;

    var data: any = JSON.stringify({user_metadata});

    this.authHttp
      .patch('https://' + 'scl2.eu.auth0.com' + '/api/v2/users/' + this.userProfile['user_id'], data, {headers: headers})
      .map(response => response.json())
      .subscribe(
        response => {
          //Update profile
          this.userProfile = response;
          localStorage.setItem('profile', JSON.stringify(response));

          this.updateUserOnDatabase(keyValuePair);

        },
        error => alert(error.json().message)
      );
  }


}
