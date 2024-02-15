import { Product } from "../../../clean/core/entity/Product";
import { ICreateProductDTO } from "../../../clean/core/entity/dtos/ICreateProductDTO";
import { IProductsRepository } from "../../../ports/repositories/IProductsRepository";
import { genId } from "./Util";


class ProductsRepositoryInMemory implements IProductsRepository {

    private products: Product[]

    constructor() {
        this.products = []
    }
 
    async create({code, name, description, categoryId, price, image }: ICreateProductDTO ): Promise<Product> {
        
        const product = new Product()

        const id = genId(this.products)

        Object.assign(product, {id, code, name, description, categoryId, price, image })

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

    async findByName(name: string): Promise<Product[]> {
        let productsFounded : Product[] = []

        this.products.forEach((product) => {
            if(product.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())){
                productsFounded.push(product)
            }
        })            

        return productsFounded
    }
    
    async delete(id: number): Promise<void> {
        
    }

    async update(product: Product): Promise<Product> {
        return product
    }

    async findByCategory(name: string): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
}

export { ProductsRepositoryInMemory }