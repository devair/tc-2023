import { Router } from "express";
import { categoriesRouter } from "./categories.router";
import { productsRouter } from "./products.router";

const router = Router()

router.use('/categories', categoriesRouter)

router.use('/products', productsRouter)

export { router }
