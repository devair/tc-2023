import { Product } from "../../../domain/Product";
import { ICreateProductDTO } from "../../../domain/dtos/ICreateProductDTO";
import { IProductsRepository } from "../../../ports/repositories/IProductsRepository";
import { genId } from "./Util";


class ProductsRepositoryInMemory implements IProductsRepository {

    private products: Product[]

    constructor() {
        this.products = []
    }

    async create({code, name, description, category_id, price, image }: ICreateProductDTO ): Promise<Product> {
        
        const product = new Product()

        const id = genId(this.products)

        Object.assign(product, {id, code, name, description, category_id, price, image })

        this.products.push(product)

        return product
    }

    async list(): Promise<Product[]> {
        return this.products
    }

    async findById(id: number): Promise<Product> {
        const product = this.products.find((product)=> product.id === id)
        
        return product

    }
    
    async findByCode(code: string): Promise<Product> {
        const product = this.products.find((product)=> product.code === code)
        
        return product

    }

    async findByName(name: string): Promise<Product> {
        const product = this.products.find((product)=> product.name === name)
        
        return product

    }
}

export { ProductsRepositoryInMemory }