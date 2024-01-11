import { Router } from "express";
import { categoriesRouter } from "@driver/routers/categories.router";
import { productsRouter } from "@driver/routers/products.router";
import { customersRouter } from "@driver/routers/customers.router";
import { ordersRouter } from "@driver/routers/orders.router";
import { paymentsRouter } from "@driver/routers/payments.router.";

const router = Router()

router.use('/categories', categoriesRouter)

router.use('/products', productsRouter)

router.use('/customers', customersRouter)

router.use('/orders', ordersRouter)

router.use('/payments', paymentsRouter)

export { router }
