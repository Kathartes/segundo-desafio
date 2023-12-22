const { Router } = require('express');

const CartDaoMongo = require('../daos/cartManagerMongo')

const cartsRouter = Router();


const cartService = new CartDaoMongo()

cartsRouter.post('/', async (req, res) => {
  try {
    const newCart = await cartService.createCart();
    res.json({ cart: newCart });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

cartsRouter.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getCart(cartId);
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

module.exports = cartsRouter;