
import {throwError as observableThrowError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {ConfigService} from './config.service';
import {Router} from "@angular/router";

import { JwtHelperService } from '@auth0/angular-jwt';
import { map,catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
    private loggedIn = false;
    public redirectURL = '';
    public jwtHelper: JwtHelperService = new JwtHelperService();


    constructor(private _configService: ConfigService,
                private _router: Router,
                private _http: HttpClient,
            ) {
        this.loggedIn = this.isLoggedIn();
    }

    public login(username, password) {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json; charset=UTF-8');                                                                                                                                                                      

        return this._http
            .post(
                this._configService.apiHost + '/auth/login/',
                JSON.stringify({
                      "email": username,
                      "password": password
                }),
                {headers: headers}
            )
            .pipe ( map(response => {
               
                if (response['code'] == 200 && response['data'] !== "") {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                    localStorage.setItem(ConfigService.token, response['data']);
                    this.loggedIn = true;
                  
                } else {
                    localStorage.removeItem(ConfigService.token);
                 
                }
                return response;
            }) ,  catchError(this.handleError)  );
 
    }
    private log(val) { console.log(val); }
    public logout(): void {
        localStorage.removeItem(ConfigService.token);
        this.loggedIn = false;
    }

    public getRoles(): any {

    }

    public getToken(): any {
        return localStorage.getItem(ConfigService.token);
    }

    private checkToken(): any {
        return !!localStorage.getItem(ConfigService.token);
    }

    public unauthorizedAccess(error: any): void {
        this.logout();
        this._router.navigate(['/login']);
    }

    public isLoggedIn(): boolean {
        return this.jwtHelper.isTokenExpired();
    }

    public getJWTValue(): any{
        let token = this.getToken();
        return this.jwtHelper.decodeToken(token);
    }

    private handleError(error: Response | any) {
        let errorMessage: any = {};
        // Connection error
        if (error.error == "") {
            errorMessage = {
                success: false,
                status: 0,
                data: "Sorry, there was a connection error occurred. Please try again.",
            };
        }
        else {
            errorMessage = error.json();
        }
        return observableThrowError(errorMessage);
    }
    public getHeaders():HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.getToken(),
        });
    }
}