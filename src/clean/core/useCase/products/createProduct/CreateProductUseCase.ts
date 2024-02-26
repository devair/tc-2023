import { ICreateProductDTO } from "../../../entity/dtos/ICreateProductDTO";
import { IProductsRepository } from "../../../../communication/gateway/repositories/IProductsRepository";
import { Product } from "../../../entity/Product";
import { FindByIdCategoryUseCase } from "../../categories/findByIdCategory/FindByIdCategoryUseCase";
import { ICategoriesRepository } from "../../../../communication/gateway/repositories/ICategoriesRepository";

class CreateProductUseCase {

    constructor(private productsRepository: IProductsRepository,
        private categoriesRepository: ICategoriesRepository){}

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