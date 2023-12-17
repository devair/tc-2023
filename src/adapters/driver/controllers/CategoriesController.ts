import { Request, Response } from "express";
import { container } from "tsyringe";
import { CategoriesService } from "../../../services/category/impl/CategoriesService";

class CategoriesController {

    async list(request: Request, response: Response): Promise<Response> {

        const categoriesService = container.resolve(CategoriesService)

        const all = await categoriesService.list()

        return response.status(200).json(all)
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        
        const categoriesService = container.resolve(CategoriesService)

        try {
            await categoriesService.create({ name, description });
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send();
    }

}

export { CategoriesController }