import "reflect-metadata"
import { CustomersRepositoryInMemory } from "../../../adapters/repositories/in-memory/CustomersRepositoryInMemory"
import { ICustomersService } from "../ICustomersService"
import { CustomersService } from "../impl/CustomersService"

let customersService: ICustomersService

describe('Customers Service tests',()=>{

    beforeAll(()=>{
        customersService = new CustomersService(new CustomersRepositoryInMemory())
    })

    it('Should be able to create a new customer', async ()=>{
        const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br'}

        await customersService.create(customer)

        const customerCreated = await customersService.findByCpf(customer.cpf)

        expect(customerCreated).toHaveProperty('id')

    })

    it('Should be able to list customers', async ()=>{
        
        const customers = await customersService.list()
        
        expect(customers).toHaveLength(1)
    }) 

    it('Should not be able to duplicated a customer', async ()=>{

        expect(async ()=>{            
            const customer = { name: 'Fulano', cpf: '35712606607', phone: '4799999999', email: 'fulano@silva.com.br'}

            await customersService.create(customer)    

        }).rejects.toBeInstanceOf(Error)

    })

    
    it('Should be able to find a customer by id', async ()=>{
        
        const customer = await customersService.findById(1)

        expect(customer).toHaveProperty('id')

    })

    it('Should be able to find a customer by name', async ()=>{
        
        const customers = await customersService.findByName('Fulano')

        expect(customers.length).toBeGreaterThanOrEqual(1)

    })

    it('Should not be able to find a customer by cpf', async ()=>{

        expect(async ()=>{            
            await customersService.findByCpf('40016112016')
        }).rejects.toBeInstanceOf(Error)

    })

    it('Should not be able to find a customer by id', async ()=>{

        expect(async ()=>{            
            await customersService.findById(99)
        }).rejects.toBeInstanceOf(Error)

    })

    it('Should not be able to find a customer by id', async ()=>{

        const customers = await customersService.findByName('PPP')

        expect(customers.length).toBe(0)
    })

})