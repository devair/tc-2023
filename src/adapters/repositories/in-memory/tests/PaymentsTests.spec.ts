import "reflect-metadata"
import { CategoriesRepositoryInMemory } from "../CategoriesRepositoryInMemory"
import { CustomersRepositoryInMemory } from "../CustomersRepositoryInMemory"
import { OrdersRepositoryInMemory } from "../OrdersRepositoryInMemory"
import { PaymentsRepositoryInMemory } from "../PaymentsRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../ProductsRepositoryInMemory"
import { Order, OrderStatus } from "../../../../clean/core/entity/Order"
import { OrderItem } from "../../../../clean/core/entity/OrderItem"
import { Payment } from "../../../../clean/core/entity/Payment"
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
        categoriesRepository = new CategoriesRepositoryInMemory()
        productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
        ordersRepository = new OrdersRepositoryInMemory()
        paymentsRepository = new PaymentsRepositoryInMemory()

        // creating a category
        const category = await categoriesRepository.create({ name: 'Bebida', description: 'Bebida gelada' })       

        // creating a product    
        const product = {
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        }

        productsRepository.create(product)

        // creating a customer
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br' }

        await customersRepository.create(customer)
    })

    it('Should be able to create a new payment for an order', async () => {
        const product = await productsRepository.findByCode('1')
        const customer = await customersRepository.findByCpf('35712606607')

        const order = Order.place(customer) 
        order.addItem({
            order,
            product: product,
            quantity: 2,
            unitPrice: 45.0
        })   

        const orderCreated = await ordersRepository.create(order)

        expect(orderCreated.amount).toBe(90)

        const orderFound = await ordersRepository.findById(orderCreated.id)

        

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