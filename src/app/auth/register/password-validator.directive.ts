import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export class PasswordValidator {
    static match(
        passwordName: string = 'password',
    ): ValidatorFn {
        return (ac: AbstractControl): { [key: string]: any } => {
            let password = ac.parent ? ac.parent.get(passwordName).value : null;
            let passwordConfirmation = ac.value;
            return password !== passwordConfirmation ? { unMatched: true } : null;
        }
    }
}
