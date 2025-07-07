import fs from 'fs/promises';
import generateId from '../utils/generateId.js';

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    const data = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async getById(id) {
    const productos = await this.getAll();
    return productos.find(p => p.id == id);
  }

  async addProduct(product) {
    const productos = await this.getAll();
    const newProduct = { id: generateId(), ...product };
    productos.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
    return newProduct;
  }

  async updateProduct(id, data) {
    const productos = await this.getAll();
    const index = productos.findIndex(p => p.id == id);
    if (index === -1) return null;
    productos[index] = { ...productos[index], ...data, id: productos[index].id };
    await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
    return productos[index];
  }

  async deleteProduct(id) {
    const productos = await this.getAll();
    const filtrado = productos.filter(p => p.id != id);
    if (productos.length === filtrado.length) return false;
    await fs.writeFile(this.path, JSON.stringify(filtrado, null, 2));
    return true;
  }
}
