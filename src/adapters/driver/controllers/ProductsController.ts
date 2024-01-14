import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProductsService } from "../../../services/product/impl/ProductsService";


class ProductsController {

    async create(request: Request, response: Response): Promise<Response> {

        const { code, name, description, categoryId, price, image } = request.body;

        const serviceInstance = container.resolve(ProductsService)

        try {
            await serviceInstance.create({ code, name, description, 
                categoryId, price, image });
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
        let product;

        try{
            product = await serviceInstance.findById( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(product)
    }

    async search (request: Request, response: Response): Promise<Response>{
        
        const { name }  = request.query
        
        const serviceInstance = container.resolve(ProductsService)
        let product;

        try{
            product = await serviceInstance.findByName( name.toString())
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(product)
    }

    async delete(request: Request, response: Response): Promise<Response>{
        const { id } = request.params
        
        const serviceInstance = container.resolve(ProductsService)
        
        try{
            await serviceInstance.delete( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }

        return response.status(204).send()
    }

    async update(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const serviceInstance = container.resolve(ProductsService)
        let product;

        try{
            product = await serviceInstance.findById( parseInt(id) )

            Object.assign(product, request.body)

            await serviceInstance.update(product)
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(product)
    }    

    async findByCategory (request: Request, response: Response): Promise<Response>{
        
        const { name }  = request.query
        
        const serviceInstance = container.resolve(ProductsService)
        let products;

        console.log( JSON.stringify(request.query))

        try{
            products = await serviceInstance.findByCategory( name.toString())
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(products)
    }
}

export { ProductsController }