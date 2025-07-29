const socket = io();

const productForm = document.getElementById('productForm');
const deleteForm = document.getElementById('deleteForm');
const productList = document.getElementById('productList');

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(productForm);
  const data = Object.fromEntries(formData.entries());
  data.price = parseFloat(data.price);
  socket.emit('new-product', data);
  productForm.reset();
});

deleteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(deleteForm);
  const id = formData.get('id');
  socket.emit('delete-product', id);
  deleteForm.reset();
});

socket.on('update-products', (products) => {
  productList.innerHTML = '';
  products.forEach((product) => {
    const li = document.createElement('li');
    li.innerText = `${product.title} - $${product.price} (ID: ${product.id})`;
    productList.appendChild(li);
  });
});
