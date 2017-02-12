import { NgModule } from '@angular/core';

import {SharedModule} from "../shared/shared.module";
import {HomeComponent} from "./home.component";
import {UserModule} from "../users/user.module";
import {ForumListModule} from "../forum-list/forum-list.module";
import {AppRoutingModule} from "../app-routing.module";
import {AuthService} from "../shared/auth.service";

@NgModule({
  imports: [SharedModule,UserModule,ForumListModule, AppRoutingModule],
  declarations: [HomeComponent],
  providers: [ AuthService],
  exports: [HomeComponent]
})
export class HomeModule { }
