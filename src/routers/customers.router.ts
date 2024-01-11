
import { Router } from 'express'
import { CustomersController } from '../adapters/driver/controllers/CustomersController'

const customersRouter = Router()

const customersController = new CustomersController()

customersRouter.get('/search',customersController.search.bind(customersController))

customersRouter.get('/:id', customersController.findById.bind(customersController))

customersRouter.get('/', customersController.list.bind(customersController))

customersRouter.post('/', customersController.create.bind(customersController))

export { customersRouter }