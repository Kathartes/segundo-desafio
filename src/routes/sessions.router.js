const { Router } = require('express');
const UserDaoMongo = require('../daos/userManagerMongo.js');
const { isValidPassword, createHash } = require('../utils/hashPassword.js');
const sessionRouter= Router();
const userService = new UserDaoMongo();
const passport = require('passport');
const { createToken } = require('../utils/jwt');
const { passportCall } = require ('../utils/passportCall.js')
const { authorizationJwt,  authenticationJwtCurrent  } = require('../middlewares/jwtPassport.middleware')

sessionRouter.get('/current', passportCall('jwt'), authenticationJwtCurrent, (req, res) => {
  res.send({ message: 'Datos del usuario actual', user: req.user });
});

sessionRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
  //Borra la cookie del token
  res.clearCookie('token');

  res.status(200).json({ status: 'success', message: 'Logout successful' });
});

sessionRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password ){
        return res.send('Complete todos los campos')
    }

    const user = await userService.getUser({email})
    if (!user) {
      return res.send('Usuario no existe')
    }

    if (!isValidPassword(password, {password: user.password})){
      return res.send('contraseña equivocada')
    }

   

    console.log(user)
    const token = createToken({id: user._id, first_name: user.first_name, last_name: user.last_name, email, cart: user.cart, role: user.role })
    res.cookie('token', token,{
        maxAge: 60 * 60 * 1000 * 24,
        httpOnly: true,
        // secure: true,
        // sameSite: 'none'
    }).json({
        status: 'success',
        message: 'logged in',
        redirectUrl: '/products',
    })
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
    const { first_name, last_name, email, password, age, role} = req.body;
 
    try {
      const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password),
        age,
        role
      }
    
      const result = await userService.createUser(newUser);

    const token = createToken({ id: result._id })

    if (result.error) {
      return res.send(result.error);
    }
    res.cookie('token', token, {
      maxAge: 60 * 60 * 1000 * 24,
      httpOnly: true,
      // secure: true,
      // sameSite: 'none'
    }).json({
      status: 'success',
      message: 'logged in',
      redirectUrl: '/login',
    })

  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
    res.send('Error al registrar usuario. Inténtalo de nuevo.');
  }
  });

/*sessionRouter.post('/login', passport.authenticate('login', {failureRedirect: '/api/session/faillogin'}), async (req, res) => {
  if(!req.user) return res.status(401).send({status: 'error', error: 'Invalid Credential'})

  req.session.user = { first_name: req.user.first_name, last_name: req.user.last_name, email: req.user.email, role: req.user.role };
  res.redirect('/products');
})
sessionRouter.get('/faillogin', (req, res) => {
  console.log('Fail strategy')
  res.send({status: 'error', error: 'Failed login'})
})


sessionRouter.post('/register', passport.authenticate('register', { 
  failureRedirect: '/api/session/failregister'
}), (req, res) => {
  res.redirect('/login'); 
});
sessionRouter.get('/failregister', (req, res) => {
  console.log('Fail strategy')
  res.send({status: 'error', error: 'Failed'})
})*/
  module.exports = sessionRouter;