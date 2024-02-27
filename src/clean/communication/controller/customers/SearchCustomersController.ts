import { ICustomersGateway } from "../../gateway/repositories/ICustomersGateway"
import { Customer } from "../../../core/entity/Customer"
import { FindByCpfCustomerUseCase } from "../../../core/useCase/customers/findByCpfCustomer/FindByCpfCustomerUseCase"
import { FindByNameCustomerUseCase } from "../../../core/useCase/customers/findByNameCustomer/FindByNameCustomerUseCase"

class SearchCustomersController {

    constructor(private customersRepository: ICustomersGateway){}

    async handler( cpf: string , name: string ) : Promise<Customer[]>{
        
        const findByCpfCustomerUseCase = new FindByCpfCustomerUseCase(this.customersRepository)
        const findByNameCustomerUseCase = new FindByNameCustomerUseCase(this.customersRepository)
        
        let customers = []

        if(cpf){
            let customer = await findByCpfCustomerUseCase.execute( cpf )

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