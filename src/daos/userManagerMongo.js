const CartDaoMongo = require('./cartManagerMongo');
const { usersModel } = require('./models/user.model');

const cartService = new CartDaoMongo

class UserDaoMongo {
    constructor() {
        this.model = usersModel;
    }

    

    async getUser(filter) {
        try {
            const user = await this.model.findOne( filter );
            return user;
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    }

    async createUser(user) {
        try {
            if (!user.first_name || !user.last_name || !user.email || !user.password) {
                return { error: 'Todos los campos son obligatorios.' };
            }
            const existingUser = await this.model.findOne({ email: user.email });
            if (existingUser) {
                return { error: 'El usuario ya existe' };
            }

            const newUser = await this.model.create({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                age: user.age,
                cart: { cartId: (await cartService.createCart())._id },
                role: user.role,
            });
            return newUser;

        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }
}

module.exports = UserDaoMongo;