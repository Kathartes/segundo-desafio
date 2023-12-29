const { Router } = require('express');
const CartDaoMongo = require('../daos/cartManagerMongo');
const cartsRouter = Router();
const cartService = new CartDaoMongo();

cartsRouter.post('/', async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    res.json({ cart: newCart });//
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

cartsRouter.get('/:cid', async (req, res) => {
  try {
    const {cid} = req.params;
    const cart = await cartService.getCart({_id: cid});
    res.json({ cart });
  } catch (error) {
    console.error(error.message);
    res.status(404).send('Cart Not Found');
  }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    const updatedCart = await cartService.addProductToCart(cartId, productId, quantity);
    res.json({ cart: updatedCart });
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Bad Request');
  }
});



// DELETE api/carts/:cid/products/:pid
cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const updatedCart = await cartService.removeProductFromCart(cartId, productId);
    res.json({ cart: updatedCart });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// PUT api/carts/:cid
cartsRouter.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.params.products || [];
    const updatedCart = await cartService.updateCart(cartId, products);
    res.json({ cart: updatedCart });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// PUT api/carts/:cid/products/:pid
cartsRouter.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    const updatedCart = await cartService.updateProductQuantity(cartId, productId, quantity);
    res.json({ cart: updatedCart });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE api/carts/:cid
cartsRouter.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    await cartService.removeAllProductsFromCart(cartId);
    res.json({ status: 'success', message: 'All products removed from the cart.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = cartsRouter;
