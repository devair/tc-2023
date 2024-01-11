import { Router } from "express"
import { OrdersController } from "../adapters/driver/controllers/OrdersController"


const ordersRouter = Router()

const ordersController = new OrdersController()

ordersRouter.post('/', ordersController.create.bind(ordersController))

ordersRouter.get('/', ordersController.list.bind(ordersController))

ordersRouter.get('/:id', ordersController.findById.bind(ordersController))

ordersRouter.patch('/:id/status', ordersController.updateStatus.bind(ordersController))

export { ordersRouter }