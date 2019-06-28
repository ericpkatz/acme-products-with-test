const Sequelize = require('sequelize');
const conn = require('./conn');
const Product = require('./Product');


const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const productNames = ['foo', 'bar', 'bazz'];
  //await Promise.all(productNames.map(name => Product.create({ name })));
  await Promise.all(productNames.map(name => Product.create({ name })));
};

module.exports = {
  syncAndSeed,
  models: {
    Product
  }
};
