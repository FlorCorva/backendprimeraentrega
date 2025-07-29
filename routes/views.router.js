import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();

// PASALE la ruta correcta al constructor:
const manager = new ProductManager('./data/products.json');

router.get('/', async (req, res) => {
  const products = await manager.getAll();
  res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await manager.getAll();
  res.render('realTimeProducts', { products });
});

export default router;
