const passport = require('passport')
const local = require('passport-local')
const UserDaoMongo = require('../daos/userManagerMongo')
const { usersModel } = require('../models/users.model')
const { createHash, isValidPassword } = require('../utils/hashPassword')


const LocalStrategy = local.Strategy
const userService = new UserDaoMongo()

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true, 
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const {first_name, last_name, email} = req.body 
            let userFound = await userService.getUserBy({email: username})
        }catch (error) {
            return done('Error al crear un usuario' +error)
        }
    }))
}