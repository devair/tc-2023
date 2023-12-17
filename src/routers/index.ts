import { Router } from "express";
import { categoriesRouter } from "./categories.router";
import { productsRouter } from "./products.router";
import { customersRouter } from "./customers.router";

const router = Router()

router.use('/categories', categoriesRouter)

router.use('/products', productsRouter)

router.use('/customers', customersRouter)

export { router }
