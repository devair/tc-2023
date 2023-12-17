import { Router } from 'express'
import { CategoriesController } from '../adapters/driver/controllers/CategoriesController'
import { CategoriesService } from '../services/category/impl/CategoriesService'
import { CategoriesRepositoryInMemory } from '../adapters/repositories/in-memory/CategoriesRepositoryInMemory'
import { container } from 'tsyringe'

const categoriesRouter = Router()

const categoriesController = new CategoriesController()

categoriesRouter.get('/', categoriesController.list.bind(categoriesController))

categoriesRouter.post('/', categoriesController.create.bind(categoriesController))


export { categoriesRouter }