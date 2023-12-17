import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProductsService } from "../../../services/product/impl/ProductsService";


class ProductsController {

    async create(request: Request, response: Response): Promise<Response> {

        const { code, name, description, category, price, image } = request.body;

        const serviceInstance = container.resolve(ProductsService)

        try {
            await serviceInstance.create({ code, name, description, 
                category, price, image });
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send();
    }

    async list(request: Request, response: Response): Promise<Response> {

        const serviceInstance = container.resolve(ProductsService)
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

        const serviceInstance = container.resolve(ProductsService)
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

export { ProductsController }