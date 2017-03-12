import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InstitutionsStartComponent} from "./institutions-start.component";
import {RegisterInstitutionComponent} from "./register-institution.component";
import {AppRoutingModule} from "../app-routing.module";
import {SharedModule} from "../shared/shared.module";
import {DashboardComponent} from "./dashboard.component";
import {ForumListModule} from "../forum-list/forum-list.module";
import {MomentModule} from "angular2-moment";
import { MaterialModule } from '@angular/material';
import {CreateForumComponent} from "./create-forum.component";


@NgModule({
  imports: [FormsModule, MomentModule, CommonModule, AppRoutingModule, SharedModule, ForumListModule, MaterialModule],
  declarations: [InstitutionsStartComponent, RegisterInstitutionComponent, DashboardComponent, CreateForumComponent],
})
export class InstitutionsModule { }
