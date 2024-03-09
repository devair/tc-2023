import { ICustomersGateway } from "../../../../communication/gateway/ICustomersGateway"
import { OutputFindCustomerDTO } from "../findByIdCustomer/IFindCustomerDTO"

class ListCustomersUseCase {
    
    constructor(private customersRepository: ICustomersGateway){}

    async execute(): Promise<OutputFindCustomerDTO[]>{
        const customers = await this.customersRepository.list()

        const output = customers.map((elem) => ({
            id: elem.id,
            name: elem.name,                    
            cpf: elem.cpf,
            email: elem.cpf,
            phone: elem.phone
        }))

        return output
    }
}
export { ListCustomersUseCase }