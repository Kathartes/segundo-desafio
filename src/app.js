const express = require('express');
const ProductManager = require('./productManager');
const app = express();

const productManager = new ProductManager('../products.json');

//GET para obtener todos los productos o con limit
app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || undefined;
    const products = await productManager.getProductsLimit(limit);
    res.json({ products });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});


//GET para mostrar los productos segun el ID
app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    res.json({ product });
  } catch (error) {
    console.error(error.message);
    res.status(404).send('Product Not Found');
  }
});
app.listen(4000, () => {
    console.log(`Ejemplo de escuchar en puerto 4000`);
});