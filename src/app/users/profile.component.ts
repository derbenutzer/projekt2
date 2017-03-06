// app/profile_edit.component.ts
import {Component, ViewChild, ViewChildren, QueryList} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import 'rxjs';
import {FormInputComponent} from "./form-input.component";

@Component({
  selector: 'profile',
  template: `
<!--    <div *ngIf="authService.loggedIn() && authService.userProfile">
      <div class="row">
        <div class="col-md-6">
          <h3>Profile</h3>
          <img [src]="authService.userProfile.picture" alt="" class="profile-img">
          <form (ngSubmit)="onSubmit()">
          
&lt;!&ndash;            <div class="form-group">
              <label for="name">Address</label>
              <input type="text" class="form-control" [(ngModel)]="address" name="address" placeholder="Enter address">
            </div>&ndash;&gt;
   
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
    <h4 *ngIf="!authService.loggedIn()">You are not logged in, please click 'Log in' button to login</h4>-->
    
    <div *ngIf="authService.loggedIn() && authService.userProfile">
      <div class="row section">
        <div class="col s6">
        <h3>Profil</h3>
        <img [src]="authService.userProfile.picture" alt="" class="profile-img">
        </div>
      </div>
      <div class="container">
        <div class="row">
          <form class="col s12" (ngSubmit)="onSubmit()">
          
            <div class="row">
              <div class="input-field col s6">
                <form-input text="Vorname" placeholder="Vornamen eingeben" name="firstname" (onInputChange)="updateTempProfile($event)"></form-input>
              </div>
              
              <div class="input-field col s6">
                <form-input text="Nachname" placeholder="Nachnamen eingeben" name="lastname" (onInputChange)="updateTempProfile($event)"></form-input>
              </div>
            </div>
            
            <div class="row">
              <div class="input-field col s12">    
                <form-input text="Benutzername" placeholder="Benutzernamen eingeben" name="nickname" (onInputChange)="updateTempProfile($event)"></form-input>
              </div>
            </div>
            
            <div class="row">
              <div class="input-field col s12">    
                <form-input text="Email" placeholder="Email Adresse eingeben" name="email" (onInputChange)="updateTempProfile($event)"></form-input>
              </div>
            </div>
              
            <div class="row">
              <div class="input-field col s12">            
                <form-input text="Adresse" placeholder="Adresse eingeben" name="address" (onInputChange)="updateTempProfile($event)"></form-input>
              </div>
            </div>
            
            <div class="row">
              <div class="input-field col s12">            
                <form-input text="Telefon" placeholder="Telefonnummer eingeben" name="phone" (onInputChange)="updateTempProfile($event)"></form-input>
              </div>
            </div>   
			  
            <div class="row radioInput">
              <div class="input-field col s12">
              <p>Wie möchten sie kontaktiert werden?</p>
                <p>
                  <input [(ngModel)]="preferredContact" [checked]="preferredContact=='email'" name="preferredContact" type="radio" value="email" id="emailRadio"/>
                  <label for="emailRadio">Per Email</label>
                </p>
                <p>
                  <input [(ngModel)]="preferredContact" [checked]="preferredContact=='phone'" name="preferredContact" type="radio" value="phone" id="phoneRadio" />
                  <label for="phoneRadio">Per Telefon</label>
                </p>
              </div>
            </div>
            
            <div class="row">
              <div class="input-field col s12">
                <button type="submit" class="btn btn-default">Speichern</button>
                <button type="button" (click)="onReset()" class="btn btn-default">Zurücksetzen</button>
              </div>
            </div>
            

          </form>
          
        </div>
      </div>
    </div>
    <h3 *ngIf="!authService.loggedIn()">Sie sind nicht eingeloggt. Bitte klicken sie auf "Anmelden"</h3>
  `,
  styles:[`

    .radioInput {
      margin-top: -2rem;
      margin-bottom: 2rem;
    }

  `]

})

export class ProfileComponent {

  tempProfile: Object[]=[];
  preferredContact = "email";

  @ViewChildren(FormInputComponent)
  private inputs:  QueryList<FormInputComponent>;

  constructor(private authService: AuthService, private router: Router) {
    this.setContactMethod();
  }

  setContactMethod(){
    let metaData=this.authService.userProfile["user_metadata"];

    if(metaData && metaData.contactMethod){
      this.preferredContact = metaData.contactMethod;
    }
  }


  updateTempProfile(keyValuePair){
    if((this.tempProfile.indexOf(keyValuePair) === -1)){
      this.tempProfile.push(keyValuePair);
    }
  }

  onSubmit() {
    console.log(this.preferredContact);
    this.updateTempProfile({"contactMethod":this.preferredContact});

    for(let index in this.tempProfile) {
      this.authService.editProfile(this.tempProfile[index]);
    }
    this.router.navigate(['/submit-ok']);
  }

  onReset() {
    this.tempProfile=[];
    this.inputs.forEach((input) => input.setData());

    this.setContactMethod();
  }

}
