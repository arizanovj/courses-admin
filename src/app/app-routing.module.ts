import { NgModule } from '@angular/core';
import { CommonModule,LocationStrategy, PathLocationStrategy } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { MainLayoutComponent} from './layouts/main-layout/main-layout.component'
import { BasicLayoutComponent} from './layouts/basic-layout/basic-layout.component'
import {AuthGuard} from './model/auth.guard';

export const routes: Routes = [
{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
},
{
    path: '',
    component: MainLayoutComponent,
    data: {
        title: 'Home'
    },
    canActivate: [AuthGuard],
    children: [
        {
            path: 'dashboard',
            loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
        },
        {
            path: 'courses',
            loadChildren: 'app/course/course.module#CourseModule'
        },
        {
            path: 'videos',
            loadChildren: 'app/video/video.module#VideoModule'
        },
        {
            path: 'users',
            loadChildren: 'app/user/user.module#UserModule'
        }
        
    ]
},
{
    path: '',
    component:BasicLayoutComponent,
    children: [
        {
            path: 'login',
            loadChildren: 'app/login/login.module#LoginModule'
        },
        {
            path: 'logout',
            loadChildren: 'app/logout/logout.module#LogoutModule'
        }
    ],
},

];


@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
