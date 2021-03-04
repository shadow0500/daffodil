import {
  Injectable,
  Inject,
} from '@angular/core';
import {
  Actions,
  Effect,
  ofType,
} from '@ngrx/effects';
import {
  Store,
  select,
} from '@ngrx/store';
import {
  of,
  Observable,
} from 'rxjs';
import {
  switchMap,
  catchError,
  withLatestFrom,
  map,
} from 'rxjs/operators';

import { DaffProduct } from '@daffodil/product';
import { DaffProductGridLoadSuccess } from '@daffodil/product/state';

import {
  DaffChangeCategoryPageSize,
  DaffChangeCategoryCurrentPage,
  DaffChangeCategoryFilters,
  DaffChangeCategorySortingOption,
  DaffToggleCategoryFilter,
  DaffCategoryPageLoadSuccess,
  DaffCategoryPageLoad,
  DaffCategoryPageLoadFailure,
  DaffCategoryPageActionTypes,
} from '../actions/category-page.actions';
import { DaffCategoryDriver } from '../drivers/injection-tokens/category-driver.token';
import { DaffCategoryServiceInterface } from '../drivers/interfaces/category-service.interface';
import { daffCategoryValidateFilters } from '../helpers/public_api';
import { DaffCategoryPageConfigurationState } from '../models/category-page-configuration-state';
import { DaffGenericCategory } from '../models/generic-category';
import { DaffGetCategoryResponse } from '../models/get-category-response';
import { DaffCategoryRequest } from '../models/requests/category-request';
import { getDaffCategorySelectors } from '../selectors/category.selector';

@Injectable()
export class DaffCategoryPageEffects<
	T extends DaffCategoryRequest,
	V extends DaffGenericCategory<V>,
	U extends DaffCategoryPageConfigurationState<T>,
	W extends DaffProduct
> {

  constructor(
    private actions$: Actions,
    @Inject(DaffCategoryDriver) private driver: DaffCategoryServiceInterface<T, V, U, W>,
    private store: Store<any>,
  ){}

	private categorySelectors = getDaffCategorySelectors<T, V, U, W>();

  @Effect()
  loadCategoryPage$: Observable<any> = this.actions$.pipe(
    ofType(DaffCategoryPageActionTypes.CategoryPageLoadAction),
    switchMap((action: DaffCategoryPageLoad<T>) => {
      daffCategoryValidateFilters(action.request.filter_requests);
      return this.processCategoryGetRequest(action.request);
    }),
  );

  @Effect()
  changeCategoryPageSize$: Observable<any> = this.actions$.pipe(
    ofType(DaffCategoryPageActionTypes.ChangeCategoryPageSizeAction),
    withLatestFrom(
      this.store.pipe(select(this.categorySelectors.selectCategoryPageConfigurationState)),
    ),
    switchMap((
      [action, categoryRequest]:
			[DaffChangeCategoryPageSize, T],
    ) => this.processCategoryGetRequest({
      ...categoryRequest,
      page_size: action.pageSize,
    })),
  );

  @Effect()
  changeCategoryCurrentPage$: Observable<any> = this.actions$.pipe(
    ofType(DaffCategoryPageActionTypes.ChangeCategoryCurrentPageAction),
    withLatestFrom(
      this.store.pipe(select(this.categorySelectors.selectCategoryPageConfigurationState)),
    ),
    switchMap((
      [action, categoryRequest]:
			[DaffChangeCategoryCurrentPage, T],
    ) => this.processCategoryGetRequest({
      ...categoryRequest,
      current_page: action.currentPage,
    })),
  );

  @Effect()
  changeCategoryFilters$: Observable<any> = this.actions$.pipe(
    ofType(DaffCategoryPageActionTypes.ChangeCategoryFiltersAction),
    withLatestFrom(
      this.store.pipe(select(this.categorySelectors.selectCategoryPageConfigurationState)),
    ),
    switchMap((
      [action, categoryRequest]:
			[DaffChangeCategoryFilters, T],
    ) => {
      daffCategoryValidateFilters(action.filters);
      return this.processCategoryGetRequest({
        ...categoryRequest,
        filter_requests: action.filters,
      });
    }),
  );

  @Effect()
  toggleCategoryFilter$: Observable<any> = this.actions$.pipe(
    ofType(DaffCategoryPageActionTypes.ToggleCategoryFilterAction),
    withLatestFrom(
      this.store.pipe(select(this.categorySelectors.selectCategoryPageConfigurationState)),
    ),
    switchMap((
      [action, categoryPageConfigurationState]:
			[DaffToggleCategoryFilter, U],
    ) => {
      daffCategoryValidateFilters(categoryPageConfigurationState.filter_requests);
      return this.processCategoryGetRequest({
        ...categoryPageConfigurationState,
      });
    }),
  );

  @Effect()
  changeCategorySort$: Observable<any> = this.actions$.pipe(
    ofType(DaffCategoryPageActionTypes.ChangeCategorySortingOptionAction),
    withLatestFrom(
      this.store.pipe(select(this.categorySelectors.selectCategoryPageConfigurationState)),
    ),
    switchMap((
      [action, categoryRequest]:
			[DaffChangeCategorySortingOption, T],
    ) => this.processCategoryGetRequest({
      ...categoryRequest,
      applied_sort_option: action.sort.option,
      applied_sort_direction: action.sort.direction,
    })),
  );

  private processCategoryGetRequest(payload: T) {
    return this.driver.get(payload).pipe(
      switchMap((resp: DaffGetCategoryResponse<T, V, U, W>) => [
        new DaffProductGridLoadSuccess(resp.products),
        new DaffCategoryPageLoadSuccess(resp),
      ]),
      catchError(error => of(new DaffCategoryPageLoadFailure('Failed to load the category'))),
    );
  }
}
