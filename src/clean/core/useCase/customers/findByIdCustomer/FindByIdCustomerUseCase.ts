import { ICustomersRepository } from "../../../../../ports/repositories/ICustomersRepository"
import { Customer } from "../../../entity/Customer"


class FindByIdCustomerUseCase {

    constructor(private customersRepository: ICustomersRepository){}

    async execute(id: number): Promise<Customer> {
        const customer = await this.customersRepository.findById(id)

        if (!customer) {
            throw new Error(`Customer ${id} not found`)
        }
        return customer
    }
}

export { FindByIdCustomerUseCase }