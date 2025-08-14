import { Router } from 'express';
<<<<<<< HEAD
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./data/carts.json');

=======
import CartManagerMongo from '../managers/CartManagerMongo.js';

const router = Router();
const cartManager = new CartManagerMongo();

// Crear un carrito vacío
>>>>>>> a1f3728 (proyecto final a medio terminar)
router.post('/', async (req, res) => {
  const nuevoCarrito = await cartManager.createCart();
  res.status(201).json(nuevoCarrito);
});

<<<<<<< HEAD
router.get('/:cid', async (req, res) => {
  const carrito = await cartManager.getCartById(req.params.cid);
  carrito ? res.json(carrito.products) : res.status(404).send('Carrito no encontrado');
});

=======
// Obtener un carrito por ID
router.get('/:cid', async (req, res) => {
  const carrito = await cartManager.getCartById(req.params.cid);
  carrito ? res.json(carrito) : res.status(404).send('Carrito no encontrado');
});

// Agregar producto al carrito
>>>>>>> a1f3728 (proyecto final a medio terminar)
router.post('/:cid/product/:pid', async (req, res) => {
  const actualizado = await cartManager.addProductToCart(req.params.cid, req.params.pid);
  actualizado ? res.json(actualizado) : res.status(404).send('Error al agregar producto');
});

<<<<<<< HEAD
=======
// Actualizar cantidad de un producto
router.put('/:cid/product/:pid', async (req, res) => {
  const { quantity } = req.body;
  const actualizado = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
  actualizado ? res.json(actualizado) : res.status(404).send('Error al actualizar cantidad');
});

// Eliminar un producto del carrito
router.delete('/:cid/product/:pid', async (req, res) => {
  const actualizado = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
  actualizado ? res.json(actualizado) : res.status(404).send('Error al eliminar producto');
});

// Vaciar carrito
router.delete('/:cid', async (req, res) => {
  const actualizado = await cartManager.clearCart(req.params.cid);
  actualizado ? res.json(actualizado) : res.status(404).send('Error al vaciar carrito');
});

>>>>>>> a1f3728 (proyecto final a medio terminar)
export default router;
