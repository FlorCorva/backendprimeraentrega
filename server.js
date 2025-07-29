import express from 'express';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from './managers/ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Servidor escuchando en puerto ${PORT}`)
);
const io = new Server(httpServer);
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// WebSocket
io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado');

  socket.emit('update-products', await productManager.getProducts());

  socket.on('new-product', async (data) => {
    await productManager.addProduct(data);
    const updated = await productManager.getProducts();
    io.emit('update-products', updated);
  });

  socket.on('delete-product', async (id) => {
    await productManager.deleteProduct(id);
    const updated = await productManager.getProducts();
    io.emit('update-products', updated);
  });
});
