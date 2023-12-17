import { inject } from "tsyringe";
import { Customer } from "../../../domain/Customer";
import { ICreateCustomerDTO } from "../../../domain/dtos/ICreateCustomerDTO";
import { ICustomersRepository } from "../../../ports/repositories/ICustomersRepository";
import { ICustomersService } from "../ICustomersService";

class CustomersService implements ICustomersService {

    constructor(
        @inject('CustomersRepository')
        private repository: ICustomersRepository) { }

    async create({ name, email, cpf, phone }: ICreateCustomerDTO): Promise<Customer> {

        const customerAlreadyExists = await this.repository.findByCpf(cpf)

        if (customerAlreadyExists) {
            throw new Error(`Customer's cpf ${cpf} already exists`)
        }

        const customer = { name, cpf, email, phone }

        return await this.repository.create(customer)

    }

    async list(): Promise<Customer[]> {
        return await this.repository.list()
    }

    async findByCpf(cpf: string): Promise<Customer> {
        const customer = await this.repository.findByCpf(cpf)

        if(!customer){
            throw new Error(`Customer's ${cpf} not found`)
        }

        return customer
    }

    async findById(id: number): Promise<Customer> {

        const customer = await this.repository.findById(id)

        if(!customer){
            throw new Error(`Customer ${id} not found`)
        }

        return customer
    }

}

export { CustomersService }