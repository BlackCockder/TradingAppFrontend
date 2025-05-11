import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection, inject, provideAppInitializer } from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthInterceptor} from "../auth/interceptors/Auth.interceptor";
import {GlobalErrorHandlerService} from "../shared/globalErrorHandler/GlobalErrorHandler.service";
import {initializeAppFactory} from "./AppInitializer.factory";
import {AuthService} from "../auth/Auth.service";
import {providePrimeNG} from "primeng/config";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {FilterMatchMode} from "primeng/api";
import {MyPreset} from "../../styles/themesOverride.styles";

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
    provideAppInitializer(() => {
        const initializerFn = initializeAppFactory(inject(AuthService));
        return initializerFn();
      }),
    provideAnimationsAsync(),
    providePrimeNG({
      zIndex: {
        modal: 1100,    // dialog, sidebar
        overlay: 1000,  // dropdown, overlay panel
        menu: 1000,     // overlay menus
        tooltip: 1100   // tooltip
      },
      // inputVariant: 'filled',
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: '.my-app-dark'
        }
      },
      filterMatchModeOptions: {
        text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
        numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
        date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
      }
    })
    ]
};
