const { usersModel } = require('./managers/mongo/models/user.model');
const CartDaoMongo = require('./managers/mongo/cartManagerMongo')

const cartService = new CartDaoMongo()

class UserDaoMongo {
    constructor() {
        this.model = usersModel;
    }

    //muestra todos los usuarios
    async get() {
        return await this.model.find();
    }

    // Muestra un usuario especifico segun un filtro
    async getBy(filter) {
        return await this.model.findOne(filter);
    }

    // Crea un usuario
    async create(user) {
        const cart = await cartService.create();
        user.cart = cart._id;
        return await this.model.create(user);
    }
    
    //modifica usuario
    async update(uid, updatedFields) {
        return await this.model.findOneAndUpdate(
            { _id: uid },
            { $set: updatedFields },
            { new: true }
        );
    }

    //Eliminar usuario segun ID
    async delete(uid) { 
        return await this.model.findByIdAndDelete(uid);
    }
      
      
      
}

module.exports = UserDaoMongo;