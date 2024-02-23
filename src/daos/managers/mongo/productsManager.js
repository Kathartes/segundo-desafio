const fs = require('fs').promises;
const { BadRequestError } = require('../../errors');

class ProductManager {
    
    constructor(path){
        this.path = path;
        this.contador = 1;
        this.products = [];
        this.readProducts();
    }

    static getInstance(path) {
        if (!ProductManager.instance) {
          ProductManager.instance = new ProductManager(path);
        }
        return ProductManager.instance;
      }

// Metodo para cargar los datos del JSON
    async readProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.updateLastId();
          } catch (error) {
            console.error('El archivo de productos no existe');
          }
    }
 // Metodo para generar el ID
    updateLastId() {
        if (this.products.length > 0) {
          const maxId = Math.max(...this.products.map(product => product.id));
          this.contador = maxId + 1;
        }
    }
// Metodo para guardar los datos en el JSON
    async writeProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
        } catch (error) {
            throw new Error(`Error al escribir en ${this.path}: ${error.message}`);
        }
    }      
  // Metodo para crear producto
    async addProduct(product){
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code ||  !product.stock){
            throw new Error(`Debe ingresar todos los campos`);
        }

        if (this.products.some((accProduct) => accProduct.code === product.code)) {
            throw new Error(`Debe ingresar un código diferente`);
        }

        product.id = this.contador++;
        this.products.push(product);
        await this.writeProducts();
    }
    // Metodo para ver un producto y de forma limitada
    async getProductsLimit(limit) {
        return limit ? this.products.slice(0, limit) : this.products;
    }
    // Metodo para ver los productos
     getProducts(){
        return this.products;
    }
    // Metodo para ver producto por id
    async getProductById(id){
        const findProduct = this.products.find((producto) => producto.id === id);
        if (!findProduct){
            throw new Error(`No se encontró el producto`);
        }
        return findProduct;  
    }
    // Metodo para modificar un producto
    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((producto) => producto.id === id);

        if (productIndex !== -1) {
            throw new Error(`No se encontró el producto con el ID ${id}`);
        }

        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };

        console.log(`El producto con el ID ${id} se actualizó correctamente`);
        await this.writeProducts();
        return this.products[productIndex];
    }
    // Metodo para borrar un producto
    async deleteProduct(id){
        console.log(id);
        const index = this.products.findIndex(producto => producto.id === id);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1)[0];
            await this.writeProducts();
            return deletedProduct;
          } else {
            throw new Error('El producto no fue encontrado. ID: ' + id);
          }
    }
}

module.exports = ProductManager;


