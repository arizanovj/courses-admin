
import {throwError as observableThrowError,  Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Course } from './course';
import { ConfigService } from './config.service';

import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { map ,catchError,publishReplay,refCount} from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable()
export class CourseService {
    protected courses: ReplaySubject<Course[]> = new ReplaySubject(1);
    protected initialised: boolean;

    constructor(
        private configService: ConfigService,
        private http: HttpClient,
        private authService: AuthService
    ) { }


    public getCourses(lastId: number, numOfItems: number, direction: string, filters:Params): Observable<Course[]> {

        let search = new HttpParams()
        .append('lastId', String(lastId))
        .append('numOfItems', String(numOfItems))
        .append('direction', direction);
        for (let prop in filters) {
            search = search.append(prop, filters[prop]);
        }
         
        return this.http.get( this.configService.apiHost + '/courses/',{
            params: search,
            headers:this.authService.getHeaders()
        } ).pipe(
            map((response) => { return <Course[]>response['data'];  }),
            publishReplay(1),refCount() ,
            catchError(this.handleError));
    }


    public getAutocompleteCourses(value: string): Observable<Course[]> {

        let search = new HttpParams()
        .append('lastId', String(0))
        .append('numOfItems', String(100))
        .append('direction', "up");
       
        search = search.append('filter[name]', "cnt|"+value);
 
        return this.http.get( this.configService.apiHost + '/courses/',{
            params: search,
            headers:this.authService.getHeaders()
        } ).pipe(map((response) => { return <Course[]>response['data'];}),catchError(this.handleError));
    }

    public createCourse(course: Course): Observable<any> {

       return this.http.post(
            this.configService.apiHost + '/courses/',
            course
        )
      .pipe(
            map((response) => {
                return response;
            })
            ,catchError(this.handleError));
    }


    public updateCourse(course: Course) :Observable<any>{

        return this.http.put(
            this.configService.apiHost + '/courses/'+course.id,
            course
        ).pipe(
            map((response) => {
                return response;
            })
            ,catchError(this.handleError));
    }


    public getCourse(id: number):Observable<Course>{
   
        return this.http.get(this.configService.apiHost +  "/courses/" + id)
          .pipe(map((response) => {
            return  <Course>response['data'];
          })
          ,catchError((e: any) => observableThrowError(this.handleError(e))));
      }


    public deleteCourse(id: number):Observable<Boolean>{
   
        return this.http.delete(this.configService.apiHost +  "/courses/" + id)
          .pipe(map((response) => { return  true; }),catchError((e: any) => observableThrowError(this.handleError(e))));
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
