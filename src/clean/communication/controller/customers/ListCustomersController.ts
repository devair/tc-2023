import { ICustomersGateway } from "../../gateway/ICustomersGateway";
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