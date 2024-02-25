import { Repository } from "typeorm";
import { AppDataSource } from "../../../shared/infra/typeorm/index";
import { Customer } from "../../../clean/core/entity/Customer";
import { ICreateCustomerDTO } from "../../../clean/core/entity/dtos/ICreateCustomerDTO";
import { ICustomersRepository } from "../../../ports/repositories/ICustomersRepository";
import { CustomerEntity } from "../../../shared/infra/typeorm/entities/CustomerEntity";

class CustomersRepositoryPostgres implements ICustomersRepository {

    private repository: Repository<Customer>
    
    constructor(){
        this.repository = AppDataSource.getRepository(CustomerEntity)
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
        const customer = await this.repository.findOneBy( { cpf })
        return customer
    }
    
    async findById(id: number): Promise<Customer> {
        const customer = await this.repository.findOneBy( { id })
        return customer
    }

    async findByName(name: string): Promise<Customer[]> {
        const customers = await this.repository
        .createQueryBuilder('customer')
        .where('LOWER(name) LIKE :pattern', { pattern: `%${ name.toLowerCase() }%` })                                    
        .getMany()

        return customers
    }
}

export { CustomersRepositoryPostgres }