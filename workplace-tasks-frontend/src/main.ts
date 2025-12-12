import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './app/services/auth-interceptor';
import { routes } from './app/app.routes';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(ReactiveFormsModule, HttpClientModule),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
});
