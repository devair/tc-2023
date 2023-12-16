import { Product } from "../../../domain/Product";
import { IProductsRepository } from "../../../ports/repositories/IProductsRepository";
import { ICategoriesService } from "../../category/ICategoriesService";
import { IProductsService } from "../IProductsService";


class ProductsService implements IProductsService{

    constructor(private productsRepository: IProductsRepository, 
        private categoriesService: ICategoriesService){}

    async create({code, name, description, category, price, image }): Promise<Product>{

        const productAlreadyExists = await this.productsRepository.findByCode(code);

        if(productAlreadyExists){
            throw new Error(`Product ${code} already exists`);
        }

        const categoryFound = await this.categoriesService.findByName(category)

        if(!categoryFound){
            throw new Error(`Category ${category} not found`);
        }


        const product = new Product()

        Object.assign(product, {
            code, name, description, category: categoryFound, price, image
        })
        
        await this.productsRepository.create(product)

        return product
    }

    async list(): Promise<Product[]>{
        const products = await this.productsRepository.list()

        return products
    }

    async findByCode(code: string): Promise<Product>{
        const product = await this.productsRepository.findByCode(code)

        if(!product){
            throw new Error(`Product ${code} not found`)
        }

        return product
    }
}

export { ProductsService }