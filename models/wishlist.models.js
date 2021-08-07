const express = require("express");
const mongoose = require("mongoose");
const { Product } = require("./product.models.js");
const {User} = require("./user.model");
const { Schema } = mongoose;

const WishlistSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "User"},
  wishlistArray: [
    { _id: { type: Schema.Types.ObjectId, ref: "Product" } },
  ]
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = { Wishlist };
