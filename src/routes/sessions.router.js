const { Router } = require('express');
const UserDaoMongo = require('../daos/userManagerMongo.js');
const { isValidPassword, createHash } = require('../utils/hashPassword.js');
const sessionRouter= Router();
const userService = new UserDaoMongo();


sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password ){
        return res.send('Complete todos los campos')
    }

    /*if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      req.session.user = { first_name: 'admin', email, role: 'admin' };
      return res.redirect('/products'); 
  }

   /* const user = await userService.getUser(email, password)
    if(!user){
        return res.send('Email o Password invalidos')
    }*/
    const user = await usersModel.findOne({email})
    if (!user) {
      return res.send('email o contraseña')
    }

    if (!isValidPassword(password, {password: user.password})){
      return res.send('email o contraseña equivocado ')
    }

   

    console.log(user);
    req.session.user = { first_name: user.first_name, last_name: user.last_name, email, role: 'usuario' };
    res.json('login success')
  
    res.redirect('/products');
});


sessionRouter.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar la sesión:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/login');
        }
    });
});


sessionRouter.post('/register', async (req, res) => {
    const { first_name, last_name, email, password} = req.body;
 
    try {
      const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password)
      }
    
      const result = await userService.createUser(newUser);

      if (result.error) {
        return res.send(result.error);
    }
  
      res.redirect('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error.message);
      res.send('Error al registrar usuario. Inténtalo de nuevo.');
    }
  });

  module.exports = sessionRouter;