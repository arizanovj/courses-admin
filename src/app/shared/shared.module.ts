import {NgModule}           from '@angular/core';
import {CommonModule}       from '@angular/common';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';


import {DateFormatPipe} from './../pipes/date.format.pipe';
import {DateTimeFormatPipe} from './../pipes/date.time.format.pipe';
import {DateTimeFormatShortPipe} from './../pipes/date.time.format.short.pipe';
import {TruncatePipe} from './../pipes/truncate.pipe';
import{ MatInputModule,MatButtonModule,  MatSlideToggleModule,MatIconModule,MatMenuModule,MatSelectModule,MatDatepickerModule,MatProgressBarModule,MatProgressSpinnerModule,MatDialogModule, MatCheckboxModule, MatTableModule, MatAutocomplete, MatAutocompleteModule, MatCardModule} from '@angular/material';

import { MaterialFileUploadComponent } from './material-file-upload/material-file-upload.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import {KeysetPaginationComponent} from './keyset/keyset-pagination.component'
import {InputFilterComponent} from '../shared/filter/input-filter/input-filter.component';
import {DatetimeFilterComponent} from '../shared/filter/datetime-filter/datetime-filter.component';
import { GroupDatetimeFilterComponent } from './filter/group-datetime-filter/group-datetime-filter.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatDatepickerModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatDatepickerModule,
        MatInputModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatAutocompleteModule,
        MatCardModule
    ],
    declarations: [
        DateFormatPipe,
        DateTimeFormatPipe,
        DateTimeFormatShortPipe,
        TruncatePipe,
        MaterialFileUploadComponent,    
        ConfirmDialogComponent,
        KeysetPaginationComponent,
        InputFilterComponent,
        DatetimeFilterComponent,
        GroupDatetimeFilterComponent,
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        DateFormatPipe,
        DateTimeFormatPipe,
        DateTimeFormatShortPipe,
        TruncatePipe,
        MaterialFileUploadComponent,
        ConfirmDialogComponent,
        KeysetPaginationComponent,
        InputFilterComponent,
        DatetimeFilterComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatDatepickerModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatDatepickerModule,
        MatInputModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatAutocompleteModule,
        MatCardModule,
        GroupDatetimeFilterComponent
    ],
    providers: [
        DateFormatPipe,
        DateTimeFormatShortPipe,
        DateTimeFormatPipe
    ],

})
export class SharedModule {
}