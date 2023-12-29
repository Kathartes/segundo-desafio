
const { Router } = require('express');
const ProductDaoMongo = require('../daos/productManagerMongo')
const MessageDaoMongo = require('../daos/messageManagerMongo')
const router= Router();


const productService = new ProductDaoMongo()
const messageService = new MessageDaoMongo()


router.get('/', async (req, res) => {
    const products = await productService.getProducts();
    res.render('home', { title: 'Home', style: 'home.css', body: 'home', products });
});


router.get('/realtimeproducts', async (req, res) => {
    const products =  await productService.getProducts();
    res.render('realTimeProducts', { title: 'Real-Time Products', style: 'realTimeProducts.css', body: 'realTimeProducts', products });
});

router.get('/chat', async (req, res) => {
    const messages =  await messageService.getMessages();
    res.render('chat', { title: 'Chat', style: 'chat.css', body: 'chat', messages });
});

router.get('/products', async (req, res) => {
    const products =  await productService.getProducts();
    res.render('products', { title: 'Products', style: 'products.css', body: 'products', products });
});
router.get('/carts/:cid', async (req, res) => {
    const cart =  await cartService.get();
    res.render('cart', { title: 'Cart', style: 'cart.css', body: 'cart', messages });
});


module.exports = router;