import { Customer } from "../../../domain/Customer";
import { ICustomersRepository } from "../../../ports/repositories/ICustomersRepository";
import { ICustomersService } from "../ICustomersService";

class CustomersService implements ICustomersService {

    constructor(private repository: ICustomersRepository){}

    async create({ name, cpf, email, phone }: { name: any; cpf: any; email: any; phone: any; }): Promise<Customer> {
        
        const customerAlreadyExists = await this.repository.findByCpf(cpf)

        if(customerAlreadyExists){
            throw new Error(`Customer's cpf ${cpf} already exists`)
        }

        const customer = new Customer()

        Object.assign(customer, {
            name,
            cpf,
            email,
            phone
        })

        return await this.repository.create(customer)

    }
    
    async list(): Promise<Customer[]> {
        return await this.repository.list()
    }

    async findByCpf(cpf: string): Promise<Customer> {
        
        return await this.repository.findByCpf(cpf)
    }

}

export { CustomersService }