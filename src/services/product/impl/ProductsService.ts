import { inject, injectable } from "tsyringe";
import { Product } from "@domain/Product";
import { ICreateProductDTO } from "@domain/dtos/ICreateProductDTO";
import { IProductsRepository } from "@ports/repositories/IProductsRepository";
import { ICategoriesService } from "@services/category/ICategoriesService";
import { IProductsService } from "@services/product/IProductsService";

@injectable()
class ProductsService implements IProductsService{

    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('CategoriesService') 
        private categoriesService: ICategoriesService){}

    async create({code, name, description, categoryId, price, image }: ICreateProductDTO): Promise<Product>{

        const productAlreadyExists = await this.productsRepository.findByCode(code);

        if(productAlreadyExists){
            throw new Error(`Product ${code} already exists`);
        }        

        const categoryFound = await this.categoriesService.findById(categoryId)

        const product = await this.productsRepository.create({
            code, name, description, categoryId: categoryFound.id, price, image
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

    async findByName(name: string): Promise<Product>{
        const product = await this.productsRepository.findByName(name)

        if(!product){
            throw new Error(`Product ${name} not found`)
        }

        return product
    }

    async delete(id: number): Promise<void> {
        await this.productsRepository.delete(id)
    }
}

export { ProductsService }