import { NgModule } from '@angular/core';
import { AuthService } from './auth.service';


import {AuthHttp, AuthConfig} from "angular2-jwt";
import {Http, RequestOptions} from "@angular/http";
import {LoginToContinueComponent} from "./login-to-continue.component";
import {TranslateModule} from '@ngx-translate/core';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  providers: [AuthService, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }],
  declarations: [LoginToContinueComponent],
  exports:[LoginToContinueComponent, TranslateModule]
})
export class SharedModule{}
