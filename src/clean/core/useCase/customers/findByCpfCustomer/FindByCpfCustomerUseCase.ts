import { ICustomersGateway } from "../../../../communication/gateway/repositories/ICustomersGateway"
import { Customer } from "../../../entity/Customer"


class FindByCpfCustomerUseCase {

    constructor(private customersRepository: ICustomersGateway){}

    async execute(cpf: string): Promise<Customer> {
        const customer = await this.customersRepository.findByCpf(cpf)

        if(!customer){
            throw new Error(`Customer's ${cpf} not found`)
        }

        return customer
    }
}

export { FindByCpfCustomerUseCase }