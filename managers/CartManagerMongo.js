import { cartModel } from '../models/cart.model.js';

export default class CartManagerMongo {
  
  async createCart() {
    const newCart = await cartModel.create({ products: [] });
    return newCart;
  }

  async getCartById(cid) {
    return await cartModel.findById(cid).populate('products.product');
  }

  async addProductToCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
    if (productIndex >= 0) {
      cart.products[productIndex].quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    return cart;
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await cartModel.findById(cid);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
    if (productIndex >= 0) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return cart;
    }
    return null;
  }

  async removeProductFromCart(cid, pid) {
    const cart = await cartModel.findById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    return cart;
  }

  async clearCart(cid) {
    const cart = await cartModel.findById(cid);
    if (!cart) return null;

    cart.products = [];
    await cart.save();
    return cart;
  }
}
