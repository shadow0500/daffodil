import {
  Injectable,
  Inject,
} from '@angular/core';
import { DocumentNode } from 'graphql';
import {
  Observable,
  throwError,
} from 'rxjs';
import {
  map,
  catchError,
} from 'rxjs/operators';

import {
  DaffCartAddress,
  DaffCart,
} from '@daffodil/cart';
import { DaffCartAddressServiceInterface } from '@daffodil/cart/driver';
import { DaffQueuedApollo } from '@daffodil/core/graphql';

import { transformCartMagentoError } from './errors/transform';
import { DAFF_MAGENTO_CART_MUTATION_QUEUE } from './injection-tokens/cart-mutation-queue.token';
import { DAFF_CART_MAGENTO_EXTRA_CART_FRAGMENTS } from './injection-tokens/public_api';
import {
  updateAddress,
  updateAddressWithEmail,
} from './queries/public_api';
import {
  MagentoUpdateAddressResponse,
  MagentoUpdateAddressWithEmailResponse,
} from './queries/responses/public_api';
import { DaffMagentoCartAddressInputTransformer } from './transforms/inputs/cart-address.service';
import { DaffMagentoCartTransformer } from './transforms/outputs/cart.service';

/**
 * A service for making Magento GraphQL queries for carts.
 *
 * @inheritdoc
 */
@Injectable({
  providedIn: 'root',
})
export class DaffMagentoCartAddressService implements DaffCartAddressServiceInterface {
  constructor(
    @Inject(DAFF_MAGENTO_CART_MUTATION_QUEUE) private mutationQueue: DaffQueuedApollo,
    @Inject(DAFF_CART_MAGENTO_EXTRA_CART_FRAGMENTS) private extraCartFragments: DocumentNode[],
    private cartTransformer: DaffMagentoCartTransformer,
    private cartAddressInputTransformer: DaffMagentoCartAddressInputTransformer,
  ) {}

  update(cartId: DaffCart['id'], address: Partial<DaffCartAddress>): Observable<Partial<DaffCart>> {
    return address.email ? this.updateAddressWithEmail(cartId, address) : this.updateAddress(cartId, address);
  }

  private updateAddress(cartId: DaffCart['id'], address: Partial<DaffCartAddress>): Observable<Partial<DaffCart>> {
    return this.mutationQueue.mutate<MagentoUpdateAddressResponse>({
      mutation: updateAddress(this.extraCartFragments),
      variables: {
        cartId,
        address: this.cartAddressInputTransformer.transform(address),
      },
      fetchPolicy: 'network-only',
    }).pipe(
      map(resp => this.cartTransformer.transform(resp.data.setShippingAddressesOnCart.cart)),
      catchError(error => throwError(() => transformCartMagentoError(error))),
    );
  }

  private updateAddressWithEmail(cartId: DaffCart['id'], address: Partial<DaffCartAddress>): Observable<Partial<DaffCart>> {
    return this.mutationQueue.mutate<MagentoUpdateAddressWithEmailResponse>({
      mutation: updateAddressWithEmail(this.extraCartFragments),
      variables: {
        cartId,
        email: address.email,
        address: this.cartAddressInputTransformer.transform(address),
      },
      fetchPolicy: 'network-only',
    }).pipe(
      map(resp => this.cartTransformer.transform(resp.data.setGuestEmailOnCart.cart)),
      catchError(error => throwError(() => transformCartMagentoError(error))),
    );
  }
}
