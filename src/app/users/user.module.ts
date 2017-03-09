import { NgModule } from '@angular/core';
import {RegisterOwnerComponent} from "./register-owner.component";
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {FormInputComponent} from "./form-input.component";
import {ProfileComponent} from "./profile.component";
import {SubmitOKComponent} from "./submit-ok.component";
import {RegisterForForumComponent} from "./register-for-forum.component";
import {UserService} from "./service/user.service";


@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [RegisterOwnerComponent, ProfileComponent, FormInputComponent, SubmitOKComponent, RegisterForForumComponent],
  providers: [UserService],
  exports: [RegisterOwnerComponent]
})
export class UserModule { }
