import { Injectable, Inject } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarConfig
} from '@angular/material';

@Injectable()
export class MessageService {

    constructor(
        private matSnackBar: MatSnackBar
    ) { }

    message(text: string, action: string = 'CLOSE', config?: MatSnackBarConfig) {
        let defaultConfig = this.defaultMatSnackConfig();
        config = { ...defaultConfig, ...config };

        return this.matSnackBar.open(text, action, config);
    }

    defaultMatSnackConfig(): MatSnackBarConfig {
        let defaultConfig = new MatSnackBarConfig;

        return defaultConfig;
    }

    info(text: string, action: string = 'CLOSE', config?: MatSnackBarConfig) {
        config = { ...{ panelClass: 'info' }, ...config };

        return this.message(text, action, config);
    }
}
