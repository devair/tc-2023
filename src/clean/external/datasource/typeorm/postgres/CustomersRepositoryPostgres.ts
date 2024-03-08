import { Repository } from "typeorm";
import { Customer } from "../../../../core/entity/Customer";
import { ICustomersGateway } from "../../../../communication/gateway/ICustomersGateway";
import { CustomerEntity } from "../entities/CustomerEntity";
import { InputCreateCustomerDTO } from "../../../../core/useCase/customers/createCustomer/ICreateCustomerDTO";
import { AppDataSource } from "..";

class CustomersRepositoryPostgres implements ICustomersGateway {

    private repository: Repository<Customer>
    
    constructor(){
        this.repository = AppDataSource.getRepository(CustomerEntity)
    }

    async create({ name, email, cpf, phone }: InputCreateCustomerDTO): Promise<Customer> {
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
        const customer = await this.repository.findOne( { where: { cpf }} )
        return customer
    }
    
    async findById(id: number): Promise<Customer> {
        const customer = await this.repository.findOne( { where: { id }})
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