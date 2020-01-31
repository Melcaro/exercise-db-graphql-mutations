const { Pool } = require('pg');
const Data = require('../data/data');

const pool = new Pool({
  user: 'postgres',
  host: '192.168.99.100',
  database: 'ecom',
  password: '',
  port: 5001,
});

async function createDB() {
  const client = await pool.connect();
  const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]);
  return client;
}

async function initializeDB() {
  const client = await createDB();
  //createUsersTable(Data.users, client);
  //createProductsTable(Data.products, client);
  createOrdersTable(Data.orders, client);
  createAddressesTable(Data.addresses, client);
  createProductsOrdersTable(Data.productsOrders, client);
}

async function createUsersTable(users = [], client) {
  try {
    const { rows } = await client.query(
      'CREATE TABLE users (id BIGSERIAL, password TEXT, name TEXT, address_id INT)'
    );

    users.forEach(async ({ password, name, address_id }) => {
      await client.query(
        `INSERT INTO users(password,name,address_id) VALUES('${password}','${name}','${address_id}') RETURNING *`
      );
    });
  } catch (e) {
    console.log(e);
  }
}

async function createProductsTable(products = [], client) {
  try {
    const { rows } = await client.query(
      `CREATE TABLE products (id BIGSERIAL, title TEXT, description TEXT,price INT,image TEXT)`
    );
    products.forEach(async ({ title, description, price, image }) => {
      await client.query(
        `INSERT INTO products(title,description,price,image) VALUES('${title}','${description}','${price}','${image}') RETURNING *`
      );
    });
  } catch (e) {
    console.log(e);
  }
}

async function createOrdersTable(orders = [], client) {
  try {
    const { rows } = await client.query(
      `CREATE TABLE orders (id BIGSERIAL, user_id TEXT, amount INT, date TIMESTAMP)`
    );
    orders.forEach(async ({ user_id, amount, date }) => {
      await client.query(
        `INSERT INTO orders(user_id,amount,date) VALUES('${user_id}','${amount}','${date}') RETURNING *`
      );
    });
  } catch (e) {
    console.log(e);
  }
}

async function createAddressesTable(addresses = [], client) {
  try {
    const { rows } = await client.query(
      'CREATE TABLE addresses (id BIGSERIAL, user_id TEXT, number TEXT, street TEXT, town TEXT, postalCode TEXT)'
    );
    addresses.forEach(async ({ user_id, number, street, town, postalCode }) => {
      await client.query(
        `INSERT INTO addresses(user_id,number,street,town,postalCode) VALUES('${user_id}','${number}','${street}','${town}','${postalCode}') RETURNING *`
      );
    });
  } catch (e) {
    console.log(e);
  }
}

async function createProductsOrdersTable(productsOrders = [], client) {
  try {
    const { rows } = await client.query(
      'CREATE TABLE productsOrders (id BIGSERIAL,product_id TEXT,order_id TEXT)'
    );
    productsOrders.forEach(async ({ product_id, order_id }) => {
      await client.query(
        `INSERT INTO productsOrders(product_id,order_id) VALUES('${product_id}','${order_id}')`
      );
    });
  } catch (e) {
    console.log(e);
  }
}

//initializeDB();
