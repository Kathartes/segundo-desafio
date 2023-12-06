const fs = require('fs').promises;

class CartManager {
  constructor(path) {
    this.path = path;
    this.contador = 1;
    this.carts = [];
    this.readCarts();
  }

  // Función para cargar los datos del JSON
  async readCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      this.carts = JSON.parse(data);
      this.updateLastId();
    } catch (error) {
      console.error('El archivo de carritos no existe');
    }
  }

  // Función para generar el ID
  updateLastId() {
    if (this.carts.length > 0) {
      const maxId = Math.max(...this.carts.map(cart => cart.id));
      this.contador = maxId + 1;
    }
  }

  // Función para guardar los datos en el JSON
  async writeCarts() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf8');
    } catch (error) {
      throw new Error('Error al guardar los carritos');
    }
  }

  // Función para crear un carrito
  async addCart() {
    const newCart = {
      id: this.contador++,
      products: [],
    };

    this.carts.push(newCart);
    await this.writeCarts();
    return newCart;
  }

  // Función para cargar/mostrar un carrito según su ID
  async getCart(cartId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      throw new Error('El carrito no fue encontrado.');
    }
    return cart;
  }

  // Función para agregar un producto al carrito
  async addProductToCart(cartId, productId, quantity) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      throw new Error('El carrito no fue encontrado.');
    }

    const existingProduct = cart.products.find(product => product.id === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ id: productId, quantity });
    }

    await this.writeCarts();
    return cart;
  }
}

module.exports = CartManager;


