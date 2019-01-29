import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { UserFormComponent } from './user-form.component';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';


const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Users'
        },
        children: [
           
            {
                path: 'create',
                component:UserFormComponent,
                data: {
                    title: 'Create',
                    context: 'create'
                }
            },
            {
                path: 'update/:id',
                component: UserFormComponent,
                data: {
                    title: 'Update',
                    context: 'update'
                }
            },
            {
                path: '',
                component: UserListComponent,
                data: {
                    title: 'List',
                }
            },
            {
                path: ':id',
                component: UserDetailComponent,
                data: {
                    title: 'Details',
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}

