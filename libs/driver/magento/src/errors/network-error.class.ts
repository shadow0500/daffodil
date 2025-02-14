import {
  DaffError,
  DaffInheritableError,
} from '@daffodil/core';

export const DAFF_DRIVER_MAGENTO_NETWORK_ERROR_CODE = 'DAFF_DRIVER_MAGENTO_NETWORK_ERROR';

/**
 * An error thrown when the Magento driver encountered a problem with network connectivity.
 */
export class DaffDriverMagentoNetworkError extends DaffInheritableError implements DaffError {
  public readonly code: string = DAFF_DRIVER_MAGENTO_NETWORK_ERROR_CODE;

  constructor(message?: string) {
	  super(message);
  }
}
