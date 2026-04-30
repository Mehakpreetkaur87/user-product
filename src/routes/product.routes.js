import { Router } from "express";
import { isAdmin } from "../shared/middleware/user.middleware.js";
import { checkAuth } from "../shared/middleware/auth.middleware.js";
import { getProducts, createProduct, deleteProduct } from "../contollers/product.controller.js";


import { responseProcessor } from "../shared/responseProcessor.js";
const router = Router();

// GET → public
router.get("/products", responseProcessor(getProducts));

// POST → admin only
router.post(
  "/products",
  checkAuth,
  isAdmin,
  responseProcessor(createProduct)
);

// DELETE → admin only
router.delete(
  "/products/:id",
  checkAuth,
  isAdmin,
  responseProcessor(deleteProduct)
);

export { router as productRoutes };