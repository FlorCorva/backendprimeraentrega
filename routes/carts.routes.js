import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./data/carts.json');

router.post('/', async (req, res) => {
  const nuevoCarrito = await cartManager.createCart();
  res.status(201).json(nuevoCarrito);
});

router.get('/:cid', async (req, res) => {
  const carrito = await cartManager.getCartById(req.params.cid);
  carrito ? res.json(carrito.products) : res.status(404).send('Carrito no encontrado');
});

router.post('/:cid/product/:pid', async (req, res) => {
  const actualizado = await cartManager.addProductToCart(req.params.cid, req.params.pid);
  actualizado ? res.json(actualizado) : res.status(404).send('Error al agregar producto');
});

export default router;
