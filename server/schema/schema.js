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

const ProductOrderType = new GraphQLObjectType({
  name: 'ProductOrder',
  fields: () => ({
    product_id: { type: GraphQLID },
    order_id: { type: GraphQLID },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType), // envoyer un type GraphQL (int ou id)
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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        password: { type: GraphQLString },
        name: { type: GraphQLString },
        number: { type: GraphQLString },
        street: { type: GraphQLString },
        town: { type: GraphQLString },
        postalcode: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const user = await Store.addUser(args.password, args.name);
        const address = await Store.addAddress(
          user.id,
          args.number,
          args.street,
          args.town,
          args.postalcode
        );
        return user;
      },
    },

    addProduct: {
      type: ProductType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        image: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const product = await Store.addProduct(
          args.title,
          args.description,
          args.price,
          args.image
        );
        return product;
      },
    },
    addOrder: {
      type: OrderType,
      args: {
        user_id: { type: GraphQLInt },
        amount: { type: GraphQLInt },
        date: { type: GraphQLString },
        products_ids: { type: new GraphQLList(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        const order = await Store.addOrder(
          args.user_id,
          args.amount,
          args.date
        );

        const updateProductsOrders = products_ids.map(async productID => {
          return await Store.updateProductsOrders(productID, order.id);
        });
        return order;
      },
    },
    updateProductsOrders: {
      type: ProductOrderType,
      args: { product_id: { type: GraphQLID }, order_id: { type: GraphQLID } },
      resolve: async (parent, { product_id, order_id }) => {
        return await Store.updateProductsOrders(product_id, order_id);
      },
    },

    addAddress: {
      type: AddressType,
      args: {
        user_id: { type: GraphQLString },
        number: { type: GraphQLString },
        street: { type: GraphQLString },
        town: { type: GraphQLString },
        postalCode: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        return await Store.addAddress(
          args.user_id,
          args.number,
          args.street,
          args.town,
          args.postalCode
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
