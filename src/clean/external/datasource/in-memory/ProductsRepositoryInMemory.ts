import { Product } from "../../../core/entity/Product";
import { ICreateProductDTO } from "../../../core/entity/dtos/ICreateProductDTO";
import { ICategoriesRepository } from "../../../communication/gateway/repositories/ICategoriesRepository";
import { IProductsRepository } from "../../../communication/gateway/repositories/IProductsRepository";
import { genId } from "./Util";


class ProductsRepositoryInMemory implements IProductsRepository {

    private products: Product[]
    
    constructor(private categoriesRepository: ICategoriesRepository) {
        this.products = []
    }
 
    async create({code, name, description, categoryId, price, image }: ICreateProductDTO ): Promise<Product> {
        
        const product = new Product()
        
        const id = genId(this.products)
        
        const categoryFound = await this.categoriesRepository.findById(categoryId)

        Object.assign(product, {id, code, name, description, categoryId, price, image, category: categoryFound })

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
    
    async delete(id: number): Promise<boolean> {
        const index = this.products.findIndex((item) => item.id === id )

        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }

    async update(product: Product): Promise<Product> {
        return product
    }

    async findByCategory(name: string): Promise<Product[]> {
        let productsFounded : Product[] = []

        this.products.forEach((product) => {
            if(product.category.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())){
                productsFounded.push(product)
            }
        })            

        return productsFounded
    }
}

export { ProductsRepositoryInMemory }