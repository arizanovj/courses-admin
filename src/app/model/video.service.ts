
import {throwError as observableThrowError,  Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Video } from './video';
import { ConfigService } from './config.service';

import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import { map ,catchError,publishReplay,refCount} from 'rxjs/operators';
import { Params } from '@angular/router';
@Injectable()
export class VideoService {
    protected videos: ReplaySubject<Video[]> = new ReplaySubject(1);
    protected initialised: boolean;

    constructor(
        private configService: ConfigService,
        private http: HttpClient,
        private authService: AuthService
    ) { }


    public getVideos(lastId: number, numOfItems: number, direction: string, filters: Params): Observable<Video[]> {

        let search = new HttpParams()
        .append('lastId', String(lastId))
        .append('numOfItems', String(numOfItems))
        .append('direction', direction);
        for (let prop in filters) {
            search = search.append(prop, filters[prop]);
        }
         
        return this.http.get( this.configService.apiHost + '/videos/',{
            params: search,
            headers:this.authService.getHeaders()
        } ).pipe(map((response) => {
                return <Video[]>response['data'];  
            }),publishReplay(1),refCount()
            ,catchError(this.handleError));
    }

    public createVideo(video: Video): Observable<any> {

       return this.http.post(
            this.configService.apiHost + '/videos/',
            video
        ).pipe(map((response) => {
                return response;
            }),catchError(this.handleError));
    }


    public updateVideo(video: Video) :Observable<any>{

        return this.http.put(
            this.configService.apiHost + '/videos/'+video.id,
            video
        ).pipe(map((response) => {
                return response;
            }),catchError(this.handleError));
    }


    public getVideo(id: number):Observable<Video>{
   
        return this.http.get(this.configService.apiHost +  "/videos/" + id)
          .pipe(map((response) => {
            return  <Video>response['data'];
          })
          ,catchError((e: any) => observableThrowError(this.handleError(e))));
      }


    public deleteVideo(id: number):Observable<Boolean>{
   
        return this.http.delete(this.configService.apiHost +  "/videos/" + id)
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
