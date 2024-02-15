import { Repository, getRepository } from "typeorm";
import { Product } from "../../../clean/core/entity/Product";
import { ICreateProductDTO } from "../../../clean/core/entity/dtos/ICreateProductDTO";
import { IProductsRepository } from "../../../ports/repositories/IProductsRepository";
import { ProductEntity } from "../../../shared/infra/typeorm/entities/ProductEntity";

class ProductsRepositoryPostgres implements IProductsRepository {

    private repository: Repository<Product>

    constructor(){
        this.repository = getRepository(ProductEntity)
    }


    async create({ code, name, description, categoryId, price, image }: ICreateProductDTO): Promise<Product> {
        const product = this.repository.create({ name, code, description, 
            categoryId, price, image })

        const productCreated = await this.repository.save(product)

        return productCreated
    }
    
    async list(): Promise<Product[]> {
        const all = await this.repository.find()

        return all
    }

    async findById(id: number): Promise<Product> {
        const product = await this.repository.findOne( { id })
        return product
    }

    async findByCode(code: string): Promise<Product> {
        const product = await this.repository.findOne( { code })
        return product
    }

    async findByName(name: string): Promise<Product[]> {
        const products = await this.repository
        .createQueryBuilder('product')
        .where('LOWER(name) LIKE :pattern', { pattern: `%${ name.toLowerCase() }%` })                                    
        .getMany()

        return products
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id)
    }

    async update(product: Product): Promise<Product> {
        return await this.repository.save(product)
    }

    async findByCategory(name: string): Promise<Product[]> {
        const products = await this.repository
        .createQueryBuilder('product')        
        .innerJoinAndSelect('product.category', 'category', 'LOWER(category.name) LIKE :pattern', 
        {
            pattern : `%${ name.toLowerCase() }%`
        })        
        .getMany()

        return products
    }
}

export { ProductsRepositoryPostgres }