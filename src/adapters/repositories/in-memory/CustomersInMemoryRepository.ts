import { Customer } from "../../../domain/Customer";
import { ICustomersRepository } from "../../../ports/repositories/ICustomersRepository";

class CustomersInMemoryRepository implements ICustomersRepository{

    private customers: Customer[]

    constructor(){
        this.customers = []
    }

    async create(customer: Customer): Promise<Customer>  {
        
        this.customers.push(customer)

        return customer
    }

    async list(): Promise<Customer[]> {
        return this.customers
    }
    
    async findByCpf(cpf: string): Promise<Customer> {
        const customer = this.customers.find((customer)=> customer.cpf === cpf)
        
        return customer
    }

}

export { CustomersInMemoryRepository }