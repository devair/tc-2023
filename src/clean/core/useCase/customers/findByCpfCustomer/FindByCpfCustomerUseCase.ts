import { ICustomersGateway } from "../../../../communication/gateway/repositories/ICustomersGateway"
import { Customer } from "../../../entity/Customer"
import { OutputFindCustomerDTO } from "../findByIdCustomer/IFindCustomerDTO"


class FindByCpfCustomerUseCase {

    constructor(private customersRepository: ICustomersGateway){}

    async execute(cpf: string): Promise<OutputFindCustomerDTO> {
        const customer = await this.customersRepository.findByCpf(cpf)

        if(!customer){
            throw new Error(`Customer's ${cpf} not found`)
        }

        return {
            id: customer.id,
            name: customer.name,                    
            cpf: customer.cpf,
            email: customer.cpf,
            phone: customer.phone
        }
    }
}

export { FindByCpfCustomerUseCase }