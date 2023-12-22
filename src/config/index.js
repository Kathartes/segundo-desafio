const { connect } = require('mongoose')

exports.connectDB = async () => {
    await connect('mongodb+srv://aromerosambucetti:andres@cluster0.dmkux9o.mongodb.net/entregabase?retryWrites=true&w=majority')
    console.log('Base de datos conectada')
}

