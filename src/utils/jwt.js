const jwt = require('jsonwebtoken')
const { configObject } = require('../config')

const JWT_PRIVATE_KEY = configObject.jwt_secret_key

exports.createToken = user => jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: '24h' }) 