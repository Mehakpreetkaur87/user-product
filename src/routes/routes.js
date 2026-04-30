import {Router} from "express";
import { productRoutes } from "./product.routes.js";
import { userRoutes } from "./user.routes.js";
import {authRoutes} from "./auth.router.js";

const routes = Router();

routes.use(productRoutes)
routes.use(userRoutes)
routes.use("/auth", authRoutes);



export {routes};