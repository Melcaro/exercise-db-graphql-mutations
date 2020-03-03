import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { addUserMutation } from '../services/services';

const query = gql`
  {
    users {
      id
      name
      address {
        id
        number
        street
        town
      }
    }
  }
`;

class Users extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.addUserMutation({
      variables: {
        password: '111abc',
        name: 'Paul',
        number: '4bis',
        street: 'rue Gnagnagna',
        town: 'La Rivière',
        postalcode: '974**',
      },
      refetchQueries: [{ query: query }],
    });
  };
  render() {
    console.log(this.props);
    const { users, loading } = this.props.query;
    return (
      !loading && (
        <div>
          <h1>Users</h1>
          <div>
            {users.map(({ id, name, address }) => (
              <div key={id}>
                <div>{name}</div>
                {address && (
                  <div>
                    <div>{address.number}</div>
                    <div>{address.street}</div>
                    <div>{address.town}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <br />
          <button onClick={this.onSubmit}>Add an user</button>
        </div>
      )
    );
  }
}

export default compose(
  graphql(query, { name: 'query' }),
  graphql(addUserMutation, { name: 'addUserMutation' })
)(Users);
