const fs = require('fs');

class ProductManager {
    
    constructor(path){
        this.path = path;
        this.contador = 1;
        this.products = this.ReadProducts();
    }

    ReadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`No se encontro ${this.path}:`);
            return [];
        }
    }

    updateNextId() {
        if (this.products.length > 0) {
          const maxId = Math.max(...this.products.map(product => product.id));
          this.contador = maxId + 1;
        }
      }

    writeProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
      }      

    addProduct(product){
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
      this.writeProducts();
    }

    getProducts(){
        return this.products;
    }

    getProductById(id){
        const findProduct = this.products.find((producto) => producto.id === id);
        if(!findProduct){
            console.error(`No se encontro el producto`);
        }
        return findProduct;  
    }
    
    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((producto) => producto.id === id);

        if (productIndex === -1) {
            console.error(`No se encontró el producto con el ID ${id}`);
            return;
        }

        const existingProduct = this.products[productIndex];
        Object.assign(existingProduct, updatedFields);

        console.log(`El producto con el ID ${id} se actualizó correctamente`);
        this.writeProducts();
    }

    deleteProduct(id){
        const findProduct = this.products.find((producto) => producto.id === id);
        if(!findProduct){
            console.error(`No se encontro el producto`);
        }

        this.products.splice(findProduct, 1);
        console.log(`El producto se borro correctamente`)
        this.writeProducts()
        return findProduct;  
    }
}


//testeos
const productManager = new ProductManager('products.json');

// muestro el array 
const showEmptyArray = productManager.getProducts();
console.log(showEmptyArray);

//agrego un producto prueba
productManager.addProduct({
    title:`producto prueba`, 
    description:`este es un producto prueba`,
    price: 200,
    thumbnail:`sinimagen.jpg`,
    code: "abc123",
    stock: 25,
});

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