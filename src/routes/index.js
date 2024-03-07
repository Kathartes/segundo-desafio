const { Router } = require('express')
const router = Router()
const productsRouter = require('./apis/products.router')
const cartsRouter = require ('./apis/cart.router')
const sessionRouter = require ('./apis/session.router')
const viewsRouter = require ('./views.router')
const { logger } = require('../utils/logger')
const { handleError } = require('../middlewares/error/handleError');

router.use('/api/products', productsRouter);
router.use('/api/carts', cartsRouter);
router.use('/api/session', sessionRouter)
router.use('/', viewsRouter);

router.use(handleError)
router.use((err, req, res, next)=>{
    logger.fatal(err)
    res.status(500).send('Error Server')
})

router.get('/', (req, res) => {
    res.redirect('/login');
  });

module.exports = router