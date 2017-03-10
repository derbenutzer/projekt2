import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InstitutionsStartComponent} from "./institutions-start.component";
import {RegisterInstitutionComponent} from "./register-institution.component";
import {AppRoutingModule} from "../app-routing.module";


@NgModule({
  imports: [FormsModule, CommonModule, AppRoutingModule],
  declarations: [InstitutionsStartComponent, RegisterInstitutionComponent],
})
export class InstitutionsModule { }
