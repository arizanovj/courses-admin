import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import{ MatCardModule,MatInputModule,MatFormFieldModule,MatButtonModule} from '@angular/material';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule
    ],
    declarations: [
        LoginComponent,
    ]
})
export class LoginModule {
}
