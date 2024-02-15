import { Customer } from "../../clean/core/entity/Customer"
import { ICreateCustomerDTO } from "../../clean/core/entity/dtos/ICreateCustomerDTO"

interface ICustomersService {

    create({ name, email, cpf, phone }: ICreateCustomerDTO ): Promise<Customer>

    list(): Promise<Customer[]>

    findByCpf(cpf: string): Promise<Customer>

    findById(id: number): Promise<Customer>

    findByName(name: string): Promise<Customer[]>
}

export { ICustomersService }