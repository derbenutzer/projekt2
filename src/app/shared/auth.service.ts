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
        this.userProfile=profile;
        localStorage.setItem('profile', JSON.stringify(this.userProfile));

        let metaData=this.userProfile["user_metadata"];

        if(!metaData){
          this.userService.createNewUser({"authId":this.userProfile['user_id'], "userName": this.userProfile['nickname'], "email": this.userProfile['email'], "userImageUrl": this.userProfile['picture']})
            .then(userId => {
              this.editProfile({"databaseId":userId});
              this.router.navigate(["/profile"]);
            });
        }
        else{
          this.userService.checkIfUserIsInstitution(this.getDatabaseId())
            .then(isInstitution => {
              this.userProfile['user_metadata']['isInstitution'] = isInstitution;
              localStorage.setItem('profile', JSON.stringify(this.userProfile));
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

  getMetaData(){
    if(this.userProfile){
      return this.userProfile['user_metadata']
    }
    else{
      return false;
    }
  }

  getUserName(): string {
    let metaData = this.getMetaData();
    if(metaData) {
      let name = metaData['firstName'] + " " + metaData['lastName'];
      return name;
    }
  }

  getUserEmail(): string {
    let metaData = this.getMetaData();
    if(metaData && metaData['email']) {
      let email = metaData['email'];
      return email;
    }
    else{
      return this.userProfile['email'];
    }
  }

  getDatabaseId(): string{
    let metaData= this.getMetaData();
    if(metaData) {
      return metaData['databaseId'];
    }
  }

  getPreferredContact(): string{
    let metaData= this.getMetaData();
    if(metaData) {
      return metaData['preferredContact'];
    }
  }


  isInstitution() {
    let metaData= this.getMetaData();
    if(metaData) {
      return metaData['isInstitution'];
    }
  }


  updateUserOnDatabase(keyValuePair){
    if(this.getDatabaseId()) {
      this.userService.updateUser(this.getDatabaseId(), keyValuePair);
    }
  }

  hasCompletedProfile() {
    //address is enough for confirmation because form can only be submitted if it is filled completely.
    let metaData= this.getMetaData();
    if(metaData) {
      return metaData['address'];
    }
    else{
      return false;
    }
  }

  editProfile(keyValuePair) {
    let headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };



    let user_metadata = keyValuePair;
    //user_metadata[key]=value;

    let data: any = JSON.stringify({user_metadata});

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
        error => console.error(error.json().message)
      );
  }


}
