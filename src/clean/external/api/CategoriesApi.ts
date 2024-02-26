import { Request, Response } from "express"
import { CategoriesRepositoryPostgres } from "../datasource/postgres/CategoriesRepositoryPostgres";
import { FindByIdCategoryController } from "../../communication/controller/categories/FindByIdCategoryController";
import { ListCategoriesController } from "../../communication/controller/categories/ListCategoriesController";
import { CreateCategoryController } from "../../communication/controller/categories/CreateCategoryController";
import { EditCategoryController } from "../../communication/controller/categories/EditCategoryController";
import { FindByNameCategoryController } from "../../communication/controller/categories/FindByNameCategoryController";

class CategoriesApi {

    static async list(request: Request, response: Response): Promise<Response> {

        const categoriesRepository = new CategoriesRepositoryPostgres()
        const listCategoriesController = new ListCategoriesController(categoriesRepository)
        
        let all = []

        try{
            all = await listCategoriesController.handler()
        } catch (ex) {
            return response.status(400).json({ error: ex.message });
        }

        return response.status(200).json(all)
    }

    static async create(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        
        const categoriesRepository = new CategoriesRepositoryPostgres()
        const createCategoryController = new CreateCategoryController(categoriesRepository)
       
        try {
            await createCategoryController.handler({ name, description });
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send();
    }

    static async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const categoriesRepository = new CategoriesRepositoryPostgres()
        const findByIdCategoryController = new FindByIdCategoryController(categoriesRepository)

        let category;

        try{
            category = await findByIdCategoryController.handler( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(category)
    }

    static async update(request: Request, response: Response): Promise<Response>{
        const { id } = request.params
        const { name, description } = request.body

        const categoriesRepository = new CategoriesRepositoryPostgres()
        const editCategoryController = new EditCategoryController(categoriesRepository)
         
        const object = { 
            id: parseInt(id),
            name,
            description
        }

        try{
            await editCategoryController.handler(object)            
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(204).send()
    }

    static async search (request: Request, response: Response): Promise<Response>{
        
        const { name }  = request.query
        
        const categoriesRepository = new CategoriesRepositoryPostgres()
        const findByNameCategoryController = new FindByNameCategoryController(categoriesRepository)
        

        let categories = [];

        try{
            if(name){
                categories = await findByNameCategoryController.handler( name.toString())
            }
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(categories)
    }
}

export { CategoriesApi }