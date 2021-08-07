const express = require('express')
const cors = require('cors');
const authRouter = require('./routes/auth.router')
require('dotenv').config();
const {authVerify} = require('./middleware/authVerify');


const app = express()
app.use(express.json())
app.use(cors())


const products = require('./routes/products.router.js')
const carts = require('./routes/cart.router.js')
const wishlists = require('./routes/wishlist.router.js')


const { initializeDBconnection } = require("./db/db.connect.js")

initializeDBconnection()

app.use('/products',products)
app.use(authRouter);
app.use('/carts', authVerify, carts)
app.use('/wishlists',authVerify, wishlists)

app.get('/', (req, res) => res.send("API for Think store- Ecommerce app"))

app.listen(process.env.PORT , () => console.log(`Think store app listening at http://localhost:${process.env.PORT}`))