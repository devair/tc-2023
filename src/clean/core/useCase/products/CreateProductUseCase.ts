import { ICreateProductDTO } from "../../entity/dtos/ICreateProductDTO";
import { IProductsRepository } from "../../../../ports/repositories/IProductsRepository";
import { Product } from "../../entity/Product";
import { FindByIdCategoryUseCase } from "../categories/findByIdCategory/FindByIdCategoryUseCase";

class CreateProductUseCase {

    constructor(private productsRepository: IProductsRepository,
        private findByIdCategory: FindByIdCategoryUseCase){}

    async execute ({code, name, description, categoryId, price, image }: ICreateProductDTO): Promise<Product>{

        const productAlreadyExists = await this.productsRepository.findByCode(code);

        if(productAlreadyExists){
            throw new Error(`Product ${code} already exists`);
        }        

        const categoryFound = await this.findByIdCategory.execute(categoryId)

        const product = await this.productsRepository.create({
            code, name, description, categoryId: categoryFound.id, price, image
        })

        return product
    }
}

export { CreateProductUseCase }