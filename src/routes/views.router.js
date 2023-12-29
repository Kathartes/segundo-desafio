
const { Router } = require('express');
const ProductDaoMongo = require('../daos/productManagerMongo')
const MessageDaoMongo = require('../daos/messageManagerMongo')
const CartDaoMongo = require ('../daos/cartManagerMongo')
const router= Router();


const productService = new ProductDaoMongo()
const messageService = new MessageDaoMongo()
const cartService = new CartDaoMongo()

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
    const { limit, page, sort, query } = req.query;
    const products =  await productService.getProducts({limit, page, sort, query});
    res.render('products', { title: 'Products', style: 'products.css', body: 'products', products });
});
router.get('/carts/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart =  await cartService.getCart({ _id: cid});
    res.render('cart', { title: 'Cart', style: 'cart.css', body: 'cart', cart });
});


module.exports = router;