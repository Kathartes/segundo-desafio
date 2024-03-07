const { Router } = require('express');
const { generateMockProducts } = require('../../utils/generateProducts')
const testRouter = Router();

testRouter.get('/mockingproducts', (req, res) =>{
    let products = []

    for(let i = 0; i < 100; i++){
        products.push(generateMockProducts())
    }
    res.json({Productos: products});
})



module.exports = testRouter