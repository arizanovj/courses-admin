import {Injectable} from '@angular/core';
import * as moment from "moment";
import {environment} from '../../environments/environment';


@Injectable()
export class ConfigService{
    public apiHost:string;
    static readonly token = "backend-token";
    static readonly localSettings = "backend-settings";
    static readonly DATE_FORMAT = 'dd/MMM/yyyy';
    static readonly DATE_FORMAT_SHORT = 'dd/MMM/yy';
    static readonly DATE_TIME_FORMAT = `${ConfigService.DATE_FORMAT} hh:mm:ss`;
    static readonly DATE_TIME_FORMAT_SHORT = `${ConfigService.DATE_FORMAT_SHORT} hh:mm`;
    static readonly DATE_TIME_FORMAT_TIMESTAMP = `YYYY-MM-DD hh:mm:ss`;

    public setting:any = {};

    constructor(){
        if(environment.production == true) {
            this.apiHost = 'http://ngapi.dev/v1';
        } else {
            this.apiHost = 'http://localhost:9001';
        }

    }

    loadGlobalSettingsFromLocalStorage():void{
        if(localStorage.getItem('backend-setting') != null){
            this.setting = JSON.parse(localStorage.getItem(ConfigService.localSettings));
        }

    }
}
