import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Substituímos o ZoneChangeDetection por este aqui para matar o erro do Zone.js de vez:
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient()
  ]
};