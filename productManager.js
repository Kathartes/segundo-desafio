const fs = require('fs');

class ProductManager {
    
    constructor(path){
        this.path = path;
        this.contador = 0;
        this.products = [];
        this.writeProducts();  
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

        this.products.splice(id, 1);
        console.log(`El producto se borro correctamente`)
        this.writeProducts()
        return findProduct;  
    }
}


//testeos
const productManager = new ProductManager('products.json');

productManager.addProduct({
    title:`productito`, 
    description:`muchas cositas`,
    price: 35,
    thumbnail:`productito.jpg`,
    code: 43,
    stock: 3,
});

productManager.addProduct({
    title:`productazo`, 
    description:`pocas cositas`,
    price: 53,
    thumbnail:`productazo.jpg`,
    code: 34,
    stock: 9,
});

productManager.addProduct({
    title:`producteto`, 
    description:`demasiadas cositas`,
    price: 65,
    thumbnail:`producteto.jpg`,
    code: 34,
    stock: 4,
});
productManager.addProduct({

    description:`interminables cositas`,
    price: 65,
    thumbnail:`productisimo.jpg`,
    code: 5454,
    stock: 4,
});



const mostrandoProductos = productManager.getProducts();

console.log(mostrandoProductos);

const idProducto = productManager.getProductById(1);

console.log(idProducto);

const idProductoFaltante = productManager.getProductById(34);

console.log(idProductoFaltante);

const borrarProducto = productManager.deleteProduct(1);

const encontrarBorrado = productManager.getProductById(1);


const update = productManager.updateProduct(0, { title: 'requeteproducto', price: 2999, stock: 500 });

const updatemostrado = productManager.getProductById(0);

console.log(updatemostrado);