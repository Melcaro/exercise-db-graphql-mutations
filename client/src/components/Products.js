import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const query = gql`
  {
    products {
      id
      title
      description
      price
      image
    }
  }
`;

export const Products = props => {
  const { products, loading } = props.data;
  return (
    !loading && (
      <div>
        <h1>Products</h1>
        <div>
          {products.map(({ id, title, description, price, image }) => (
            <div key={id}>
              <h2>{title}</h2>
              <div>
                <img src={image} alt="product pic" />
              </div>
              <p>{description}</p>
              <p>Price : {price}€</p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default graphql(query)(Products);
