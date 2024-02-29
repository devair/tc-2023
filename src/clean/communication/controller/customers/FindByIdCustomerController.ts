import { ICustomersGateway } from "../../gateway/repositories/ICustomersGateway";
import { Customer } from "../../../core/entity/Customer";
import { FindByIdCustomerUseCase } from "../../../core/useCase/customers/findByIdCustomer/FindByIdCustomerUseCase";
import { OutputFindCustomerDTO } from "../../../core/useCase/customers/findByIdCustomer/IFindCustomerDTO";

class FindByIdCustomerController{

    constructor(private customersRepository: ICustomersGateway){}

    async handler(id: number): Promise<OutputFindCustomerDTO>{
        
        const findByIdCustomerUseCase = new FindByIdCustomerUseCase(this.customersRepository)
        
        return await findByIdCustomerUseCase.execute(id)
    }
}

export {FindByIdCustomerController}