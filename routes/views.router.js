import { Router } from 'express';
<<<<<<< HEAD
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
=======
import ProductManagerMongo from '../managers/ProductManagerMongo.js';
import CartManager from '../managers/CartManager.js'; // si no lo tenés importado

const router = Router();
const productManager = new ProductManagerMongo();
const cartManager = new CartManager('./data/carts.json'); // ajustá la ruta según tu proyecto

// Ruta principal para listar productos
router.get('/', async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;
    const productsData = await productManager.getAll({ limit, page, sort, query });
    const { docs, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = productsData;

    res.render('home', {
      products: docs,
      pagination: {
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        currentPage: page ? parseInt(page) : 1
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar productos');
  }
});

// Nueva ruta para ver un carrito específico
router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.render('cart', { cart: cart.toObject() });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el carrito');
  }
>>>>>>> a1f3728 (proyecto final a medio terminar)
});

export default router;
