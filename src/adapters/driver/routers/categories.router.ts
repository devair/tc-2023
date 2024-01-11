import { Router } from 'express'
import { CategoriesController } from '@driver/controllers/CategoriesController'

const categoriesRouter = Router()

const categoriesController = new CategoriesController()

categoriesRouter.get('/search',categoriesController.search.bind(categoriesController))

categoriesRouter.get('/:id', categoriesController.findById.bind(categoriesController))

categoriesRouter.get('/', categoriesController.list.bind(categoriesController))

categoriesRouter.post('/', categoriesController.create.bind(categoriesController))

categoriesRouter.put('/:id', categoriesController.update.bind(categoriesController))


export { categoriesRouter }