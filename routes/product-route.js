const express = require("express");
const productControllers = require("../controllers/product-controller");

const router = express.Router();

router.get("/", productControllers.getAllProducts);
router.get("/:id", productControllers.getProduct);
router.post("/", productControllers.createProduct);
router.put("/:id", productControllers.updateProduct);
router.delete("/:id", productControllers.deleteProduct);

module.exports = router;
