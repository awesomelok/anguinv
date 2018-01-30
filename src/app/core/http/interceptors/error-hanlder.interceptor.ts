import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { MessageService } from '../../../shared';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(
        private messageService: MessageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch(
            responseError => {
                let message;

                const error = responseError.error;
                if (error && error .message) {
                    message = error.message;
                } else if (error && error.errors) {
                    message = error.errors.values().map(
                        (value) => value.join(' ')
                    ).join(' ');
                } else {
                    message = error.message;
                }

                this.messageService.message(message);
                return Observable.throw(responseError);
            }
        );
    }
}
