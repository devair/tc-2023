import { ICustomersGateway } from "../../../../communication/gateway/repositories/ICustomersGateway"
import { Customer } from "../../../entity/Customer"

class ListCustomersUseCase {
    
    constructor(private customersRepository: ICustomersGateway){}

    async execute(): Promise<Customer[]>{
        const customers = await this.customersRepository.list()

        return customers
    }
}
export { ListCustomersUseCase }