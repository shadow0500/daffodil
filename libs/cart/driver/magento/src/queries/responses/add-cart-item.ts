import { MagentoCartUserInputError } from '../../models/public_api';
import { MagentoGetCartResponse } from './get-cart';

interface Response extends MagentoGetCartResponse {
  user_errors: MagentoCartUserInputError[];
}

export interface MagentoAddCartItemResponse {
  addProductsToCart: Response;
}
