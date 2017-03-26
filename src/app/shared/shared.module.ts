import { NgModule, ErrorHandler } from '@angular/core';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { DialogService } from './dialog.service';
import { AuthService } from './auth.service';


//Shared
import { ErrorHandlerService } from './error-handler.service';
import { ErrorLoggerService } from './error-logger.service';
import { ConfigurationService } from './configuration.service';
import {provideAuth, AuthHttp, AuthConfig} from "angular2-jwt";
import {Http, RequestOptions} from "@angular/http";
import {LoginToContinueComponent} from "./login-to-continue.component";
import {StringSplitPipe} from "./string-split.pipe";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  providers: [ConfigurationService, CanDeactivateGuard, DialogService, ErrorLoggerService, {provide: ErrorHandler, useClass: ErrorHandlerService}, AuthService, StringSplitPipe, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }],
  declarations: [LoginToContinueComponent, StringSplitPipe],
  exports:[LoginToContinueComponent, StringSplitPipe]
})
export class SharedModule{}
