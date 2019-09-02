
import {throwError as observableThrowError,  Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from './user';
import { ConfigService } from './config.service';

import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { map ,catchError,publishReplay,refCount} from 'rxjs/operators';
import { Params } from '@angular/router';
@Injectable()
export class UserService {
    protected users: ReplaySubject<User[]> = new ReplaySubject(1);
    protected initialised: boolean;

    constructor(
        private configService: ConfigService,
        private http: HttpClient,
        private authService: AuthService
    ) { }


    public getUsers(filters: Params): Observable<User[]> {
        return this.http.get( this.configService.apiHost + '/users/',{
            params: filters,
            headers:this.authService.getHeaders()
        } ).pipe(map((response) => {
                return <User[]>response['data'];  
            }),publishReplay(1),refCount()
            ,catchError(this.handleError));
    }

    public createUser(user: User): Observable<any> {

       return this.http.post(
            this.configService.apiHost + '/users/',
            user
        )
        .pipe(
            map((response) => {
                return response;
            }), catchError(this.handleError));
    }


    public updateUser(user: User) :Observable<any>{

        return this.http.put(
            this.configService.apiHost + '/users/'+user.id,
            user
        )
            .pipe(map((response) => {
                return response;
            })
            ,catchError(this.handleError));
    }


    public getUser(id: number):Observable<User>{
   
        return this.http.get(this.configService.apiHost +  "/users/" + id)
          .pipe(map((response) => {
            return  <User>response['data'];
          })
          ,catchError((e: any) => observableThrowError(this.handleError(e))));
      }


    public deleteUser(id: number):Observable<Boolean>{
   
        return this.http.delete(this.configService.apiHost +  "/users/" + id)
          .pipe(map((response) => {
            return  true;
          })
          ,catchError((e: any) => observableThrowError(this.handleError(e))));
      }

    private handleError(error: Response | any) {
       
        let errorMessage: any = {};
        // Connection error
        if (error.status == 0) {
            errorMessage = {
                success: false,
                status: 0,
                data: "Sorry, there was a connection error occurred. Please try again.",
            };
        }
        else {
            console.log(error);
            errorMessage = error;
        }
        return observableThrowError(errorMessage);
    }


}
