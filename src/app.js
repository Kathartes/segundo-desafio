const express = require('express');
const ProductManager = require('./productManager');
const CartManager = require('./cartManager');
const app = express();

app.use(express.json());

const productManager = new ProductManager('../products.json');
const cartManager = new CartManager('../cart.json');

const productsRouter = express.Router();
const cartsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || undefined;
        const products = await productManager.getProductsLimit(limit);
        res.json({ products });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const products = await productManager.getProductById(productId);
        res.json({ products });
    } catch (error) {
        console.error(error.message);
        res.status(404).send('Product Not Found');
    }
});

productsRouter.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body);
        res.json({ product: newProduct });
    } catch (error) {
        console.error(error.message);
        res.status(400).send('Bad Request');
    }
});

productsRouter.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updatedProduct = await productManager.updateProduct(productId, req.body);
        res.json({ product: updatedProduct });
    } catch (error) {
        console.error(error.message);
        res.status(404).send('Product Not Found');
    }
});

productsRouter.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const deletedProduct = await productManager.deleteProduct(productId);
        res.json({ product: deletedProduct });
    } catch (error) {
        console.error(error.message);
        res.status(404).send('Product Not Found');
    }
});

app.use('/api/products', productsRouter);

cartsRouter.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json({ cart: newCart });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCart(cartId);
        res.json({ cart });
    } catch (error) {
        console.error(error.message);
        res.status(404).send('Cart Not Found');
    }
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
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

app.use('/api/carts', cartsRouter);

app.listen(8080, async () => {
    console.log(`Ejemplo de escuchar en puerto 8080`);
});

