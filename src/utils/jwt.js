const jwt = require('jsonwebtoken')

JWT_PRIVATE_KEY = 'palabrasecretaparafirmareltoken'

exports.createToken = user => jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: '24h' }) 