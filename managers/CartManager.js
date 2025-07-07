import fs from 'fs/promises';
import generateId from '../utils/generateId.js';

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    const data = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async getCartById(id) {
    const carritos = await this.getAll();
    return carritos.find(c => c.id == id);
  }

  async createCart() {
    const carritos = await this.getAll();
    const nuevoCarrito = { id: generateId(), products: [] };
    carritos.push(nuevoCarrito);
    await fs.writeFile(this.path, JSON.stringify(carritos, null, 2));
    return nuevoCarrito;
  }

  async addProductToCart(cid, pid) {
    const carritos = await this.getAll();
    const carrito = carritos.find(c => c.id == cid);
    if (!carrito) return null;

    const productoExistente = carrito.products.find(p => p.product == pid);
    if (productoExistente) {
      productoExistente.quantity++;
    } else {
      carrito.products.push({ product: pid, quantity: 1 });
    }

    await fs.writeFile(this.path, JSON.stringify(carritos, null, 2));
    return carrito;
  }
}
