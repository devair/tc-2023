import { ICustomersGateway } from "../../gateway/repositories/ICustomersGateway"
import { FindByCpfCustomerUseCase } from "../../../core/useCase/customers/findByCpfCustomer/FindByCpfCustomerUseCase"
import { FindByNameCustomerUseCase } from "../../../core/useCase/customers/findByNameCustomer/FindByNameCustomerUseCase"
import { OutputFindCustomerDTO } from "../../../core/useCase/customers/findByIdCustomer/IFindCustomerDTO"

class SearchCustomersController {

    constructor(private customersRepository: ICustomersGateway){}

    async handler( cpf: string , name: string ) : Promise<OutputFindCustomerDTO[]>{
        
        const findByCpfCustomerUseCase = new FindByCpfCustomerUseCase(this.customersRepository)
        const findByNameCustomerUseCase = new FindByNameCustomerUseCase(this.customersRepository)
        let customers =[]
        if(cpf){
            const customer = await findByCpfCustomerUseCase.execute( cpf )

            if(customer) {
                customers.push(customer)
            }
        }
        else if( name){
            customers = await findByNameCustomerUseCase.execute( name )            
        }
        return customers
    }
}

export { SearchCustomersController }