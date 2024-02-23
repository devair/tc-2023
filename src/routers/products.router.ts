import { Router } from 'express'
import { ProductsRepositoryPostgres } from '../adapters/repositories/postgres/ProductsRepositoryPostgres'
import { CategoriesRepositoryPostgres } from '../adapters/repositories/postgres/CategoriesRepositoryPostgres'
import { CreateProductController } from '../clean/communication/controller/products/CreateProductController'
import { FindByIdCategoryUseCase } from '../clean/core/useCase/categories/findByIdCategory/FindByIdCategoryUseCase'
import { ListProductsController } from '../clean/communication/controller/products/ListProductsController'
import { FindByIdProductController } from '../clean/communication/controller/products/FindByIdProductController'
import { EditProductController } from '../clean/communication/controller/products/EditProductController'
import { FindByIdProductUseCase } from '../clean/core/useCase/products/findByIdProduct/FindByIdProductUseCase'
import { DeleteProductController } from '../clean/communication/controller/products/DeleteProductController'
import { FindByNameProductController } from '../clean/communication/controller/products/FindByNameProductController'


const productsRouter = Router()

const productsRepository = new ProductsRepositoryPostgres()
const categoriesRepository = new CategoriesRepositoryPostgres()
const findByIdCategory = new FindByIdCategoryUseCase(categoriesRepository)
const findByIdProductUseCase = new FindByIdProductUseCase(productsRepository)

const createProductController = new CreateProductController(productsRepository, findByIdCategory)
const listProductsController = new ListProductsController(productsRepository)
const findByIdProductController = new FindByIdProductController(productsRepository)
const findByNameProductController = new FindByNameProductController(productsRepository)
const editProductController = new EditProductController(productsRepository, findByIdProductUseCase, findByIdCategory)
const deleteProductController = new DeleteProductController(productsRepository)

productsRouter.get('/search',findByNameProductController.handler.bind(findByNameProductController))

productsRouter.get('/:id', findByIdProductController.handler.bind(findByIdProductController))

productsRouter.delete('/:id', deleteProductController.handler.bind(deleteProductController))

productsRouter.get('/', listProductsController.handler.bind(listProductsController))

productsRouter.post('/', createProductController.handler.bind(createProductController))

productsRouter.put('/:id', editProductController.handler.bind(editProductController))

export { productsRouter }