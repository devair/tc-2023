import { Router } from 'express'
import { PaymentsController } from '../adapters/driver/controllers/PaymentsController'


const paymentsRouter = Router()

const paymentsController = new PaymentsController()

paymentsRouter.get('/:id', paymentsController.findById.bind(paymentsController))

paymentsRouter.get('/', paymentsController.list.bind(paymentsController))

paymentsRouter.post('/', paymentsController.create.bind(paymentsController))



export { paymentsRouter }