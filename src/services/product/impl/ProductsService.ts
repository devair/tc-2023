import { Product } from "../../../domain/Product";
import { ICreateProductDTO } from "../../../domain/dtos/ICreateProductDTO";
import { IProductsRepository } from "../../../ports/repositories/IProductsRepository";
import { ICategoriesService } from "../../category/ICategoriesService";
import { IProductsService } from "../IProductsService";


class ProductsService implements IProductsService{

    constructor(private productsRepository: IProductsRepository, 
        private categoriesService: ICategoriesService){}

    async create({code, name, description, category, price, image }: ICreateProductDTO): Promise<Product>{

        const productAlreadyExists = await this.productsRepository.findByCode(code);

        if(productAlreadyExists){
            throw new Error(`Product ${code} already exists`);
        }        

        const categoryFound = await this.categoriesService.findByName(category.name )

        const product = await this.productsRepository.create({
            code, name, description, category: categoryFound, price, image
        })

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

    async findById(id: number): Promise<Product>{
        const product = await this.productsRepository.findById(id)

        if(!product){
            throw new Error(`Product ${id} not found`)
        }

        return product
    }
}

export { ProductsService }