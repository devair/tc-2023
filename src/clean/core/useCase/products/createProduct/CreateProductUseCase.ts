import { ICreateProductDTO } from "../../../entity/dtos/ICreateProductDTO";
import { IProductsGateway } from "../../../../communication/gateway/repositories/IProductsGateway";
import { Product } from "../../../entity/Product";
import { FindByIdCategoryUseCase } from "../../categories/findByIdCategory/FindByIdCategoryUseCase";
import { ICategoriesGateway } from "../../../../communication/gateway/repositories/ICategoriesGateway";

class CreateProductUseCase {

    constructor(private productsRepository: IProductsGateway,
        private categoriesRepository: ICategoriesGateway){}

    async execute ({code, name, description, categoryId, price, image }: ICreateProductDTO): Promise<Product>{

        const productAlreadyExists = await this.productsRepository.findByCode(code);

        if(productAlreadyExists){
            throw new Error(`Product ${code} already exists`);
        }        

        const categoryFound = await this.categoriesRepository.findById(categoryId)
        
        if (!categoryFound) {
            throw new Error(`Category ${categoryId} not found`)
        }

        const product = await this.productsRepository.create({
            code, name, description, categoryId: categoryFound.id, price, image
        })

        return product
    }
}

export { CreateProductUseCase }