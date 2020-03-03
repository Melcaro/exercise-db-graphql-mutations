const { Pool } = require('pg');
const Data = require('../data/data');

const pool = new Pool({
  user: 'postgres',
  host: '192.168.99.100',
  database: 'ecom',
  password: '',
  port: 5001,
});

let client = null;

async function createDB() {
  client = await pool.connect();
  const res = await client.query('SELECT NOW()');
  console.log(res.rows[0]);
}

async function initializeDB() {
  const client = await createDB();
  createUsersTable(Data.users, client);
  createProductsTable(Data.products, client);
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

async function getAllUsers() {
  try {
    const { rows } = await client.query('SELECT * FROM users');
    console.log(rows);
    return rows;
  } catch (e) {
    console.log(e);
  }
}

async function getUserByID(userID) {
  try {
    const { rows } = await client.query(
      `SELECT id, name FROM users WHERE id=${userID}`
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query('SELECT * FROM products');
    return rows;
  } catch (e) {
    console.log(e);
  }
}

async function getProductByID(productID) {
  try {
    const { rows } = await client.query(
      `SELECT id,title,description,price,image FROM products WHERE id=${productID}`
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function getAddressByUserID(userID) {
  try {
    const { rows } = await client.query(
      `SELECT id, number,street,town,postalcode FROM addresses WHERE user_id='${userID}'`
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function getAllOrders() {
  try {
    const { rows } = await client.query(`SELECT * FROM orders`);
    return rows;
  } catch (e) {
    console.log(e);
  }
}

async function getOrderByID(orderID) {
  console.log(typeof orderID);
  try {
    const { rows } = await client.query(
      `SELECT id,amount,date FROM orders WHERE id='${orderID}'`
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function getOrdersByUserID(userID) {
  try {
    const { rows } = await client.query(
      `SELECT id,amount,date FROM orders WHERE user_id='${userID}'`
    );
    console.log(rows);
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function getProductsByOrderID(orderID) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM products p LEFT JOIN productsorders po ON TEXT(p.id)=po.product_id LEFT JOIN orders o ON TEXT(o.id)=po.order_id WHERE o.id=${orderID};`
    );
    return rows;
  } catch (e) {
    console.log(e);
  }
}

async function addUser(userPassword, userName) {
  try {
    const { rows } = await client.query(
      `INSERT INTO users (password,name) VALUES('${userPassword}','${userName}') RETURNING *`
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function addProduct(
  productTitle,
  productDescription,
  productPrice,
  productImage
) {
  try {
    const { rows } = await client.query(
      `INSERT INTO products (title,description,price,image) VALUES('${productTitle}','${productDescription}','${productPrice}','${productImage}') RETURNING *`
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function addOrder(orderUserID, orderAmount, orderDate) {
  try {
    const { rows } = await client.query(
      `INSERT INTO orders (user_id,amount,date) VALUES('${orderUserID}',${orderAmount},'${orderDate}') RETURNING *`
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function updateProductsOrders(productID, orderID) {
  try {
    const { rows } = await client.query(
      `INSERT INTO productsorders (product_id,order_id) VALUES(${productID},${orderID}) RETURNING * `
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

async function addAddress(userID, number, street, town, postalCode) {
  try {
    const { rows } = await client.query(
      `INSERT INTO addresses (user_id,number,street,town,postalcode) VALUES('${userID}','${number}','${street}','${town}','${postalCode}') RETURNING *`
    );
    return rows[0];
  } catch (e) {
    console.log(e);
  }
}

createDB();

//initializeDB();

module.exports = {
  getAllUsers,
  getUserByID,
  getAllProducts,
  getProductByID,
  getAddressByUserID,
  getAllOrders,
  getOrderByID,
  getOrdersByUserID,
  getProductsByOrderID,
  addUser,
  addProduct,
  addOrder,
  updateProductsOrders,
  addAddress,
};
