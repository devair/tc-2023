import { ICustomersRepository } from "../../gateway/repositories/ICustomersRepository";
import { Customer } from "../../../core/entity/Customer";
import { FindByIdCustomerUseCase } from "../../../core/useCase/customers/findByIdCustomer/FindByIdCustomerUseCase";

class FindByIdCustomerController{

    constructor(private customersRepository: ICustomersRepository){}

    async handler(id: number): Promise<Customer>{
        
        const findByIdCustomerUseCase = new FindByIdCustomerUseCase(this.customersRepository)
        
        return await findByIdCustomerUseCase.execute(id)
    }
}

export {FindByIdCustomerController}