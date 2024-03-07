const { connect } = require('mongoose')
const dotenv = require('dotenv')

const { program } = require("../utils/commander")

const { mode } = program.opts()

dotenv.config({
  path: mode == 'production' ? './.env.production' : './.env.development'
})

exports.configObject = {
  PORT: process.env.PORT || 4040,
  mongo_uri: process.env.MONGO_URI,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  cookie_secret_key: process.env.COOKIE_SECRET_KEY,
}


exports.connectDB = async () => {
    await connect(process.env.MONGO_URI)
    console.log('Conectado a la base de datos')
}

exports.mode == mode