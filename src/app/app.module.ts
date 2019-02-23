import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//material
import { MatToolbarModule, MatSidenavModule, MatListModule,MatNativeDateModule, MatInputModule, MatMenuModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';

// Routing Module
import { AppRoutingModule } from './app-routing.module';




import { AuthGuard } from './model/auth.guard';
import { AuthService } from './model/auth.service';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './model/config.service';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ResponseInterceptor } from './interceptor/response-interceptor';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('backend-token');
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    BasicLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    MatAutocompleteModule,
    HttpClientModule,
    SharedModule,
    MatNativeDateModule,
    LoggerModule.forRoot({ serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:9001','localhost:4200'],
      }
    }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    AuthGuard,
    AuthService,
    ConfigService,

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }  
