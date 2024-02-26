import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository";
import { Product } from "../../../core/entity/Product";
import { FindByCodeProductUseCase } from "../../../core/useCase/products/findByCodeProduct/FindByCodeProductUseCase";
import { FindByNameProductUseCase } from "../../../core/useCase/products/findByNameProduct/FindByNameProductUseCase";
import { FindProductByCategoryNameUseCase } from "../../../core/useCase/products/findProductByCategoryName/FindProductByCategoryNameUseCase";

class SearchProductsController {

    constructor(private productsRepository: IProductsRepository){}

    async handler (name : string, categoryName: string, code: string): Promise<Product[]>{
        
        const findByNameProductUseCase = new FindByNameProductUseCase(this.productsRepository)
        const findProductByCategoryNameUseCase = new FindProductByCategoryNameUseCase(this.productsRepository)
        const findByCodeProductUseCase = new FindByCodeProductUseCase(this.productsRepository) 
        
        let products = [];
        
        if(name){
            products = await findByNameProductUseCase.execute( name.toString())
        }
        else if (categoryName){
            products = await findProductByCategoryNameUseCase.execute( categoryName.toString())
        }
        else if (code){
            console.log(code)
            const product = await findByCodeProductUseCase.execute( code.toString())
            console.log(product)
            products.push(product)
        }
    
        return products
    }
}

export { SearchProductsController }