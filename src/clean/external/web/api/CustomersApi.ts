import { Request, Response } from "express"
import { CreateCustomerController } from "../../../communication/controller/customers/CreateCustomerController";
import { CustomersRepositoryPostgres } from "../../datasource/postgres/CustomersRepositoryPostgres";
import { ListCustomersController } from "../../../communication/controller/customers/ListCustomersController";
import { FindByIdCustomerController } from "../../../communication/controller/customers/FindByIdCustomerController";
import { SearchCustomersController } from "../../../communication/controller/customers/SearchCustomersController";

class CustomersApi {

    static async create(request: Request, response: Response): Promise<Response> {
        const { name, email, cpf, phone }= request.body;
        
        const customersRepository = new CustomersRepositoryPostgres()
        const createCustomerController = new CreateCustomerController(customersRepository)

        try {
            await createCustomerController.handler({ name, email, cpf, phone });
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send();
    }

    static async list(request: Request, response: Response): Promise<Response> {

        const customersRepository = new CustomersRepositoryPostgres()
        const listCustomersController = new ListCustomersController(customersRepository)

        let all = []

        try{
            all = await listCustomersController.handler()
        } catch (ex) {
            return response.status(400).json({ error: ex.message });
        }

        return response.status(200).json(all)
    }

    static async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const customersRepository = new CustomersRepositoryPostgres()
        const findByIdCustomersController = new FindByIdCustomerController(customersRepository)

        let customer;

        try{
            customer = await findByIdCustomersController.handler( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(customer)
    }

    static async search (request: Request, response: Response): Promise<Response>{
        
        const { cpf, name }  = request.query as { [key: string]: string}
        
        const customersRepository = new CustomersRepositoryPostgres()
        const searchCustomersController = new SearchCustomersController(customersRepository)

        let customers = [];
        
        try{
            customers = await searchCustomersController.handler(cpf, name)
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(customers)
    }
}

export { CustomersApi }