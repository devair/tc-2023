import { Router } from 'express'
import { ProductsController } from '../adapters/driver/controllers/ProductsController'

const productsRouter = Router()

const productsController = new ProductsController()

productsRouter.get('/', productsController.list.bind(productsController))

productsRouter.post('/', productsController.create.bind(productsController))

productsRouter.get('/:id', productsController.findById.bind(productsController))


export { productsRouter }