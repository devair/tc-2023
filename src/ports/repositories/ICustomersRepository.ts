import { Customer } from '../../domain/Customer'

interface ICustomersRepository {

    create(customer: Customer): Promise<Customer>

    list(): Promise<Customer[]>

    findByCpf(cpf: string): Promise<Customer>

}

export { ICustomersRepository }