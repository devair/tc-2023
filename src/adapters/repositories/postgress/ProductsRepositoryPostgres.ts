import { Repository, getRepository } from "typeorm";
import { Product } from "../../../domain/Product";
import { ICreateProductDTO } from "../../../domain/dtos/ICreateProductDTO";
import { IProductsRepository } from "../../../ports/repositories/IProductsRepository";

class ProductsRepositoryPostgres implements IProductsRepository {

    private repository: Repository<Product>

    constructor(){
        this.repository = getRepository(Product)
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

    async findByName(name: string): Promise<Product> {
        const product = await this.repository.findOne( { name })
        return product
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id)
    }
}

export { ProductsRepositoryPostgres }