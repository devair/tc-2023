import { ICustomersGateway } from "../../../../communication/gateway/ICustomersGateway"
import { OutputFindCustomerDTO } from "./IFindCustomerDTO"


class FindByIdCustomerUseCase {

    constructor(private customersRepository: ICustomersGateway){}

    async execute(id: number): Promise<OutputFindCustomerDTO> {
        const customer = await this.customersRepository.findById(id)

        if (!customer) {
            throw new Error(`Customer ${id} not found`)
        }

        return {
            id: customer.id,
            name: customer.name,
            cpf: customer.cpf,
            phone: customer.phone,
            email: customer.email
        }
    }
}

export { FindByIdCustomerUseCase }