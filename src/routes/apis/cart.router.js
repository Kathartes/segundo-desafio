const { Router } = require('express');

const cartsRouter = Router();

const CartController = require('../../controllers/carts.controller')

const cartController = new CartController()

//Crear un carrito
cartsRouter.post('/', cartController.createCart);

//Mostrar un carrito segun ID
cartsRouter.get('/:cid', cartController.getCart);

//Agregar un producto al carrito segun ID
cartsRouter.post('/:cid/product/:pid', cartController.addProductToCart);

//Eliminar producto del carrito segun ID
cartsRouter.delete('/:cid/products/:pid', cartController.removeProductFromCart);

//Actualizar el carrito segun ID
cartsRouter.put('/:cid', cartController.updateCart);

//Actualizar la cantidad de un producto en el carrito
cartsRouter.put('/:cid/products/:pid', cartController.updateProductQuantity);

//Eliminar todos los productos del carrito
cartsRouter.delete('/:cid', cartController.removeAllProducts);

//Realizar la compra de los productos del carrito
cartsRouter.post('/:cid/purchase', cartController.purchaseCart);


module.exports = cartsRouter;

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
