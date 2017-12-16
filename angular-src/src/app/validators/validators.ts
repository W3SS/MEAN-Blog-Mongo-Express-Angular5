import { FormGroup } from '@angular/forms';

export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
        let password = group.controls.password;
        let password2 = group.controls.password2;
        
        if (password.value !== password2.value) {
        return {
            matchingPasswords: true
        };
        }
    }
}
  