const { Router } = require('express');

const ProductDaoMongo = require('../daos/productManagerMongo')

const productsRouter = Router();


const productService = new ProductDaoMongo()

productsRouter.get('/', async (req, res) =>{
    try {
      const products = await productService.getProducts();
      res.json({ products });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

productsRouter.get('/', async (req, res) =>{
  try {
    const limit = parseInt(req.query.limit) || undefined;
    const products = await productService.getProductsLimited(limit);
    res.json({ products });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

productsRouter.get('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productService.getProductById(productId);
    res.json({ product });
  } catch (error) {
    console.error(error.message);
    res.status(404).send('Product Not Found');
  }
});

productsRouter.post('/', async (req, res) => {
  try {
    const newProduct = await productService.addProduct(req.body);

    res.json({ product: newProduct });
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Bad Request');
  }
});

productsRouter.put('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const updatedProduct = await productService.updateProduct(productId, req.body);
    res.json({ product: updatedProduct });
  } catch (error) {
    console.error(error.message);
    res.status(404).send('Product Not Found');
  }
});

productsRouter.delete('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const deletedProduct = await productService.deleteProduct(productId);

    if (deletedProduct) {
      res.json({ product: deletedProduct });
    } else {
      res.status(404).send('Product Not Found');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = productsRouter;