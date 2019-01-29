import { Component, OnInit } from '@angular/core';

import { AuthService } from '../model/auth.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-logout',
    template: '<strong>Logging out...</strong>',
})
export class LogoutComponent implements OnInit {

    public submitted:boolean = false;
    public error:string = '';

    constructor(private _authService:AuthService, private _router:Router) { }

    ngOnInit() {
        this._authService.logout();
        this._router.navigate(['/']);
    }


}
