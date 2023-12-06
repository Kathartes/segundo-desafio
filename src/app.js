const express = require('express');
const handlebar = require('express-handlebars');
const {Server} = require('socket.io');
const path = require('path');
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/cart.router.js');
const viewsRouter = require('./routes/views.router.js');
const ProductManager = require('./managers/productsManager.js')
const app = express();
const PORT = 8080;

const hbs = handlebar.create({extname: '.hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts')});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs')
app.set('views' ,path.join(__dirname,'views'));


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")));

const productManager = ProductManager.getInstance('./src/managers/products.json');

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter);
app.use('/',viewsRouter);


const serverHTTP = app.listen(PORT, err => {
    if (err) console.log(err)
    console.log(`Ejemplo de escuchar en puerto ${PORT}`);
});
const io = new Server(serverHTTP);
console.log('Socket.io server listening on port 8080');



io.on('connection', (socket) => {
    console.log("se conecto un cliente");

    const products = productManager.getProducts();
    socket.emit('readProducts', products);

    socket.on('addProduct', (newProduct) => {
        console.log('Producto recibido desde el frontend:', newProduct);
        productManager.addProduct(newProduct);
        io.emit('readProducts', productManager.getProducts());
    })

    socket.on('deleteProduct', (productId) => {
        try {
            console.log(productId);
            productManager.deleteProduct(productId);
            io.emit('readProducts', productManager.getProducts());
        } catch (error) {
            console.error(error.message);
            socket.emit('deleteProductError', { productId, error: error.message });
        }
    });
});
