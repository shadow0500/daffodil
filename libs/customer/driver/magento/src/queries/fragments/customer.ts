import { gql } from 'apollo-angular';

import { magentoCustomerAddressFragment } from './customer-address';

export const magentoCustomerFragment = gql`
  fragment magentoCustomer on Customer {
    email
    firstname
    lastname
    addresses {
      ...magentoCustomerAddress
    }
  }
  ${magentoCustomerAddressFragment}
`;
