import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

export const client = new ApolloClient({ uri: '/graphql' });

export const getOrders = gql`
  {
    orders {
      id
      user_id
      amount
      date
      products {
        title
        price
      }
    }
  }
`;

export const addUserMutation = gql`
  mutation(
    $password: String
    $name: String
    $number: String
    $street: String
    $town: String
    $postalcode: String
  ) {
    addUser(
      password: $password
      name: $name
      number: $number
      street: $street
      town: $town
      postalcode: $postalcode
    ) {
      id
      name
      address {
        number
        street
        town
      }
    }
  }
`;
