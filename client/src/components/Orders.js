import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';

import { getOrders } from '../services/services';
export class Orders extends PureComponent {
  render() {
    console.log(this.props.getOrders);
    const { loading, orders } = this.props.getOrders;
    return (
      !loading && (
        <div>
          <h1>Orders</h1>
          <div>
            {orders.map(({ id, user_id, amount, date, products }) => (
              <div key={id}>
                <div>User: {user_id}</div>
                <div>{date}</div>
                <div>{amount}</div>
                <div>
                  Products :{' '}
                  {products.map(({ title, price }) => (
                    <div>
                      <span>{title}</span>
                      <span>{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    );
  }
}

export default compose(graphql(getOrders, { name: 'getOrders' }))(Orders);
