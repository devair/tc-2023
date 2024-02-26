import { CategoriesRepositoryInMemory } from "../../../../../external/datasource/in-memory/CategoriesRepositoryInMemory"
import { CustomersRepositoryInMemory } from "../../../../../external/datasource/in-memory/CustomersRepositoryInMemory"
import { OrderItemsRepositoryInMemory } from "../../../../../external/datasource/in-memory/OrderItemsRepositoryInMemory"
import { OrdersRepositoryInMemory } from "../../../../../external/datasource/in-memory/OrdersRepositoryInMemory"
import { PaymentsRepositoryInMemory } from "../../../../../external/datasource/in-memory/PaymentsRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../../../external/datasource/in-memory/ProductsRepositoryInMemory"
import { CreateCategoryUseCase } from "../../../categories/createCategory/CreateCategoryUseCase"
import { CreateCustomerUseCase } from "../../../customers/createCustomer/CreateCustomerUseCase"
import { FindByCpfCustomerUseCase } from "../../../customers/findByCpfCustomer/FindByCpfCustomerUseCase"
import { CreateOrderUseCase } from "../../../orders/createOrderUseCase/CreateOrderUseCase"
import { CreateProductUseCase } from "../../../products/createProduct/CreateProductUseCase"
import { FindByCodeProductUseCase } from "../../../products/findByCodeProduct/FindByCodeProductUseCase"
import { CreatePaymentUseCase } from "../../createPayment/CreatePaymentUseCase"
import { ListPaymentsUseCase } from "../ListPaymentsUseCase"

let createCategoryUseCase: CreateCategoryUseCase
let createProductUseCase: CreateProductUseCase
let createCustomerUseCase: CreateCustomerUseCase
let findByCpfCustomerUseCase: FindByCpfCustomerUseCase
let findByCodeProductUseCase: FindByCodeProductUseCase
let createOrderUseCase: CreateOrderUseCase
let createPaymentUseCase: CreatePaymentUseCase
let listPaymentsUseCase : ListPaymentsUseCase

describe('Payments tests', () => {
    beforeAll(async ()=>{
        
        const categoriesRepository = new CategoriesRepositoryInMemory()
        const customersRepository = new CustomersRepositoryInMemory()
        const productsRepository = new ProductsRepositoryInMemory(categoriesRepository)
        const ordersRepository = new OrdersRepositoryInMemory()
        const orderItemsRepository = new OrderItemsRepositoryInMemory()
        const paymentsRepository = new PaymentsRepositoryInMemory()

        createPaymentUseCase = new CreatePaymentUseCase(paymentsRepository,ordersRepository)
        
        findByCpfCustomerUseCase = new FindByCpfCustomerUseCase(customersRepository)
        findByCodeProductUseCase = new FindByCodeProductUseCase(productsRepository)
        listPaymentsUseCase = new ListPaymentsUseCase(paymentsRepository)
        
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
        createCustomerUseCase = new CreateCustomerUseCase(customersRepository)
        createProductUseCase = new CreateProductUseCase(productsRepository, categoriesRepository)

        createOrderUseCase = new CreateOrderUseCase(ordersRepository,orderItemsRepository, 
            customersRepository, productsRepository )

        // creating a category
        const category = { name: 'Bebida', description: 'Bebida gelada' }
        const categoryCreated = await createCategoryUseCase.execute(category)

        // creating a product    
        await createProductUseCase.execute({
            name: 'produto1', code: '1', description: 'teste',
            price: 1, categoryId: categoryCreated.id, image: ''
        })


        // creating a customer
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br' }
        await createCustomerUseCase.execute(customer)

    })

    it('Should be able to list payments', async () => {
        const product = await findByCodeProductUseCase.execute('1')
        const customer = await findByCpfCustomerUseCase.execute('35712606607')
        const orderItems = []

        orderItems.push({
            product: product,
            quantity: 2,
            unitPrice: 45.0
        })

        const orderCreated = await createOrderUseCase.execute({ customer, orderItems })

        expect(orderCreated.amount).toBe(90)
        expect(orderCreated).toHaveProperty('id')

        let payment = {            
            orderId: orderCreated.id,
            paymentUniqueNumber: 'UNQ-1',
            paymentDate: new Date(),
            amount: orderCreated.amount
        }

        await createPaymentUseCase.execute(payment)
    
        const payments = await listPaymentsUseCase.execute()

        expect(payments.length).toBeGreaterThanOrEqual(1)
    })
})