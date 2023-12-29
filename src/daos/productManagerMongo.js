const { productsModel } = require('./models/products.model.js')

class ProductDaoMongo {
    constructor() {
        this.model = productsModel
    }

    async addProduct(product) {
        try {
            if (!product.title || !product.description || !product.price || !product.code || !product.stock || !product.category) {
                console.error('Todos los campos son obligatorios.');
                return null;
            }

           
            const existingProduct = await this.model.findOne({ code: product.code });
            if (existingProduct) {
                console.error('El campo "code" ya está en uso.');
                return null;
            }

           
            const thumbnails = product.thumbnails || [];


          
            const newProduct = await this.model.create({
                title: product.title,
                description: product.description,
                price: product.price,
                code: product.code,
                stock: product.stock,
                category: product.category,
                status: true,
                thumbnails: thumbnails,
            });
            console.log('Created Product:', newProduct);
            return newProduct;
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
            throw error;
        }
    }


    async getProducts(limit, page, sort, query) {
        try {
            const options = {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
            };

            let filter = {};

            if (query) {
         
                const isStatus = query.toLowerCase() === 'true' || query.toLowerCase() === 'false';

                if (isStatus) {
                    filter.status = query.toLowerCase() === 'true';
                } else {
                   
                    filter.category = query;
                }
            }

            const result = await this.model.paginate(filter, options);

            const response = {
                status: 'success',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `/products?limit=${limit}&page=${result.prevPage}`: null,
                nextLink: result.hasNextPage ? `/products?limit=${limit}&page=${result.nextPage}`: null,
            };

            return response;
        } catch (error) {
            console.error('Error al obtener los productos paginados:', error.message);
            throw error;
        }
    }

    async getProductsLimited(limit) {
        if (limit) {
            return this.model.find().limit(limit);
        } else {
            return this.model.find();
        }
    }

    async getProductById(id) { 
        try {
            const product = await this.model.findById(id);
      
            if (!product) {
                throw new Error('El producto no fue encontrado.');
            }
      
            return product;
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error.message);
            throw error;
        }
    }

    async updateProduct(pid, updatedFields) {
        try {
            const updatedProduct = await this.model.findOneAndUpdate(
                { _id: pid },
                { $set: updatedFields },
                { new: true }
            );

            if (updatedProduct) {
                return updatedProduct;
            } else {
                console.error('No se encontró el producto para actualizar.');
                return null;
            }
        } catch (error) {
            console.error('Error al actualizar el producto:', error.message);
            throw error;
        }
    }

    async deleteProduct(pid) { 
        try {
            const deletedProduct = await this.model.findByIdAndDelete(pid);
            return deletedProduct;
        } catch (error) {
            console.error('Error al eliminar el producto:', error.message);
            throw error;
        }
    }

}

module.exports = ProductDaoMongo