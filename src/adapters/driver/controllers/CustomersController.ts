import { Request, Response } from "express"
import { container } from "tsyringe";
import { CustomersService } from "../../../services/customer/impl/CustomersService";

class CustomersController {

    async create(request: Request, response: Response): Promise<Response> {
        const { name, email, cpf, phone }= request.body;
        
        const serviceInstance = container.resolve(CustomersService)

        try {
            await serviceInstance.create({ name, email, cpf, phone });
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send();
    }

    async list(request: Request, response: Response): Promise<Response> {

        const serviceInstance = container.resolve(CustomersService)
        let all = []

        try{
            all = await serviceInstance.list()
        } catch (ex) {
            return response.status(400).json({ error: ex.message });
        }

        return response.status(200).json(all)
    }

    async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const serviceInstance = container.resolve(CustomersService)
        let customer;

        try{
            customer = await serviceInstance.findById( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(customer)
    }

    async search (request: Request, response: Response): Promise<Response>{
        
        const { cpf, name }  = request.query
        
        const serviceInstance = container.resolve(CustomersService)
        let customers;
        
        try{

            if(cpf){
                let customer = await serviceInstance.findByCpf( cpf.toString())

                if(customer) {
                    customers.push(customer)
                }
            }
            else if( name){
                customers = await serviceInstance.findByName( name.toString())
            }
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(customers)
    }
}

export { CustomersController }