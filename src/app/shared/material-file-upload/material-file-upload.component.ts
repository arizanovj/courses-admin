/*
https://www.codeproject.com/Articles/1236006/Build-a-file-upload-component-with-Angular-Materia
*/
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {
      HttpClient, HttpResponse, HttpRequest,
      HttpEventType, HttpErrorResponse
} from '@angular/common/http';
import { ControlContainer, NgForm } from '@angular/forms';
import { Subscription ,  of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { FormControl, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
@Component({
      selector: 'app-material-file-upload',
      templateUrl: './material-file-upload.component.html',
      styleUrls: ['./material-file-upload.component.css'],
      animations: [
            trigger('fadeInOut', [
                  state('in', style({ opacity: 100 })),
                  transition('* => void', [
                        animate(300, style({ opacity: 0 }))
                  ])
            ])
      ]
})
export class MaterialFileUploadComponent implements OnInit, OnChanges {

      @Input() name: string;
      @Input() formGroup: FormGroup;
      @Input() startUpload = false;
      @Input() context: string;
      /** Link text */
      @Input() text = 'Upload';
      /** Name used in form which will be sent in HTTP request. */
      @Input() param = 'file';
      /** Target URL for file uploading. */
      @Input() url: string;
      /** File extension that accepted, same as 'accept' of <input type="file" />. 
          By the default, it's set to 'image/*'. */
      @Input() accept = 'image/*';
      /** Allow you to add handler after its completion. Bubble up response text from remote. */
      @Output() complete = new EventEmitter<string>();

      protected selected = false;

      private files: Array<FileUploadModel> = [];

      private fileInput: HTMLInputElement;

      constructor(private _http: HttpClient) { }

      ngOnInit() {

      }
      ngOnChanges(changes: SimpleChanges) {

            const startUpload: SimpleChange = changes.startUpload;

            if (startUpload.currentValue == true) {
                  this.uploadFiles();
            }

      }
      private onFileChange($event) {

            let file = $event.target.files[0];

            this.setInputState(file)

      }

      private setInputState(file: any ){

            if (file) {
                  this.formGroup.controls[this.name].setValue(file.name);
                  this.selected = true;
            } else {
                  this.formGroup.controls[this.name].setValue('');
                  this.selected = false;
            }
      }

      private onClick() {
            const fileUpload = document.getElementById(this.name) as HTMLInputElement;

            fileUpload.onchange = () => {
                  const file = fileUpload.files[0];

                        this.files = [];
                
                        this.files.push({
                              data: file, state: 'in',
                              inProgress: false, progress: 0, canRetry: false, canCancel: true
                        });
                        if (fileUpload.files.length > 0) {
                              this.selected = true;

                        }
                 

            };
            fileUpload.click();

      }

      private cancelFile(file: FileUploadModel) {
            this.startUpload = false;
            this.setInputState("");
            this.removeFileFromArray(file);
      }

      private retryFile(file: FileUploadModel) {
            this.uploadFile(file);
            file.canRetry = false;
      }

      private uploadFile(file: FileUploadModel) {
            const fd = new FormData();
            fd.append(this.param, file.data);

            const req = new HttpRequest(this.context == 'create' ? 'POST': 'PUT', this.url, fd, {
                  reportProgress: true
            });

            file.inProgress = true;
            file.sub = this._http.request(req).pipe(
                  map(event => {
                        switch (event.type) {
                              case HttpEventType.UploadProgress:
                                    file.progress = Math.round(event.loaded * 100 / event.total);
                                    break;
                              case HttpEventType.Response:
                                    return event;
                        }
                  }),
                  tap(message => { }),
                  last(),
                  catchError((error: HttpErrorResponse) => {
                        file.inProgress = false;
                        file.canRetry = true;
                        return of(`${file.data.name} upload failed.`);
                  })
            ).subscribe(
                  (event: any) => {
                        if (typeof (event) === 'object') {
                              this.removeFileFromArray(file);
                              this.complete.emit(event.body.data);
                        }
                  }
            );
            this.setInputState("");
      }

      private uploadFiles() {
            const fileUpload = document.getElementById(this.name) as HTMLInputElement;
            fileUpload.value = '';
            this.files.forEach(file => {
                  this.uploadFile(file);
            });
      }

      private removeFileFromArray(file: FileUploadModel) {
            const index = this.files.indexOf(file);
            if (index > -1) {
                  this.files.splice(index, 1);
            }
      }



}

export class FileUploadModel {
      data: File;
      state: string;
      inProgress: boolean;
      progress: number;
      canRetry: boolean;
      canCancel: boolean;
      sub?: Subscription;
}