
import { Router } from 'express'
import { CustomersRepositoryPostgres } from '../adapters/repositories/postgres/CustomersRepositoryPostgres'
import { CreateCustomerController } from '../clean/communication/controller/customers/CreateCustomerController'
import { FindByIdCustomerController } from '../clean/communication/controller/customers/FindByIdCustomerController'
import { ListCustomersController } from '../clean/communication/controller/customers/ListCustomersController'
import { SearchCustomersController } from '../clean/communication/controller/customers/SearchCustomersController'

const customersRouter = Router()
const customersRespository = new CustomersRepositoryPostgres()
const createCustomerController = new CreateCustomerController(customersRespository)
const findByIdCustomersController = new FindByIdCustomerController(customersRespository)
const listCustomersController = new ListCustomersController(customersRespository)
const searchCustomersController = new SearchCustomersController(customersRespository)

customersRouter.get('/search',searchCustomersController.handler.bind(searchCustomersController))
customersRouter.get('/:id', findByIdCustomersController.handler.bind(findByIdCustomersController))
customersRouter.get('/', listCustomersController.handler.bind(listCustomersController))
customersRouter.post('/', createCustomerController.handler.bind(createCustomerController))

export { customersRouter }