import { IProductsGateway } from "../../gateway/repositories/IProductsGateway";
import { FindByCodeProductUseCase } from "../../../core/useCase/products/findByCodeProduct/FindByCodeProductUseCase";
import { FindByNameProductUseCase } from "../../../core/useCase/products/findByNameProduct/FindByNameProductUseCase";
import { FindProductByCategoryNameUseCase } from "../../../core/useCase/products/findProductByCategoryName/FindProductByCategoryNameUseCase";
import { OutputFindProductDTO } from "../../../core/useCase/products/findByIdProduct/IFindProductDTO";

class SearchProductsController {

    constructor(private productsRepository: IProductsGateway){}

    async handler (name : string, categoryName: string, code: string): Promise<OutputFindProductDTO[]>{
        
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