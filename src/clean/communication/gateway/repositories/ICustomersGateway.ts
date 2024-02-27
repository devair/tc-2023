import { Customer } from '../../../core/entity/Customer'
import { ICreateCustomerDTO } from '../../../core/entity/dtos/ICreateCustomerDTO'

interface ICustomersGateway {

    create({ name, email, cpf, phone }: ICreateCustomerDTO ): Promise<Customer>

    list(): Promise<Customer[]>

    findByCpf(cpf: string): Promise<Customer>
    
    findById(id: number): Promise<Customer>    

    findByName(name: string): Promise<Customer[]>
}

export { ICustomersGateway }