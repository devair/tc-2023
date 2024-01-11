import { Request, Response } from "express";
import { container } from "tsyringe";
import { CategoriesService } from "@services/category/impl/CategoriesService";

class CategoriesController {

    async list(request: Request, response: Response): Promise<Response> {

        const serviceInstance = container.resolve(CategoriesService)
        let all = []

        try{
            all = await serviceInstance.list()
        } catch (ex) {
            return response.status(400).json({ error: ex.message });
        }

        return response.status(200).json(all)
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        
        const serviceInstance = container.resolve(CategoriesService)

        try {
            await serviceInstance.create({ name, description });
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send();
    }

    async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const serviceInstance = container.resolve(CategoriesService)
        let category;

        try{
            category = await serviceInstance.findById( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(category)
    }

    async update(request: Request, response: Response): Promise<Response>{
        const { id } = request.params
        const { name, description } = request.body

        const serviceInstance = container.resolve(CategoriesService)
        
        const object = { 
            id: parseInt(id),
            name,
            description
        }

        try{
            await serviceInstance.update(object)            
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(204).send()
    }

    async search (request: Request, response: Response): Promise<Response>{
        
        const { name }  = request.query
        
        const serviceInstance = container.resolve(CategoriesService)
        let category;

        try{
            category = await serviceInstance.findByName( name.toString())
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(category)
    }
}

export { CategoriesController }