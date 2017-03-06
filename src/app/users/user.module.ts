import { NgModule } from '@angular/core';
import {RegisterOwnerComponent} from "./register-owner.component";
import {EditProfileComponent} from "./edit-profile.component";
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {FormInputComponent} from "./form-input.component";
import {ProfileComponent} from "./profile.component";
import {SubmitOKComponent} from "./submit-ok.component";


@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [RegisterOwnerComponent, ProfileComponent, EditProfileComponent, FormInputComponent, SubmitOKComponent],
  exports: [RegisterOwnerComponent]
})
export class UserModule { }
