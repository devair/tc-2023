import { Router } from "express";
import { categoriesRouter } from "./categories.router";



const router = Router()

router.use('/categories', categoriesRouter)

export { router }
