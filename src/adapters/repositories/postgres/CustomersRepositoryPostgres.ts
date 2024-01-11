import { Repository, getRepository } from "typeorm";
import { Customer } from "@domain/Customer";
import { ICreateCustomerDTO } from "@domain/dtos/ICreateCustomerDTO";
import { ICustomersRepository } from "@ports/repositories/ICustomersRepository";
import { CustomerEntity } from "@driven/infra/typeorm/entities/CustomerEntity";

class CustomersRepositoryPostgres implements ICustomersRepository {

    private repository: Repository<Customer>
    
    constructor(){
        this.repository = getRepository(CustomerEntity)
    }

    async create({ name, email, cpf, phone }: ICreateCustomerDTO): Promise<Customer> {
        const customer = this.repository.create({
            name, email, cpf, phone
        });

        const customerCreated = await this.repository.save(customer)

        return customerCreated
    }

    async list(): Promise<Customer[]> {
        const all = await this.repository.find()

        return all
    }

    async findByCpf(cpf: string): Promise<Customer> {
        const customer = await this.repository.findOne( { cpf })
        return customer
    }
    
    async findById(id: number): Promise<Customer> {
        const customer = await this.repository.findOne( { id })
        return customer
    }

}

export { CustomersRepositoryPostgres }