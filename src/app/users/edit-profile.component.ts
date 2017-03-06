// app/profile_edit.component.ts
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import 'rxjs';

@Component({
  selector: 'edit-profile',
  template: `
    <div *ngIf="authService.loggedIn() && authService.userProfile">
      <div class="row">
        <div class="col-md-6">
          <h3>Profile</h3>
          <img [src]="authService.userProfile.picture" alt="" class="profile-img">
          <form (ngSubmit)="onSubmit()">
          
<!--            <div class="form-group">
              <label for="name">Address</label>
              <input type="text" class="form-control" [(ngModel)]="address" name="address" placeholder="Enter address">
            </div>-->
   
            <form-input text="Benutzername" placeholder="Benutzernamen eingeben" name="nickname" (onInputChange)="updateTempProfile($event)"></form-input>
            
            <form-input text="Email" placeholder="Email Adresse eingeben" name="email" (onInputChange)="updateTempProfile($event)"></form-input>
            
            <form-input text="Vorname" placeholder="Vornamen eingeben" name="firstname" (onInputChange)="updateTempProfile($event)"></form-input>
            
            <form-input text="Nachname" placeholder="Nachnamen eingeben" name="lastname" (onInputChange)="updateTempProfile($event)"></form-input>
            
            <form-input text="Adresse" placeholder="Adresse eingeben" name="address" (onInputChange)="updateTempProfile($event)"></form-input>
            
            <form-input text="Telefon" placeholder="Telefonnummer eingeben" name="phone" (onInputChange)="updateTempProfile($event)"></form-input>
            
            <button type="submit" class="btn btn-default">Submit</button>
          </form>
        </div>
      </div>
    </div>
    <h4 *ngIf="!authService.loggedIn()">You are not logged in, please click 'Log in' button to login</h4>
  `,
})

export class EditProfileComponent {

  address: string;
  tempProfile: Object[]=[];

  constructor(private authService: AuthService, private router: Router) {
  }

  updateTempProfile(keyValuePair){
    if((this.tempProfile.indexOf(keyValuePair) === -1)){
      this.tempProfile.push(keyValuePair);
    }
  }

  onSubmit() {
    for(let index in this.tempProfile){
      this.authService.editProfile(this.tempProfile[index]);
    }
    this.router.navigate(['/profile']);
  }
}
