import { Router } from 'express'
import { CategoriesController } from '../adapters/driver/controllers/CategoriesController'

const categoriesRouter = Router()

const categoriesController = new CategoriesController()

categoriesRouter.get('/', categoriesController.list.bind(categoriesController))

categoriesRouter.post('/', categoriesController.create.bind(categoriesController))

categoriesRouter.get('/:id', categoriesController.findById.bind(categoriesController))


export { categoriesRouter }