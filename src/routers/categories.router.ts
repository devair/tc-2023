import { Router } from 'express'
import { CreateCategoryController } from '../clean/communication/controller/categories/CreateCategoryController'
import { CategoriesRepositoryPostgres } from '../adapters/repositories/postgres/CategoriesRepositoryPostgres'
import { FindByIdCategoryController } from '../clean/communication/controller/categories/FindByIdCategoryController'
import { ListCategoriesController } from '../clean/communication/controller/categories/ListCategoriesController'
import { EditCategoryController } from '../clean/communication/controller/categories/EditCategoryController'
import { FindByNameCategoryController } from '../clean/communication/controller/categories/FindByNameCategoryController'

const categoriesRouter = Router()

const categoriesRepository = new CategoriesRepositoryPostgres()

const createCategoryController = new CreateCategoryController(categoriesRepository)

const findByCategoryController = new FindByIdCategoryController(categoriesRepository)

const listCategoriesController = new ListCategoriesController(categoriesRepository)

const editCategoryController = new EditCategoryController(categoriesRepository)

const findByNameCategoryController = new FindByNameCategoryController(categoriesRepository)

categoriesRouter.post('/', createCategoryController.handler.bind(createCategoryController))

categoriesRouter.put('/:id', editCategoryController.handler.bind(editCategoryController))

categoriesRouter.get('/search', findByNameCategoryController.handler.bind(findByNameCategoryController))

categoriesRouter.get('/:id', findByCategoryController.handler.bind(findByCategoryController))

categoriesRouter.get('/', listCategoriesController.handler.bind(listCategoriesController))




export { categoriesRouter }