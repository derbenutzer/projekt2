import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {FormInputComponent} from "./form-input.component";
import {ProfileComponent} from "./profile.component";
import {SubmitOKComponent} from "./submit-ok.component";
import {RegisterForForumComponent} from "./register-for-forum.component";
import {UserService} from "./service/user.service";


@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [ProfileComponent, FormInputComponent, SubmitOKComponent, RegisterForForumComponent],
  providers: [UserService],
})
export class UserModule { }
