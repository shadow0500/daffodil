import {
  inject,
  InjectionToken,
} from '@angular/core';
import {
  ActionReducer,
  combineReducers,
} from '@ngrx/store';

import { daffComposeReducers } from '@daffodil/core/state';

import { daffConfigurableProductReducers } from '../configurable-product-reducers';
import { DaffConfigurableProductReducersState } from '../configurable-product-reducers-state.interface';
import { DAFF_PRODUCT_CONFIGURABLE_EXTRA_REDUCERS } from './extra.token';

/**
 * An internal token to hold the Daffodil configurable product reducers.
 * Includes the extra and standard reducers.
 *
 * @docs-private
 */
export const DAFF_PRODUCT_CONFIGURABLE_REDUCERS = new InjectionToken<ActionReducer<DaffConfigurableProductReducersState>>(
  'DAFF_PRODUCT_CONFIGURABLE_REDUCERS',
  {
    factory: () => daffComposeReducers([
      combineReducers(daffConfigurableProductReducers),
      ...inject(DAFF_PRODUCT_CONFIGURABLE_EXTRA_REDUCERS),
    ]),
  },
);
