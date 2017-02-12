import { Injectable, ErrorHandler } from '@angular/core';
import { ErrorLoggerService } from './error-logger.service';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

  constructor(private logger: ErrorLoggerService) {
    super(true);
  }

  public handleError(exception: any) {       
    //TODO use material design dialog as soon available!  
    if (exception.message && exception.message.length > 0) {
      this.logger.log(exception.message);
    } else {
      this.logger.log('oops something went wrong!');      
    }

    super.handleError(exception);
  }
}
