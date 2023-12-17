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
        let category;

        try{
            category = await serviceInstance.findById( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(category)
    }

}

export { CustomersController }