const { Server } = require('socket.io')
const ProductsManagerMongo = require('../daos/mongo/productManagerMongo')
const MessagesManagerMongo =require('../daos/mongo/messageManagerMongo')

const productDao = new ProductsManagerMongo()
const messageDao = new MessagesManagerMongo()



function SocketIO(server) {
    const io = new Server(server);
  
    io.on('connection', async (socket) => {
      console.log('Un cliente se ha conectado');
  
      try {
        const initialProducts = await productDao.get();
      
        socket.emit('updateProducts', initialProducts);
      } catch (error) {
        console.error('Error al obtener los productos:', error.message);
      }
  
      socket.on('createProduct', async (newProduct) => {
        await productDao.create(newProduct);
       
        io.emit('updateProducts', await productDao.get());
       
      });
  
      socket.on('deleteProduct', async (productId) => {
        try {
          await productDao.delete(productId);
        
          io.emit('deleteProduct', productId.toString());
        } catch (error) {
          console.error(error.message);
          socket.emit('deleteProductError', { productId, error: error.message });
        }
      });
  
      console.log('Nuevo cliente conectado');
  
      try {
        const messages = await messageDao.get()
        
        socket.emit('updateMessages', messages);
    } catch (error) {
        console.error('Error al obtener mensajes:', error.message);
    }


    socket.on('sendMessage', async (user, message) => {
        try {
            await messageDao.addOrUpdateMessage(user, message);
         
            const messages = await messageDao.get();
            io.emit('updateMessages', messages);
        } catch (error) {
            console.error('Error al enviar mensaje:', error.message);
        }
    });
});
  }
  
  module.exports = SocketIO;