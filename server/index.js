const express = require('express');
const middlewares = require('./middlewares');
const Store = require('./store/store');

const PORT = process.env.PORT || 5000;

const app = express();

middlewares(app);



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
