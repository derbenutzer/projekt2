import { Injectable, Component } from '@angular/core';
import {DialogService} from "./dialog.service";



@Injectable()
export class ErrorLoggerService {

    constructor(public dialog: DialogService) {

    }

    public log(message: string): void {
        this.dialog.confirm(message);
    }
}

