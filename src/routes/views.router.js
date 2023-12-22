
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



module.exports = router;