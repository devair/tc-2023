import { ICustomersGateway } from "../../gateway/repositories/ICustomersGateway";
import { Customer } from "../../../core/entity/Customer";
import { ListCustomersUseCase } from "../../../core/useCase/customers/listCustomers/ListCustomersUseCase";
import { OutputFindCustomerDTO } from "../../../core/useCase/customers/findByIdCustomer/IFindCustomerDTO";

class ListCustomersController{

    constructor(private customersRepository: ICustomersGateway){}

    async handler(): Promise<OutputFindCustomerDTO[]>{

        const listCustomersUseCase = new ListCustomersUseCase(this.customersRepository)

        return await listCustomersUseCase.execute()
    }

}

export { ListCustomersController }