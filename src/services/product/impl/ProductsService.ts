import { inject, injectable } from "tsyringe";
import { Product } from "../../../domain/Product";
import { ICreateProductDTO } from "../../../domain/dtos/ICreateProductDTO";
import { IProductsRepository } from "../../../ports/repositories/IProductsRepository";
import { ICategoriesService } from "../../category/ICategoriesService";
import { IProductsService } from "../IProductsService";
import { IUpdateProductDTO } from "../../../domain/dtos/IUpdateProductDTO";

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

    async findByName(name: string): Promise<Product[]>{
        const products = await this.productsRepository.findByName(name)
        return products
    }

    async delete(id: number): Promise<void> {
        await this.productsRepository.delete(id)
    }

    async update( {id, code, name, description, categoryId, price, image }: IUpdateProductDTO ): Promise<Product>{        
        const product = await this.findById( id )

        const categoryFound = await this.categoriesService.findById(categoryId)

        product.code = code
        product.name = name
        product.description = description
        product.price = price
        product.image = image
        product.category = categoryFound
        
        return await this.productsRepository.update(product)        
    }

    async findByCategory(name: string): Promise<Product[]>{
        const products = await this.productsRepository.findByCategory(name)
        return products
    }
}

export { ProductsService }