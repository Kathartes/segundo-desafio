const { Schema, model, Types } = require('mongoose');

const usersCollection = "Users"

const usersSchema = Schema({
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }, 
  age: {
    type: Number,
    required: true,
    trim: true
  },
  cart: {
    cartId: { type: Types.ObjectId, ref: 'Carts'},
  },
  role: {
    type: String,
    required: true
  }
})

usersSchema.pre('findoOne', function(){
  this.populate('cart.cartId')
} )

const usersModel = model(usersCollection, usersSchema)

module.exports = {usersModel}