const { Router } = require('express');

const productsRouter = Router();
const { uploader } = require('../../utils/multer')
const ProductsController = require('../../controllers/products.controller')

const productsController = new ProductsController()

//Mostrar productos con diferentes filtros y paginacion
productsRouter.get('/', productsController.getProductsLimited);

//Mostrar todos los productos
productsRouter.get('/all', productsController.getProducts);

//Mostrar producto segun ID
productsRouter.get('/:pid', productsController.getProductBy);

//Agregar producto
productsRouter.post('/', uploader.array('thumbnails'), productsController.createProduct);

//Modificar un producto segun su ID
productsRouter.put('/:pid', uploader.array('updateThumbnails'), productsController.updateProduct);

//Eliminar un producto segun su ID
productsRouter.delete('/:pid', productsController.deleteProduct);


module.exports = productsRouter;
