import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {AuthService} from '../model/auth.service';
import {Router} from "@angular/router";
import { NGXLogger } from 'ngx-logger';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  .login-form-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width:100%;
  }
  .login-form-wrap mat-card {
   
  }
`]
})
export class LoginComponent implements OnInit {
    private _loginForm:FormGroup;
    private _formErrors:any;
    private _submitted:boolean = false;
    private _errorMessage:string = '';

    constructor(private _authService:AuthService,
                private _router:Router,
                private _formBuilder:FormBuilder,
                private logger: NGXLogger
            ) {

        this._loginForm = _formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        });
        this._loginForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

    }

    private _setFormErrors(errorFields:any):void{
        for (let key in errorFields) {
            // skip loop if the property is from prototype
            if (!errorFields.hasOwnProperty(key)) continue;

            let message = errorFields[key];
            this._formErrors[key].valid = false;
            this._formErrors[key].message = message;
        }
    }

    private _resetFormErrors():void{
        this._formErrors = {
            username: {valid: true, message: ''},
            password: {valid: true, message: ''},
        };
    }

    private _isValid(field):boolean {
        let isValid:boolean = false;

        // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
        if(this._loginForm.controls[field].touched == false) {
            isValid = true;
        }
        // If the field is touched and valid value, then it is considered as valid.
        else if(this._loginForm.controls[field].touched == true && this._loginForm.controls[field].valid == true) {
            isValid = true;
        }
        return isValid;
    }

    public onValueChanged(data?: any) {
        if (!this._loginForm) { return; }
        const form = this._loginForm;
        for (let field in this._formErrors) {
            // clear previous error message (if any)
            let control = form.get(field);
            if (control && control.dirty) {
                this._formErrors[field].valid = true;
                this._formErrors[field].message = '';
            }
        }
    }

    ngOnInit() {
        this._resetFormErrors();
        this._authService.logout();
    }

    public onSubmit(elementValues: any) {
        this._submitted = true;
        this._authService.login(elementValues.username, elementValues.password)
            .subscribe(
                result => {
                    this.logger.debug(result);
                    if(result['code'] === 200) {
                        this._router.navigate(['/dashboard']);
                    } else {
                        this._errorMessage = 'Staffname or password is incorrect.';
                        this._submitted = false;
                    }
                },
                error => {
                    this._submitted = false;
                    // Validation error
                    if(error.status == 422) {
                        this._resetFormErrors();
                        // this._errorMessage = "There was an error on submission. Please check again.";
                        let errorFields = JSON.parse(error.data.message);
                        this._setFormErrors(errorFields);
                    } else {
                        this._errorMessage = error.data;
                    }
                }
            );
    }
}