// app/profile_edit.component.ts
import {Component, ViewChild, ViewChildren, QueryList} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import 'rxjs';
import {FormInputComponent} from "./form-input.component";

@Component({
  selector: 'profile',
  template: `

    <div *ngIf="authService.loggedIn() && authService.userProfile">
      <div class="row section">
        <div class="col s6">
        <h3>Profil</h3>
        <img [src]="authService.userProfile.picture" alt="" class="profile-img">
        </div>
      </div>
        <div class="row">
          <form class="col s12" (ngSubmit)="onSubmit()">
          
            <div class="row">
              <div class="input-field col l6 m6 s12">
                <form-input text="Vorname" placeholder="Vornamen eingeben" name="firstName" (onInputChange)="updateTempProfile($event)"></form-input>
              </div>
              
              <div class="input-field col l6 m6 s12">
                <form-input text="Nachname" placeholder="Nachnamen eingeben" name="lastName" (onInputChange)="updateTempProfile($event)"></form-input>
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
              <p>Wie möchten Sie kontaktiert werden?</p>
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
    <div *ngIf="!authService.loggedIn()">
       <login-to-continue [backUrl]="backUrl"></login-to-continue>
    </div>
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
  backUrl="/home";

  @ViewChildren(FormInputComponent)
  private inputs:  QueryList<FormInputComponent>;

  constructor(private authService: AuthService, private router: Router) {
    this.setContactMethod();
  }

  setContactMethod(){

    if(this.authService.getPreferredContact()){
      this.preferredContact = this.authService.getPreferredContact();
    }
    else{
      this.preferredContact = "email";
    }
  }


  updateTempProfile(keyValuePair){
    if((this.tempProfile.indexOf(keyValuePair) === -1)){
      this.tempProfile.push(keyValuePair);
    }
  }

  onSubmit() {
    this.updateTempProfile({"preferredContact":this.preferredContact});

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
