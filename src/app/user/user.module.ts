import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list.component';
import { UserFormComponent } from './user-form.component';
import { UserDetailComponent } from './user-detail.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../model/user.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    UserRoutingModule,
  ],
  declarations: [ UserListComponent, UserFormComponent, UserDetailComponent],
  providers: [UserService],
  entryComponents: [ConfirmDialogComponent]
})
export class UserModule { }
