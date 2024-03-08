import { ICustomersGateway } from "../../gateway/ICustomersGateway";
import { CreateCustomerUseCase } from "../../../core/useCase/customers/createCustomer/CreateCustomerUseCase";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "../../../core/useCase/customers/createCustomer/ICreateCustomerDTO";

class CreateCustomerController {

    constructor(private customersRepository: ICustomersGateway){}

    async handler({ name, email, cpf, phone }: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {

        const createCustomerUseCase = new CreateCustomerUseCase(this.customersRepository)
        
        return await createCustomerUseCase.execute({ name, email, cpf, phone })
    }
}

export { CreateCustomerController }