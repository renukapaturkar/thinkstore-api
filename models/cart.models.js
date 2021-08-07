const express = require('express')
const mongoose = require('mongoose')
const {Product} = require('./product.models')
const {Schema} = mongoose;

const CartSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: "User"},
    productsArray: [{_id:{type: Schema.Types.ObjectId, ref:'Product'},quantity:Number}]
})

const Cart = mongoose.model('Cart', CartSchema)



module.exports = { Cart }