const fs = require('fs');


class ProductManager {
    
    constructor(path){
        this.path = path;
        this.contador = 1;
        this.products = [];
        this.ReadProducts();
    }

     async ReadProducts() {
        try {
            const data = await fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            this.updateLastId();
        } catch (error) {
            console.error(`No se encontro ${this.path}:`);
            return [];
        }
    }

     updateLastId() {
        if (this.products.length > 0) {
          const maxId = Math.max(...this.products.map(product => product.id));
          this.contador = maxId + 1;
        }
      }

     async writeProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
      }      

     async addProduct(product){
       if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code ||  !product.stock){
        console.error(`Debe ingresar todos los campos`);
        return;
       }
       if (this.products.some((accProduct) => accProduct.code === product.code)) {
        console.error(`Debe ingresar un codigo diferente`);
        return;
      }
      product.id = this.contador++;
      this.products.push(product)
      await this.writeProducts();
    }

    async getProductsLimit(limit) {
        if (limit) {
          return this.products.slice(0, limit);
        } else {
          return this.products;
        }
      }

    async getProducts(){
        return this.products;
    }

    async getProductById(id){
        const findProduct = this.products.find((producto) => producto.id === id);
        if(!findProduct){
            console.error(`No se encontro el producto`);
        }
        return findProduct;  
    }
    
    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((producto) => producto.id === id);

        if (productIndex === -1) {
            console.error(`No se encontró el producto con el ID ${id}`);
            return;
        }

        const existingProduct = this.products[productIndex];
        Object.assign(existingProduct, updatedFields);

        console.log(`El producto con el ID ${id} se actualizó correctamente`);
        await this.writeProducts();
    }

    async deleteProduct(id){
        const findProduct = this.products.find((producto) => producto.id === id);
        if(!findProduct){
            console.error(`No se encontro el producto`);
        }

        this.products.splice(findProduct, 1);
        console.log(`El producto se borro correctamente`)
        await this.writeProducts()
        return findProduct;  
    }
}



//testeos
//const productManager = new ProductManager('../products.json');

module.exports = ProductManager;
/*
// muestro el array 
const showEmptyArray = productManager.getProducts();
console.log(showEmptyArray);
*//*
//agrego un producto prueba
productManager.addProduct({
    title:`producto primero`, 
    description:`este es un producto prueba`,
    price: 200,
    thumbnail:`sinimagen1.jpg`,
    code: "abc123",
    stock: 250,
});
productManager.addProduct({
    title:`producto segundo`, 
    description:`este es un producto prueba`,
    price: 20,
    thumbnail:`sinimagen2.jpg`,
    code: "abc124",
    stock: 25,
});
productManager.addProduct({
    title:`producto tercero`, 
    description:`este es un producto prueba`,
    price: 300,
    thumbnail:`sinimagen3.jpg`,
    code: "abc125",
    stock: 5,
});
/*
//muestro el producto prueba
const showNewProduct = productManager.getProductById(1);
console.log(showNewProduct);

//modifico el producto
productManager.updateProduct(1, { title: 'prueba update', price: 2999, stock: 500 });
const updatemostrado = productManager.getProductById(1);
console.log(updatemostrado);

//borro el producto prueba 
productManager.deleteProduct(1);
const showDeleteProduct = productManager.getProductById(1);
console.log(showDeleteProduct);
*/
