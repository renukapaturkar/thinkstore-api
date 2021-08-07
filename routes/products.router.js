const express = require('express')
const router = express.Router()
const {Product} = require('../models/product.models')
const extend =  require('lodash')


// Product.insertMany(productsList)

router.route('/')
.get(async(req, res)=>{
    
    try{
        const product = await Product.find({})
        res.json({success:true, product})
    }catch(error){
        res.json({success: false, errorMessage: "Cannot get the products, something went wrong!", errMesage:error.message})
    }
})

.post(async(req,res)=>{
    try{
        const product = req.body
        const NewProduct = new Product(product)
        // console.log(product)
        const savedProduct = await NewProduct.save()
        res.json({success:true, savedProduct})

    }catch(error){
        res.json({success: false, errorMessage:"cannot save products to database, something went wrong!"})
    }
})


router
.route("/:productId")
.get(async(req, res)=> {
    try{
        const {productId} = req.params;
        const data = await Product.findById(productId).populate("productsArray.productId");
        if(!data){
            res
            .status(400)
            .json({success: false, message:"Could not found the product."})
        }
        res.json({success: true, data});

    }catch(error){
        res.status(500)
        .json({
            success: false, message: "Internal Server Error", errorMessage: error.message
        });
    }

});

module.exports = router