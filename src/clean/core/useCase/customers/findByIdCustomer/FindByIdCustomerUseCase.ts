import { ICustomersGateway } from "../../../../communication/gateway/repositories/ICustomersGateway"
import { Customer } from "../../../entity/Customer"


class FindByIdCustomerUseCase {

    constructor(private customersRepository: ICustomersGateway){}

    async execute(id: number): Promise<Customer> {
        const customer = await this.customersRepository.findById(id)

        if (!customer) {
            throw new Error(`Customer ${id} not found`)
        }
        return customer
    }
}

export { FindByIdCustomerUseCase }