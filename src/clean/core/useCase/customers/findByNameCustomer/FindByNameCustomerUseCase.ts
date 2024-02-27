import { ICustomersGateway } from "../../../../communication/gateway/repositories/ICustomersGateway"
import { Customer } from "../../../entity/Customer"


class FindByNameCustomerUseCase {

    constructor(private customersRepository: ICustomersGateway){}

    async execute(name: string): Promise<Customer[]> {
        const customer = await this.customersRepository.findByName(name)

        if(!customer){
            throw new Error(`Customer's ${name} not found`)
        }

        return customer
    }
}

export { FindByNameCustomerUseCase }