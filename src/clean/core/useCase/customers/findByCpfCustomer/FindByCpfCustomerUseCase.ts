import { ICustomersRepository } from "../../../../communication/gateway/repositories/ICustomersRepository"
import { Customer } from "../../../entity/Customer"


class FindByCpfCustomerUseCase {

    constructor(private customersRepository: ICustomersRepository){}

    async execute(cpf: string): Promise<Customer> {
        const customer = await this.customersRepository.findByCpf(cpf)

        if(!customer){
            throw new Error(`Customer's ${cpf} not found`)
        }

        return customer
    }
}

export { FindByCpfCustomerUseCase }