import { Customer } from "../../domain/Customer"

interface ICustomersService {

    create({ name, cpf, email, phone }): Promise<Customer>

    list(): Promise<Customer[]>

    findByCpf(cpf: string): Promise<Customer>
}

export { ICustomersService }