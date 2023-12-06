const socket = io();

function addProduct() {
 
    const newProduct = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      code: document.getElementById('code').value,
      price: parseFloat(document.getElementById('price').value),
      stock: parseInt(document.getElementById('stock').value),
      thumbnail: document.getElementById('thumbnail').value,
    };
    console.log('Enviando nuevo producto al servidor:', newProduct);
   
    socket.emit('addProduct', newProduct);
  
   
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('code').value = '';
    document.getElementById('price').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('thumbnail').value = '';
  }
  
  
  socket.on('readProducts', (products) => {
   
    const productsList = document.querySelector('.products');
    productsList.innerHTML = ""; 

    products.forEach((product) => {
        
        const article = document.createElement('article');
        article.classList.add('article');
        article.innerHTML = `
            <img src="${product.thumbnail}" alt="thumbnail">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <p>${product.stock}</p>
            <p>${product.code}</p>
            <p>${product.id}</p>
        `;

        productsList.appendChild(article);
    });
  });
  
  function deleteProduct() {
     
      const productId = parseInt(document.getElementById('productId').value);
    
      
      socket.emit('deleteProduct', productId);
  
    
      document.getElementById('productId').value = '';
    }
    
    
    socket.on('deleteProduct', (productId) => {
      try {
       
        const productsList = document.querySelector('.products');
        const productElement = document.getElementById(`product_${productId}`);
    
        if (productElement) {
          productsList.removeChild(productElement);
        }
      } catch (error) {
        console.error(`Error al eliminar el producto con ID ${productId}:`, error.message);
      }
    });