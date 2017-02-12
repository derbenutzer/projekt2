import { NgModule, ErrorHandler } from '@angular/core';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { DialogService } from './dialog.service';
import { AuthService } from './auth.service';


//Shared
import { ErrorHandlerService } from './error-handler.service';
import { ErrorLoggerService } from './error-logger.service';
import { ConfigurationService } from './configuration.service';

@NgModule({
  providers: [ConfigurationService, CanDeactivateGuard, DialogService, ErrorLoggerService, {provide: ErrorHandler, useClass: ErrorHandlerService}, AuthService]
})
export class SharedModule { }
