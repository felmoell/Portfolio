import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HeaderComponent } from './pages/home/components/header/header.component';
import { LoginComponent } from './modals/login/login.component';
import { CarbonModule } from './helpers/carbon/carbon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthInterceptorService } from './interceptors/tokenInterceptor';
import { CronComponent } from './pages/cron/cron.component';
import { ProjectsComponent } from './pages/projects/projects.component';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        LoginComponent,
        CronComponent,
        ProjectsComponent,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [BrowserModule,
        AppRoutingModule,
        CarbonModule,
        ReactiveFormsModule,
        FormsModule], providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
