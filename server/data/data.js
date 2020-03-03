const users = [
  { password: '1234', name: 'Simba', address_id: 5 },
  { password: '1234', name: 'Pongo', address_id: 4 },
  { password: '1234', name: 'Parker', address_id: 3 },
  { password: '1234', name: 'Mel', address_id: 2 },
  { password: '1234', name: 'Robert', address_id: 1 },
];

const products = [
  {
    title: 'Nerf dog',
    description: 'pistolet Nerf qui envoie des balles de tennis',
    price: 1,
    image: '',
  },
  {
    title: 'balles pour chat',
    description: 'petites balles de jeu',
    price: 1,
    image: '',
  },
  { title: 'herbe à chat', description: 'herbe à chat', price: 1, image: '' },
  {
    title: 'laisse pour chien',
    description: 'laisse pour chien',
    price: 1,
    image: '',
  },
  {
    title: 'croquettes light',
    description: 'croquettes pour chats enrobés',
    price: 1,
    image: '',
  },
];

const orders = [
  { user_id: 1, amount: 10, date: '01/18/2019' },
  { user_id: 2, amount: 20, date: '06/29/1990' },
  { user_id: 3, amount: 30, date: '12/12/2000' },
  { user_id: 4, amount: 40, date: '03/01/2020' },
  { user_id: 5, amount: 50, date: '01/01/2020' },
];

const addresses = [
  {
    user_id: 1,
    number: '12',
    street: 'rue Machin',
    town: 'Paris',
    postalCode: '75000',
  },
  {
    user_id: 2,
    number: '34',
    street: 'rue Bidule',
    town: 'Bora-Bora',
    postalCode: '1234',
  },
  {
    user_id: 3,
    number: '56',
    street: 'rue Truc',
    town: 'Cergy',
    postalCode: '95000',
  },
  {
    user_id: 4,
    number: '78',
    street: 'rue Brocard',
    town: '',
    postalCode: '1234',
  },
  {
    user_id: 5,
    number: '910',
    street: 'chemin de Traverse',
    town: 'Londres',
    postalCode: '7777',
  },
];

const productsOrders = [
  { product_id: 1, order_id: 1 },
  { product_id: 2, order_id: 2 },
  { product_id: 3, order_id: 3 },
  { product_id: 4, order_id: 4 },
  { product_id: 5, order_id: 5 },
];

module.exports = { users, products, orders, addresses, productsOrders };
