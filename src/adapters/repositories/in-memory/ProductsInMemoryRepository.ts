import { Product } from "../../../domain/Product";
import { IProductsRepository } from "../../../ports/repositories/IProductsRepository";


class ProductsInMemoryRepository implements IProductsRepository {

    private products: Product[]

    constructor() {
        this.products = []
    }

    async create(product: Product): Promise<void> {

        this.products.push(product)
    }

    async list(): Promise<Product[]> {
        return this.products
    }

    async findById(id: string): Promise<Product> {
        const product = this.products.find((product)=> product.id === id)
        
        return product

    }
    
    async findByCode(code: string): Promise<Product> {
        const product = this.products.find((product)=> product.code === code)
        
        return product

    }

}

export { ProductsInMemoryRepository }