import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todoReducer } from './modules/todo/store/todo.reducer';
import { TodoEffects } from './modules/todo/store/todo.effects';
import { provideHttpClient } from '@angular/common/http';
import { TodoSandbox } from './modules/todo/store/todo.sandbox';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ todo: todoReducer }),
    provideEffects([TodoEffects]),
    provideHttpClient(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    TodoSandbox,
  ],
};
