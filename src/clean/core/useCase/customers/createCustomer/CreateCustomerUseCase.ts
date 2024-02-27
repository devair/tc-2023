import { ICustomersGateway } from "../../../../communication/gateway/repositories/ICustomersGateway";
import { Customer } from "../../../entity/Customer";
import { ICreateCustomerDTO } from "../../../entity/dtos/ICreateCustomerDTO";

class CreateCustomerUseCase {
    
    constructor(private customersRepository: ICustomersGateway){}

    async execute({ name, email, cpf, phone }: ICreateCustomerDTO): Promise<Customer> {

        const customerAlreadyExists = await this.customersRepository.findByCpf(cpf)

        if (customerAlreadyExists) {
            throw new Error(`Customer's cpf ${cpf} already exists`)
        }

        const customer = { name, cpf, email, phone }

        return await this.customersRepository.create(customer)
    }       
}

export { CreateCustomerUseCase }