const fs = require('fs');

class ProductManager {
    
    constructor(path){
        this.path = path;
        this.contador = 1;
        this.products = [];
        this.readProducts();
    }
// Función para cargar los datos del JSON
    async readProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.updateLastId();
        } catch (error) {
            throw new Error(`No se encontró ${this.path}: ${error.message}`);
        }
    }
 // Función para generar el ID
    updateLastId() {
        if (this.products.length > 0) {
          const maxId = Math.max(...this.products.map(product => product.id));
          this.contador = maxId + 1;
        }
    }
// Función para guardar los datos en el JSON
    async writeProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf8');
        } catch (error) {
            throw new Error(`Error al escribir en ${this.path}: ${error.message}`);
        }
    }      
  // Función para crear producto
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
    // Función para ver un producto y de forma limitada
    async getProductsLimit(limit) {
        return limit ? this.products.slice(0, limit) : this.products;
    }
    // Función para ver los productos
    async getProducts(){
        return this.products;
    }
    // Función para ver producto por id
    async getProductById(id){
        const findProduct = this.products.find((producto) => producto.id === id);
        if (!findProduct){
            throw new Error(`No se encontró el producto`);
        }
        return findProduct;  
    }
    // Función para modificar un producto
    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((producto) => producto.id === id);

        if (productIndex === -1) {
            throw new Error(`No se encontró el producto con el ID ${id}`);
        }

        const existingProduct = this.products[productIndex];
        this.products[productIndex] = { ...existingProduct, ...updatedFields };

        console.log(`El producto con el ID ${id} se actualizó correctamente`);
        await this.writeProducts();
    }
    // Función para borrar un producto
    async deleteProduct(id){
        const productIndex = this.products.findIndex((producto) => producto.id === id);
        if (productIndex === -1){
            throw new Error(`No se encontró el producto`);
        }

        this.products.splice(productIndex, 1);
        console.log(`El producto se borró correctamente`);
        await this.writeProducts();
        return this.products[productIndex];
    }
}

module.exports = ProductManager;


