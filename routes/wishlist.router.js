const express = require("express");
const router = express.Router();
const { Wishlist } = require("../models/wishlist.models.js");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const user = req.user;
      const data = await Wishlist.findOne({user: user._id}).populate("wishlistArray._id")
      if (!data) {
        res
          .status(500)
          .json({ success: false, message: "Wishlist data not found" });
      } else {
        res.status(200).json({ success: true, WishlistData: data });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "internal Server Error",
        errMessage: error.message,
      });
    }
  })

  .post(async (req, res) => {
    try {
      
      const wishlistProduct = req.body;
      console.log("wishlistProduct",wishlistProduct)
      const user = req.user;
      const newItem = new Wishlist({user: user._id, wishlistArray:[{_id:wishlistProduct.wishlistArray._id}]});
      const savedItem = await newItem.save();
      const data = await Wishlist.findOne({user: user._id}).populate("wishlistArray._id")
      console.log("data line 36 ", data)
      res.status(200).json({ success: true, WishlistData: data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to store data in database",
        errorMessage: error.message,
      });
    }
  });

router
  .route("/:wishlistId")
  .get(async (req, res) => {
    try {
      const {wishlistId} = req.params;
      console.log("wishlistId",wishlistId);
      const user = req.user;
      console.log(user._id)
      const data = await Wishlist.findOne({user: user._id}).populate("wishlistArray._id")
      console.log("line 56",data)
      if (!data) {
        res.status(400).json({
          success: false,
          message: "The wishlist data could not be found,",
        });
      }
      res.status(200).json({ success: true, WishlistData: data });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errorMessage: error.message,
      });
    }
  })

  .post(async (req, res) => {
    try {
      const { wishlistArray } = req.body;
      const {wishlistId} = req.params;
      console.log("line 77 wihslistArray and wishlistId", wishlistArray, wishlistId);
      const user = req.user;
      console.log("line 79", user)
      const data = await Wishlist.findOneAndUpdate({user: user._id}, {$addToSet: {wishlistArray: wishlistArray}})
      const savedData = await Wishlist.findOne({user: user._id}).populate("wishlistArray._id")
      console.log("savedData", savedData)
      res.status(200).json({success: true, WishlistData: savedData})
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errorMessage: error.message,
      });
    }
  });

router.route("/:wishlistId/:productId").delete(async (req, res) => {
  try {
    const { wishlistId, productId } = req.params;
    console.log("line 96", wishlistId, "productId->", productId)
    const user = req.user;
    console.log(user)
    const data = await Wishlist.findOneAndUpdate({user: user._id}, {$pull: {wishlistArray: {_id: productId}}})
    const savedData = await Wishlist.findOne({user: user._id}).populate("wishlistArray._id")
    console.log("line 101, savedData", savedData)
    res.status(200).json({ success: true, WishlistData: savedData });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      errorMessage: error.message,
    });
  }
});

module.exports = router;
