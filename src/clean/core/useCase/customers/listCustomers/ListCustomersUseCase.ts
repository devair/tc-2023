import { ICustomersRepository } from "../../../../communication/gateway/repositories/ICustomersRepository"
import { Customer } from "../../../entity/Customer"

class ListCustomersUseCase {
    
    constructor(private customersRepository: ICustomersRepository){}

    async execute(): Promise<Customer[]>{
        const customers = await this.customersRepository.list()

        return customers
    }
}
export { ListCustomersUseCase }