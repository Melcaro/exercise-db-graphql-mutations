const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const UserType = new GraphQLInputObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    address_id: type: GraphQLInt,
  }),
});

const ProductType = new GraphQLInputObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    title: {type:  GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    image: { type: GraphQLString },
  }),
});

const AddressType = new GraphQLInputObjectType({
  name: 'Address',
  fields: () => ({
    id: {type:  GraphQLID },
    user_id: { GraphQLString },
    number: {type: GraphQLString },
    street: {type:  GraphQLString },
    town: { type: GraphQLString },
    postalcode: { type: GraphQLString },
  }),
});

const OrderType = new GraphQLInputObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLString },
    amount: { type: GraphQLInt },
    date: { type: GraphQLString },
    products: {
        type: new GraphQLList(ProductType),
        resolve: ''
    }
  }),
});


const RootQuery = new GraphQLInputObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parent, args) => {
        return '';
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return '';
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve: async (parent, args) => {
        return '';
      },
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return '';
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve: async (parent, args) => {
        return '';
      },
    },
    order: {
      type: OrderType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return '';
      },
    },
  },
});
