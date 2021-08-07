const mongoose = require("mongoose")

function initializeDBconnection() {
    mongoose.connect(process.env.CONNECTION_URL, 
    {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log("mongodb successfully connected"))
    .catch(error => console.error("mongodb connection failed... ", error))
}

module.exports = { initializeDBconnection }