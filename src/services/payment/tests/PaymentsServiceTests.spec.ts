import "reflect-metadata"
import { CategoriesRepositoryInMemory } from "../../../clean/external/datasource/in-memory/CategoriesRepositoryInMemory"
import { CustomersRepositoryInMemory } from "../../../clean/external/datasource/in-memory/CustomersRepositoryInMemory"
import { OrdersRepositoryInMemory } from "../../../clean/external/datasource/in-memory/OrdersRepositoryInMemory"
import { PaymentsRepositoryInMemory } from "../../../clean/external/datasource/in-memory/PaymentsRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../clean/external/datasource/in-memory/ProductsRepositoryInMemory"
import { OrderStatus } from "../../../clean/core/entity/Order"
import { ICategoriesService } from "../../category/ICategoriesService"
import { CategoriesService } from "../../category/impl/CategoriesService"
import { ICustomersService } from "../../customer/ICustomersService"
import { IOrdersService } from "../../order/IOrdersService"
import { OrdersService } from "../../order/impl/OrdersService"
import { IProductsService } from "../../product/IProductsService"
import { ProductsService } from "../../product/impl/ProductsService"
import { IPaymentsService } from "../IPaymentsService"
import { PaymentsService } from "../impl/PaymentsService"
import { OrderItemsRepositoryInMemory } from "../../../clean/external/datasource/in-memory/OrderItemsRepositoryInMemory"

let ordersService: IOrdersService
let customersService: ICustomersService
let productsService: IProductsService
let categoriesService: ICategoriesService
let paymentsService: IPaymentsService

describe('Payments tests', () => {
    beforeAll(async ()=>{
        
        const categoriesRepository = new CategoriesRepositoryInMemory()

        customersService = new CustomersRepositoryInMemory()
        categoriesService = new CategoriesService(categoriesRepository)
        productsService = new ProductsService(new ProductsRepositoryInMemory(categoriesRepository), categoriesService)
        ordersService = new OrdersService(new OrdersRepositoryInMemory(),
            customersService,productsService, new OrderItemsRepositoryInMemory())
        paymentsService = new PaymentsService(new PaymentsRepositoryInMemory(), ordersService)

        // creating a category
        const category = await categoriesService.create({ name: 'Bebida', description: 'Bebida gelada' })
        
        // creating a product    
        const product = {
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: category.id, image: ''
        }
        productsService.create(product)

        // creating a customer
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br' }

        await customersService.create(customer)
    })

    it('Should be able to create a new payment for an order', async () => {
        const product = await productsService.findByCode('1')
        const customer = await customersService.findByCpf('35712606607')
        const orderItems = []

        orderItems.push( {
            product: product,
            quantity: 2,
            unitPrice: 45.0
        })
                
        const orderCreated = await ordersService.create({ customer, orderItems})    
        expect(orderCreated).toHaveProperty('id')

        let payment = {            
            orderId: orderCreated.id,
            paymentUniqueNumber: 'UNQ-1',
            paymentDate: new Date(),
            amount: orderCreated.amount
        }

        const paymentCreated = await paymentsService.create(payment)
        
        expect(paymentCreated).toHaveProperty('id')

        orderCreated.status = OrderStatus.RECEIVED

        const orderUpdatedStatus = await ordersService.updateStatus({id: orderCreated.id, status: OrderStatus.RECEIVED})

        expect(orderUpdatedStatus.status).toBe(OrderStatus.RECEIVED)

        
        const paymentFound = await paymentsService.findById(paymentCreated.id)

        expect(paymentFound).not.toBeUndefined()


    })

    it('Should not be able to find a payment', async ()=>{

        expect(async ()=>{    
            
            await paymentsService.findById(123)

        }).rejects.toBeInstanceOf(Error)

    })

    it('Should be able to list payments', async () => {

        const payments = await paymentsService.list()

        expect(payments.length).toBeGreaterThanOrEqual(1)
    })
})