const { Router }= require('express')
const ProductManager = require('../managers/productsManager.js');
const router = Router()

const productManager = ProductManager.getInstance('./src/managers/products.json');

router.get('/', (req,res) => {
    const products = productManager.getProducts();
    res.render('home', { title: 'Home', style: 'home.css', body: 'home', products });
});

router.get('/realtimeproducts', (req,res) => {
    const products = productManager.getProducts();
    res.render('realTimeProducts', {title: 'Real time products', style: 'realTimeProducts.css', body: 'realTimeProducts', products});
});


module.exports = router;