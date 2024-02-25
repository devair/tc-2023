import { ICustomersRepository } from "../../../../ports/repositories/ICustomersRepository"
import { Customer } from "../../../core/entity/Customer"
import { FindByCpfCustomerUseCase } from "../../../core/useCase/customers/findByCpfCustomer/FindByCpfCustomerUseCase"
import { FindByNameCustomerUseCase } from "../../../core/useCase/customers/findByNameCustomer/FindByNameCustomerUseCase"

class SearchCustomersController {

    constructor(private customersRepository: ICustomersRepository){}

    async handler( cpf?: string , name?: string ) : Promise<Customer[]>{
        
        const findByCpfCustomerUseCase = new FindByCpfCustomerUseCase(this.customersRepository)
        const findByNameCustomerUseCase = new FindByNameCustomerUseCase(this.customersRepository)
        
        let customers = []

        if(cpf){
            let customer = await findByCpfCustomerUseCase.execute( cpf.toString())

            if(customer) {
                customers.push(customer)
            }
        }
        else if( name){
            customers = await findByNameCustomerUseCase.execute( name.toString())
        }

        return customers
    }
}

export { SearchCustomersController }