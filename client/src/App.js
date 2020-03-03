import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Users from './components/Users';
import Products from './components/Products';
import Orders from './components/Orders';

import { client } from './services/services';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Route render={() => <Users />} />
          <Route render={() => <Products />} />
          <Route render={() => <Orders />} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
