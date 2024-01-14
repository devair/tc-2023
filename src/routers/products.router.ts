import { Router } from 'express'
import { ProductsController } from '../adapters/driver/controllers/ProductsController'

const productsRouter = Router()

const productsController = new ProductsController()

productsRouter.get('/search',productsController.search.bind(productsController))

productsRouter.get('/category',productsController.findByCategory.bind(productsController))

productsRouter.get('/:id', productsController.findById.bind(productsController))

productsRouter.delete('/:id', productsController.delete.bind(productsController))

productsRouter.get('/', productsController.list.bind(productsController))

productsRouter.post('/', productsController.create.bind(productsController))

productsRouter.put('/:id', productsController.update.bind(productsController))

export { productsRouter }