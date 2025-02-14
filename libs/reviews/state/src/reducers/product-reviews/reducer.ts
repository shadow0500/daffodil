import { DaffProductReview } from '@daffodil/reviews';

import {
  DaffReviewsProductActionTypes,
  DaffReviewsProductActions,
  DaffProductReviewsCollectionActionTypes,
  DaffProductReviewsCollectionActions,
} from '../../actions/public_api';
import { DaffProductPageReviewsReducerState } from './state.interface';

/**
 * Initial values of the product state.
 */
export const daffProductReviewsReducerInitialState: DaffProductPageReviewsReducerState = {
  loading: false,
  errors: [],
};

/**
 * Reducer function that catches actions and changes/overwrites product state.
 *
 * @param state current State of the redux store
 * @param action a product action
 * @returns product state
 */
export function daffProductPageReviewsReducer<T extends DaffProductReview = DaffProductReview>(
  state = daffProductReviewsReducerInitialState,
  action: DaffReviewsProductActions<T> | DaffProductReviewsCollectionActions,
): DaffProductPageReviewsReducerState {
  switch (action.type) {
    case DaffReviewsProductActionTypes.ListAction:
    case DaffProductReviewsCollectionActionTypes.ChangePageSizeAction:
    case DaffProductReviewsCollectionActionTypes.ChangeCurrentPageAction:
    case DaffProductReviewsCollectionActionTypes.ChangeFilterAction:
    case DaffProductReviewsCollectionActionTypes.ChangeSortingAction:
      return { ...state, loading: true };
    case DaffReviewsProductActionTypes.ListSuccessAction:
      return { ...state, loading: false };
    case DaffReviewsProductActionTypes.ListFailureAction:
      return {
        ...state,
        loading: false,
        errors: state.errors.concat([action.payload]),
      };
    default:
      return state;
  }
}
