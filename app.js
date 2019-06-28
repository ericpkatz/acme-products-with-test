const express = require('express');
const app = express();
const { models } = require('./db');
const { Product } = models;

module.exports = app;

app.get('/api/products', async(req, res, next)=> {
  res.send(await Product.findAll());
});

app.get('/api/products/:id', async(req, res, next)=> {
  try{
    res.send(await Product.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});
