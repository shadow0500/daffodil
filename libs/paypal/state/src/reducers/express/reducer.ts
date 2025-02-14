import {
  DaffPaypalExpressTokenRequest,
  DaffPaypalExpressTokenResponse,
} from '@daffodil/paypal';

import {
  DaffPaypalActions,
  DaffPaypalActionTypes,
} from '../../actions/paypal.actions';
import { daffPaypalExpressInitialState } from './initial-state';
import { DaffPaypalExpressReducerState } from './interface';

export function daffPaypalExpressReducer <T extends DaffPaypalExpressTokenRequest, V extends DaffPaypalExpressTokenResponse>(state: DaffPaypalExpressReducerState = daffPaypalExpressInitialState, action: DaffPaypalActions<T, V>): DaffPaypalExpressReducerState {
  switch (action.type) {
    case DaffPaypalActionTypes.GeneratePaypalExpressTokenAction:
      return daffPaypalExpressInitialState;

    case DaffPaypalActionTypes.GeneratePaypalExpressTokenSuccessAction:
      return {
        ...state,
        startUrl: action.payload.urls.start,
        editUrl: action.payload.urls.edit,
      };

    default:
      return state;
  }
}
