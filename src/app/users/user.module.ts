import { NgModule } from '@angular/core';
import {RegisterOwnerComponent} from "./register-owner.component";
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';


@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [RegisterOwnerComponent],
  exports: [RegisterOwnerComponent]
})
export class UserModule { }
