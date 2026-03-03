const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// CREATE Cart
router.post("/", async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ All Carts
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate("user")
      .populate("items.product");
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ One Cart
router.get("/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate("user")
      .populate("items.product");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE Cart
router.put("/:id", async (req, res) => {
  try {
    const updated = await Cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE Cart
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Cart deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
