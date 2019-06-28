const { expect } = require('chai');
const db = require('./db');
const { Product } = db.models;
const { syncAndSeed } = db;
const app = require('supertest')(require('./app'));
describe('My Application', ()=> {
  beforeEach(()=> syncAndSeed());
  describe('My Data Models', ()=> {
    describe('Product model', ()=> {
      it('There are 3 products', async()=> {
        const products = await Product.findAll();
        expect(products.length).to.equal(3);
        expect(products[0].name).to.equal('foo');
      });
      it('needs a name', async()=> {
        const product = Product.build({});
        try{
          await product.save();
        }
        catch(ex){
          expect(ex.errors[0].path).to.equal('name');
        }
      });
      it('name can not be an enpty string', async()=> {
        const product = Product.build({ name: ''});
        try{
          await product.save();
          throw 'nooooooo';
        }
        catch(ex){
          console.log(ex);
          expect(ex.errors[0].path).to.equal('name');
        }
      });
      it('needs a unique name', async()=> {
        try {
          await Product.create({ name: 'foo'});
        }
        catch(ex){
          expect(ex.message).to.equal('Validation error');
        }
      });
    });
  });
  describe('My Routes', ()=> {
    describe('/api/products', ()=> {
      it('returns 3 products', ()=> {
        return app.get('/api/products')
          .expect(200)
          .then( response => {
            expect(response.body.length).to.equal(3);
          });
      });
    });
    describe('/api/products/:id', ()=> {
      it('returns a product', async()=> {
        const foo = await Product.findOne({ where: {
          name: 'foo'
        }});
        return app.get(`/api/products/${foo.id}`)
          .expect(200)
          .then( response => {
            expect(response.body.name).to.equal('foo');
          });
      });
    });
  });
});
