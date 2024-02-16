import { CustomersRepositoryInMemory } from "../../../../../../adapters/repositories/in-memory/CustomersRepositoryInMemory"
import { CreateCustomerUseCase } from "../../createCustomer/CreateCustomerUseCase"
import { ListCustomersUseCase } from "../ListCustomersUseCase"

let listCustomersUseCase : ListCustomersUseCase
let createCustomerUseCase : CreateCustomerUseCase

describe('Customers Use Case tests', ()=>{

    beforeEach(()=>{
        const customersRepository = new CustomersRepositoryInMemory()
        createCustomerUseCase = new CreateCustomerUseCase(customersRepository)
        listCustomersUseCase = new ListCustomersUseCase(customersRepository)

    })

    it('Should be able to list customers', async ()=>{
        const customer = await createCustomerUseCase.execute({ name: 'Fulano', cpf: '35712606607', 
        phone: '4799999999', email: 'fulano@silva.com.br'})

        expect(customer).toHaveProperty('id')

        const customers = await listCustomersUseCase.execute()
        
        expect(customers).toHaveLength(1)
    })

})