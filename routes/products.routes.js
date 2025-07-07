import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./data/products.json');

router.get('/', async (req, res) => {
  const products = await productManager.getAll();
  res.json(products);
});

router.get('/:pid', async (req, res) => {
  const product = await productManager.getById(req.params.pid);
  product ? res.json(product) : res.status(404).send('Producto no encontrado');
});

router.post('/', async (req, res) => {
  const nuevoProducto = await productManager.addProduct(req.body);
  res.status(201).json(nuevoProducto);
});

router.put('/:pid', async (req, res) => {
  const actualizado = await productManager.updateProduct(req.params.pid, req.body);
  actualizado ? res.json(actualizado) : res.status(404).send('Producto no encontrado');
});

router.delete('/:pid', async (req, res) => {
  const eliminado = await productManager.deleteProduct(req.params.pid);
  eliminado ? res.send('Producto eliminado') : res.status(404).send('No encontrado');
});

export default router;
