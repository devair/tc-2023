import "reflect-metadata"
import { CategoriesRepositoryInMemory } from "../CategoriesRepositoryInMemory"
import { CustomersRepositoryInMemory } from "../CustomersRepositoryInMemory"
import { OrdersRepositoryInMemory } from "../OrdersRepositoryInMemory"
import { PaymentsRepositoryInMemory } from "../PaymentsRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../ProductsRepositoryInMemory"
import { Order, OrderStatus } from "../../../../domain/Order"
import { OrderItem } from "../../../../domain/OrderItem"
import { Payment } from "../../../../domain/Payment"
import { IOrdersRepository } from "../../../../ports/repositories/IOrdersRepository"
import { ICategoriesRepository } from "../../../../ports/repositories/ICategoriesRepository"
import { ICustomersRepository } from "../../../../ports/repositories/ICustomersRepository"
import { IPaymentsRepository } from "../../../../ports/repositories/IPaymentsRepository"
import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository"

let ordersRepository: IOrdersRepository
let customersRepository: ICustomersRepository
let productsRepository: IProductsRepository
let categoriesRepository: ICategoriesRepository
let paymentsRepository: IPaymentsRepository

describe('Payments tests', () => {
    beforeAll(async ()=>{
        
        customersRepository = new CustomersRepositoryInMemory()
        productsRepository = new ProductsRepositoryInMemory()
        categoriesRepository = new CategoriesRepositoryInMemory()
        ordersRepository = new OrdersRepositoryInMemory()
        paymentsRepository = new PaymentsRepositoryInMemory()

        // creating a category
        const category = { name: 'Bebida', description: 'Bebida gelada' }

        await categoriesRepository.create(category)

        const categoryCreated = await categoriesRepository.findByName(category.name)

        // creating a product    
        const product = {
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: categoryCreated.id, image: ''
        }

        productsRepository.create(product)

        // creating a customer
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br' }

        await customersRepository.create(customer)
    })

    it('Should be able to create a new payment for an order', async () => {
        const product = productsRepository.findByCode('1')
        const customer = customersRepository.findByCpf('35712606607')

        const orderItem1 = new OrderItem()
        Object.assign(orderItem1, {
            product: product,
            quantity: 2,
            unitPrice: 45.0
        })

        const order = new Order()
        Object.assign(order, {
            customer: customer,
            orderItems: [orderItem1]
        })

        const orderCreated = await ordersRepository.create(order)

        expect(orderCreated).toHaveProperty('id')

        let payment = new Payment()

        Object.assign(payment, {
            order,
            paymentUniqueNumber: 'UNQ-1',
            paymentDate: new Date(),
            amount: 90
        })

        const paymentCreated = await paymentsRepository.create(payment)
        
        expect(paymentCreated).toHaveProperty('id')

        order.status = OrderStatus.RECEIVED

        const orderUpdatedStatus = await ordersRepository.updateStatus(order)

        expect(orderUpdatedStatus.status).toBe(OrderStatus.RECEIVED)

        const payments = await paymentsRepository.list()

        expect(payments.length).toBeGreaterThanOrEqual(1)

        const paymentFound = await paymentsRepository.findById(paymentCreated.id)

        expect(paymentFound).toHaveProperty('id')


    })
})