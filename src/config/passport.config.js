const passport = require('passport')
const local = require('passport-local')
const userDaoMongo = require('../daos/userManagerMongo')
//const { usersModel } = require('../models/users.model')
const { createHash, isValidPassword } = require('../utils/hashPassword')


const LocalStrategy = local.Strategy
const userService = new userDaoMongo()

exports.initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const { first_name, last_name, role } = req.body;

            let userFound = await userService.getUser({ email: username })
            if (userFound) return done('Ese Email ya esta registrado', false)

            let newUser = {
                first_name,
                last_name,
                email: username,
                password: createHash(password),
                role
            }
            let result = await userService.createUser(newUser)
            return done(null, result, { successRedirect: '/login', status: 200 })
        } catch (error) {
            return done('Error al crear usuario' + error)
        }
    }))

    passport.serializeUser((user, done) => {
        try {
            done(null, user.id);
        } catch (error) {
            done(error);
        }
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userService.getUser({ _id: id });
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

passport.use('login', new LocalStrategy({
    usernameField: 'email'
}, async (username, password, done) => {
    try {
        const user = await userService.getUser({ email: username })
        if (!user) {
            console.log('User not found')
            return done('El usuario no existe', false)
        }
        if(!(isValidPassword(password, user.password))) return done('Password Incorrecta', false)

        return done(null, user)

    } catch (error) {
        return done(error)
    }
}))