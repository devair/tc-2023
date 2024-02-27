import { ICustomersGateway } from "../../gateway/repositories/ICustomersGateway";
import { Customer } from "../../../core/entity/Customer";
import { ICreateCustomerDTO } from "../../../core/entity/dtos/ICreateCustomerDTO";
import { CreateCustomerUseCase } from "../../../core/useCase/customers/createCustomer/CreateCustomerUseCase";

class CreateCustomerController {

    constructor(private customersRepository: ICustomersGateway){}

    async handler({ name, email, cpf, phone }: ICreateCustomerDTO): Promise<Customer> {

        const createCustomerUseCase = new CreateCustomerUseCase(this.customersRepository)
        
        return await createCustomerUseCase.execute({ name, email, cpf, phone })
    }
}

export { CreateCustomerController }