import {APP_INITIALIZER, ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from '../app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthInterceptor} from "../auth/interceptors/Auth.interceptor";
import {GlobalErrorHandlerService} from "../shared/globalErrorHandler/GlobalErrorHandler.service";
import {initializeAppFactory} from "./AppInitializer.factory";
import {AuthService} from "../auth/Auth.service";

export const AppConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
    provideHttpClient(withInterceptors([
        AuthInterceptor
      ])
    ),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      multi: true,
      deps: [AuthService]
    }
    ]
};
