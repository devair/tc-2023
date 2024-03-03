import { Repository } from "typeorm"
import { ProductEntity } from "../../../../shared/infra/typeorm/entities/ProductEntity"
import { IProductsGateway } from "../../../communication/gateway/repositories/IProductsGateway"
import { Product } from "../../../core/entity/Product"
import { InputCreateProductDTO } from "../../../core/useCase/products/createProduct/ICreateProductDTO"
import { AppDataSource } from "../../../../shared/infra/typeorm"

class ProductsRepositoryPostgres implements IProductsGateway {

    private repository: Repository<Product>

    constructor(){
        this.repository = AppDataSource.getRepository(ProductEntity)
    }

    async create({ code, name, description, categoryId, price, image }: InputCreateProductDTO): Promise<Product> {
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
        const product = await this.repository.findOne( {where: { id }})
        return product
    }

    async findByCode(code: string): Promise<Product> {
        const product = await this.repository.findOne({where: { code }})
        return product
    }

    async findByName(name: string): Promise<Product[]> {
        const products = await this.repository
        .createQueryBuilder('product')
        .where('LOWER(name) LIKE :pattern', { pattern: `%${ name.toLowerCase() }%` })                                    
        .getMany()

        return products
    }

    async delete(id: number): Promise<Boolean> {
        const deleteResult = await this.repository.delete(id)

        if (deleteResult.affected > 0){
            return true;
        }

        return false;
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