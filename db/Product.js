const conn = require('./conn');

const Product = conn.define('product', {
  id: {
    primaryKey: true,
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4
  },
  name: {
    type: conn.Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Product;
