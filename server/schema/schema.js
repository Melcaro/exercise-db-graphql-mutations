const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const Store = require('../store/store');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    address_id: { type: GraphQLInt },
    address: {
      type: AddressType,
      resolve: async parent => {
        return await Store.getAddressByUserID(parent.id);
      },
    },
    orders: {
      type: OrderType,
      resolve: async parent => {
        return await Store.getOrdersByUserID(parent.id);
      },
    },
  }),
});

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    image: { type: GraphQLString },
  }),
});

const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLString },
    number: { type: GraphQLString },
    street: { type: GraphQLString },
    town: { type: GraphQLString },
    postalCode: { type: GraphQLString },
  }),
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLString },
    amount: { type: GraphQLInt },
    date: { type: GraphQLString },
    products: {
      type: new GraphQLList(ProductType),
      resolve: async parent => {
        return await Store.getProductsByOrderID(parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parent, args) => {
        return await Store.getAllUsers();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, { id }) => {
        return await Store.getUserByID(id + '');
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve: async (parent, args) => {
        return await Store.getAllProducts();
      },
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, { id }) => {
        return await Store.getProductByID(id);
      },
    },
    orders: {
      type: new GraphQLList(OrderType),
      resolve: async (parent, args) => {
        return await Store.getAllOrders();
      },
    },
    order: {
      type: OrderType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, { id }) => {
        return await Store.getOrderByID(id);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
