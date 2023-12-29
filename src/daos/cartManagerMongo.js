const { cartsModel } = require('./models/carts.models.js');
//const { productsModel } = require('./models/products.model.js');

class CartDaoMongo {
  constructor() {
    this.model = cartsModel;
  }

  async createCart() {
    try {
      const newCart = await this.model.create({ products: [] });
      return newCart;
    } catch (error) {
      console.error('Error al crear el carrito:', error.message);
      throw error;
    }
  }

  async getCart(cartId) {
    try {
      const cart = await this.model.findOne({_id: cartId}); 
      if (!cart) {
        throw new Error('El carrito no fue encontrado.');
      }
      return cart;
    } catch (error) {
      console.error('Error al obtener el carrito:', error.message);
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error('El carrito no fue encontrado.');
      }

      const existingProduct = cart.products.find(product => product.productId.equals(productId));

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error.message);
      throw error;
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error('El carrito no fue encontrado.');
      }

      cart.products = cart.products.filter(product => !product.productId.equals(productId));

      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error.message);
      throw error;
    }
  }

  async updateCart(cartId, newProducts) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error('El carrito no fue encontrado.');
      }

      cart.products = newProducts;

      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al actualizar el carrito:', error.message);
      throw error;
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error('El carrito no fue encontrado.');
      }

      const existingProduct = cart.products.find(product => product.productId.equals(productId));

      if (existingProduct) {
        existingProduct.quantity = quantity;
      } else {
        throw new Error('El producto no fue encontrado en el carrito.');
      }

      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al actualizar la cantidad del producto en el carrito:', error.message);
      throw error;
    }
  }

  async removeAllProductsFromCart(cartId) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error('El carrito no fue encontrado.');
      }

      cart.products = [];

      await cart.save();
      return cart;
    } catch (error) {
      console.error('Error al eliminar todos los productos del carrito:', error.message);
      throw error;
    }
  }
}

module.exports = CartDaoMongo;
