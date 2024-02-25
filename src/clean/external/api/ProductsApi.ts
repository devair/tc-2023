import { Request, Response } from "express";
import { ProductsService } from "../../../services/product/impl/ProductsService";
import { ProductsRepositoryPostgres } from "../../../adapters/repositories/postgres/ProductsRepositoryPostgres";
import { CategoriesRepositoryPostgres } from "../../../adapters/repositories/postgres/CategoriesRepositoryPostgres";
import { CreateProductController } from "../../communication/controller/products/CreateProductController";
import { ListProductsController } from "../../communication/controller/products/ListProductsController";
import { FindByIdProductController } from "../../communication/controller/products/FindByIdProductController";
import { SearchProductsController } from "../../communication/controller/products/SearchProductsController";
import { DeleteProductController } from "../../communication/controller/products/DeleteProductController";
import { EditCategoryController } from "../../communication/controller/categories/EditCategoryController";
import { EditProductController } from "../../communication/controller/products/EditProductController";
import { IUpdateProductDTO } from "../../core/entity/dtos/IUpdateProductDTO";


class ProductsApi {

    static async create(request: Request, response: Response): Promise<Response> {

        const { code, name, description, categoryId, price, image } = request.body;

        const productsRepository = new ProductsRepositoryPostgres()
        const categoriesRepository = new CategoriesRepositoryPostgres()    
        const createProductController = new CreateProductController(productsRepository,categoriesRepository)

        try {
            await createProductController.handler({ code, name, description, 
                categoryId, price, image });
        }
        catch (ex) {
            return response.status(400).json({ error: ex.message });
        }
        return response.status(201).send();
    }

    static async list(request: Request, response: Response): Promise<Response> {

        const productsRepository = new ProductsRepositoryPostgres()
        const listProductsController = new ListProductsController(productsRepository)

        let all = []

        try{
            all = await listProductsController.handler()
        } catch (ex) {
            return response.status(400).json({ error: ex.message });
        }

        return response.status(200).json(all)
    }

    static async findById(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const productsRepository = new ProductsRepositoryPostgres()
        const findByIdProductController = new FindByIdProductController(productsRepository)

        let product;

        try{
            product = await findByIdProductController.handler( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(product)
    }
    
    static async search (request: Request, response: Response): Promise<Response>{
        
        const { name, categoryName, code }  = request.query as { [key: string]: string}
        
        const productsRepository = new ProductsRepositoryPostgres()
        const searchProductsController = new SearchProductsController(productsRepository)

        let products = [];

        try{            
            products = await searchProductsController.handler( name, categoryName, code)            
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(products)
    }

    static async delete(request: Request, response: Response): Promise<Response>{
        const { id } = request.params
        
        const productsRepository = new ProductsRepositoryPostgres()
        const deleteProductController = new DeleteProductController(productsRepository)
        
        try{
            await deleteProductController.handler( parseInt(id) )
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }

        return response.status(204).send()
    }

    static async update(request: Request, response: Response): Promise<Response>{
        
        const { id } = request.params

        const productsRepository = new ProductsRepositoryPostgres()
        const categoriesRepository = new CategoriesRepositoryPostgres()
        const editCategoryController = new EditProductController(productsRepository, categoriesRepository)

        let product;
        
        const { code, name, description, categoryId, price, image } = request.body

        try{
            await editCategoryController.handler({ id: parseInt(id), code, name, description, categoryId, price, image })
        }
        catch( ex ) {
            return response.status(400).json({ message: ex.message })
        }
        return response.status(200).json(product)
    }    
}

export { ProductsApi }