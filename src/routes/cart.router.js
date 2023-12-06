const { Router }= require('express')
const CartManager = require('../managers/cartManager');
const cartRouter = Router()

//configuracion rutas

const cartManager = new CartManager('./src/managers/cart.json');


cartRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.addCart();
        res.json({ cart: newCart });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

cartRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCart(cartId);
        res.json({ cart });
    } catch (error) {
        console.error(error.message);
        res.status(404).send('Cart Not Found');
    }
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const quantity = req.body.quantity || 1;
        const updatedCart = await cartManager.addProductToCart(cartId, productId, quantity);
        res.json({ cart: updatedCart });
    } catch (error) {
        console.error(error.message);
        res.status(400).send('Bad Request');
    }
});



module.exports = cartRouter;