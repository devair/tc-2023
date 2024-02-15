import { Request, Response } from "express";
import { CategoriesRepositoryPostgres } from "../../repositories/postgres/CategoriesRepositoryPostgres";
import { ListCategoriesUseCase } from "../../../clean/core/useCase/categories/listCategories/ListCategoriesUseCase";
import { CreateCategoryUseCase } from "../../../clean/core/useCase/categories/createCategory/CreateCategoryUseCase";
import { FindByIdCategoryUseCase } from "../../../clean/core/useCase/categories/findByIdCategory/FindByIdCategoryUseCase";
import { UpdateCategoryUseCase } from "../../../clean/core/useCase/categories/editCategory/UpdateCategoryUseCase";
import { FindByNameCategoryUseCase } from "../../../clean/core/useCase/categories/findByNameCategory/FindByNameCategoryUseCase";

class CategoriesController {

    async list(request: Request, response: Response): Promise<Response> {

        const categoriesRepository = new CategoriesRepositoryPostgres()
        const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)


        let all = []

        try{
            all = await listCategoriesUseCase.execute()
        } catch (ex) {
            return response.status(400).json({ error: ex.message });
        }

        return response.status(200).json(all)
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        
        const categoriesRepository = new CategoriesRepositoryPostgres()
        const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

        try {
            await createCategoryUseCase.execute({ name, description });
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send();
    }

    async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params
        const categoriesRepository = new CategoriesRepositoryPostgres()
        const findByIdCategoryUseCase = new FindByIdCategoryUseCase(categoriesRepository)

        let category;

        try{
            category = await findByIdCategoryUseCase.execute( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(category)
    }

    async update(request: Request, response: Response): Promise<Response>{
        const { id } = request.params
        const { name, description } = request.body

        const categoriesRepository = new CategoriesRepositoryPostgres()
        const updateCategoryUseCase = new UpdateCategoryUseCase(categoriesRepository)
        
        const object = { 
            id: parseInt(id),
            name,
            description
        }

        try{
            await updateCategoryUseCase.execute(object)            
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(204).send()
    }

    async search (request: Request, response: Response): Promise<Response>{
        
        const { name }  = request.query
        const categoriesRepository = new CategoriesRepositoryPostgres()
        const findByNameCategoryUseCase = new FindByNameCategoryUseCase(categoriesRepository)
        
        let categories = [];

        try{
            if(name){
                categories = await findByNameCategoryUseCase.execute( name.toString())
            }
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(categories)
    }
}

export { CategoriesController }