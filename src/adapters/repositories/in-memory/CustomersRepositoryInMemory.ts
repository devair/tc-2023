import { Customer } from "../../../domain/Customer";
import { ICreateCustomerDTO } from "../../../domain/dtos/ICreateCustomerDTO";
import { ICustomersRepository } from "../../../ports/repositories/ICustomersRepository";

class CustomersRepositoryInMemory implements ICustomersRepository{

    private customers: Customer[]

    constructor(){
        this.customers = []
    }

    async create({ name, email, cpf, phone }: ICreateCustomerDTO ): Promise<Customer>  {
        const customer = new Customer()

        Object.assign(customer, { name, email, cpf, phone } )
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

export { CustomersRepositoryInMemory }