import { ICustomersRepository } from "../../../../../ports/repositories/ICustomersRepository"
import { Customer } from "../../../entity/Customer"


class FindByNameCustomerUseCase {

    constructor(private customersRepository: ICustomersRepository){}

    async execute(name: string): Promise<Customer[]> {
        const customer = await this.customersRepository.findByName(name)

        if(!customer){
            throw new Error(`Customer's ${name} not found`)
        }

        return customer
    }
}

export { FindByNameCustomerUseCase }