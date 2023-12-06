const { Router }= require('express')
const ProductManager = require('../managers/productsManager.js');
const productsRouter = Router()

//configuracion rutas



const productManager = new ProductManager('./src/managers/products.json');



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
        //res.status(400).send('Bad Request');

        if(error instanceof BadRequestError) {
            return res
                .status(error.statusCode)
                .send({error: error.name, message: error.message });
        }
        res.status(500).send({error: "internal error"});
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

module.exports = productsRouter;