const express = require('express');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema( {
    email: {
        type: String, 
        required: "Email is required"
    }, 
    name: {
        type: String,
        required: "User Name is required"
    }, 
    password: {
        type: String,
        required: "Please enter Valid Password"
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = {User}

