import { Customer } from '../../domain/Customer'
import { ICreateCustomerDTO } from '../../domain/dtos/ICreateCustomerDTO'

interface ICustomersRepository {

    create({ name, email, cpf, phone }: ICreateCustomerDTO ): Promise<Customer>

    list(): Promise<Customer[]>

    findByCpf(cpf: string): Promise<Customer>
    
    findById(id: number): Promise<Customer>    

}

export { ICustomersRepository }