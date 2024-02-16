import { CustomersRepositoryInMemory } from "../../../../../../adapters/repositories/in-memory/CustomersRepositoryInMemory"
import { CreateCustomerUseCase } from "../CreateCustomerUseCase"

let createCustomerUseCase: CreateCustomerUseCase

describe('Customers Use Case tests',()=>{

    beforeEach(()=>{
        const customersRepository = new CustomersRepositoryInMemory()
        createCustomerUseCase = new CreateCustomerUseCase(customersRepository)
    })

    it('Should be able to create a new customer', async ()=>{
       
        const customer = await createCustomerUseCase.execute({ name: 'Fulano', cpf: '35712606607', 
        phone: '4799999999', email: 'fulano@silva.com.br'})

        expect(customer).toHaveProperty('id')

    })

    it('Should not be able to duplicated a customer', async ()=>{

        expect(async ()=>{            

            const customer1 = await createCustomerUseCase.execute({ name: 'Fulano', cpf: '35712606607', 
            phone: '4799999999', email: 'fulano@silva.com.br'})

            await createCustomerUseCase.execute({ name: 'Ciclano', cpf: '35712606607', 
            phone: '4799999999', email: 'Ciclano@silva.com.br'})


        }).rejects.toBeInstanceOf(Error)

    })

})