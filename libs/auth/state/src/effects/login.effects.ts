import {
  Injectable,
  Inject,
} from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { of } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  tap,
} from 'rxjs/operators';

import {
  DaffLoginInfo,
  DaffAuthToken,
  DAFF_AUTH_ERROR_MATCHER,
  DaffAuthStorageService,
} from '@daffodil/auth';
import {
  DaffLoginDriver,
  DaffLoginServiceInterface,
} from '@daffodil/auth/driver';
import {
  DaffError,
  DaffServerSideStorageError,
  DaffStorageServiceError,
} from '@daffodil/core';
import { ErrorTransformer } from '@daffodil/core/state';

import {
  DaffAuthLoginActionTypes,
  DaffAuthLoginSuccess,
  DaffAuthLoginFailure,
  DaffAuthLogoutSuccess,
  DaffAuthLogoutFailure,
  DaffAuthLogout,
  DaffAuthServerSide,
  DaffAuthLoginActions,
  DaffAuthStorageFailure,
} from '../actions/public_api';

@Injectable()
export class DaffAuthLoginEffects<
  T extends DaffLoginInfo = DaffLoginInfo,
  U extends DaffAuthToken = DaffAuthToken,
> {
  constructor(
    private actions$: Actions<DaffAuthLoginActions<T, U>>,
    @Inject(DaffLoginDriver) private loginDriver: DaffLoginServiceInterface<T, U>,
    @Inject(DAFF_AUTH_ERROR_MATCHER) private errorMatcher: ErrorTransformer,
    private storage: DaffAuthStorageService,
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(DaffAuthLoginActionTypes.LoginAction),
    switchMap((action) =>
      this.loginDriver.login(action.loginInfo)
        .pipe(
          map((resp) => new DaffAuthLoginSuccess<U>(resp)),
          tap((success) => this.storage.setAuthToken(success.auth.token)),
          catchError((error: DaffError) => {
            switch (true) {
              case error instanceof DaffServerSideStorageError:
                return of(new DaffAuthServerSide(this.errorMatcher(error)));
              case error instanceof DaffStorageServiceError:
              default:
                return of(new DaffAuthLoginFailure(this.errorMatcher(error)));
            }
          }),
        ),
    ),
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(DaffAuthLoginActionTypes.LogoutAction),
    switchMap((action: DaffAuthLogout) =>
      this.loginDriver.logout().pipe(
        map(() => new DaffAuthLogoutSuccess()),
        tap(() =>  this.storage.removeAuthToken()),
        catchError((error: DaffError) => {
          switch (true) {
            case error instanceof DaffServerSideStorageError:
              return of(new DaffAuthServerSide(this.errorMatcher(error)));
            case error instanceof DaffStorageServiceError:
              return of(new DaffAuthStorageFailure(this.errorMatcher(error)));
            default:
              return of(new DaffAuthLogoutFailure(this.errorMatcher(error)));
          }
        }),
      ),
    ),
  ));
}
