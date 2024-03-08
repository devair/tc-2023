import { Customer } from '../../core/entity/Customer'
import { InputCreateCustomerDTO } from '../../core/useCase/customers/createCustomer/ICreateCustomerDTO'

interface ICustomersGateway {

    create({ name, email, cpf, phone }: InputCreateCustomerDTO ): Promise<Customer>

    list(): Promise<Customer[]>

    findByCpf(cpf: string): Promise<Customer>
    
    findById(id: number): Promise<Customer>    

    findByName(name: string): Promise<Customer[]>
}

export { ICustomersGateway }