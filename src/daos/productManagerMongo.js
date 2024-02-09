const { productsModel } = require('./models/products.model.js')

class ProductDaoMongo {
    constructor() {
        this.model = productsModel
    }

    async addProduct(product) {
        return await this.model.create(product);
    }
    async getProducts() {
        return await this.model.find();
    }
    async getProductsLimited({ filter, options }) {
        return await this.model.paginate(filter, options);
    } 
    async getProductById(id) { 
        return await this.model.findById(id);
    }

    async updateProduct(pid, updatedFields) {
        return await this.model.findOneAndUpdate(
            { _id: pid },
            { $set: updatedFields },
            { new: true }
        );
    }

    async deleteProduct(pid) { 
        return await this.model.findByIdAndDelete(pid);
    }
}

module.exports = ProductDaoMongo