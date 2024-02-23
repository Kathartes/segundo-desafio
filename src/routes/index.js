const { Router } = require('express')
const router = Router()
const productsRouter = require('./apis/products.router')
const cartsRouter = require ('./apis/cart.router')
const sessionRouter = require ('./apis/session.router')
const viewsRouter = require ('./views.router')

router.use('/api/products', productsRouter);
router.use('/api/carts', cartsRouter);
router.use('/api/session', sessionRouter)
router.use('/', viewsRouter);


router.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send('Error Server')
})

router.get('/', (req, res) => {
    res.redirect('/login');
  });

module.exports = router