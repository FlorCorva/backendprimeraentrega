import express from 'express';
<<<<<<< HEAD
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from './managers/ProductManager.js';
=======
import { Server } from "socket.io";
import { engine } from 'express-handlebars';
import mongoose from 'mongoose'; // 👈 Importar mongoose
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.router.js';
import ProductManagerMongo from './managers/ProductManagerMongo.js';
>>>>>>> a1f3728 (proyecto final a medio terminar)
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;
<<<<<<< HEAD
=======

// 🔹 Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

>>>>>>> a1f3728 (proyecto final a medio terminar)
const httpServer = app.listen(PORT, () =>
  console.log(`Servidor escuchando en puerto ${PORT}`)
);
const io = new Server(httpServer);
<<<<<<< HEAD
const productManager = new ProductManager();

=======
const productManager = new ProductManagerMongo();

// Middleware
>>>>>>> a1f3728 (proyecto final a medio terminar)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

=======
// Configuración Handlebars
app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
>>>>>>> a1f3728 (proyecto final a medio terminar)
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// WebSocket
io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado');

<<<<<<< HEAD
  socket.emit('update-products', await productManager.getProducts());

  socket.on('new-product', async (data) => {
    await productManager.addProduct(data);
    const updated = await productManager.getProducts();
    io.emit('update-products', updated);
=======
  const productsData = await productManager.getAll();
  socket.emit('update-products', productsData.docs);

  socket.on('new-product', async (data) => {
    await productManager.addProduct(data);
    const updated = await productManager.getAll();
    io.emit('update-products', updated.docs);
>>>>>>> a1f3728 (proyecto final a medio terminar)
  });

  socket.on('delete-product', async (id) => {
    await productManager.deleteProduct(id);
<<<<<<< HEAD
    const updated = await productManager.getProducts();
    io.emit('update-products', updated);
=======
    const updated = await productManager.getAll();
    io.emit('update-products', updated.docs);
>>>>>>> a1f3728 (proyecto final a medio terminar)
  });
});
