import "reflect-metadata"
import { CategoriesRepositoryInMemory } from "../CategoriesRepositoryInMemory"
import { CustomersRepositoryInMemory } from "../CustomersRepositoryInMemory"
import { OrdersRepositoryInMemory } from "../OrdersRepositoryInMemory"
import { PaymentsRepositoryInMemory } from "../PaymentsRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../ProductsRepositoryInMemory"
import { Order, OrderStatus } from "../../../../core/entity/Order"
import { OrderItem } from "../../../../core/entity/OrderItem"
import { Payment } from "../../../../core/entity/Payment"
import { IOrdersGateway } from "../../../../communication/gateway/repositories/IOrdersGateway"
import { ICategoriesGateway } from "../../../../communication/gateway/repositories/ICategoriesGateway"
import { ICustomersGateway } from "../../../../communication/gateway/repositories/ICustomersGateway"
import { IPaymentsGateway } from "../../../../communication/gateway/repositories/IPaymentsGateway"
import { IProductsGateway } from "../../../../communication/gateway/repositories/IProductsGateway"

let ordersRepository: IOrdersGateway
let customersRepository: ICustomersGateway
let productsRepository: IProductsGateway
let categoriesRepository: ICategoriesGateway
let paymentsRepository: IPaymentsGateway

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
            product: product,
            quantity: 2,
            unitPrice: 45.0
        })   

        const orderCreated = await ordersRepository.create(order)

        expect(orderCreated.amount).toBe(90)

        const orderFound = await ordersRepository.findById(orderCreated.id)

        let payment = new Payment(order, 90, new Date(), 'UNQ-1')

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