const {Schema, model, Types} = require('mongoose');
const moongosePaginate = require('mongoose-paginate-v2');

const productsCollection = 'Products';

const ProductsSchema = Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnails: {
        type: Array
    }
})

UserSchema.plugin(moongosePaginate)

const productsModel = model(productsCollection, ProductsSchema)

module.exports = {
    productsModel
}