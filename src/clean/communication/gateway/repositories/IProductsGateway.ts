import { Product } from '../../../core/entity/Product'
import { InputCreateProductDTO } from '../../../core/entity/dtos/ICreateProductDTO'

interface IProductsGateway{
    
    create( {code, name, description, categoryId, price, image }: InputCreateProductDTO ): Promise<Product>
    
    list(): Promise<Product[]>   
    
    findById(id: number): Promise<Product> 
    
    findByCode(code: string): Promise<Product> 
    
    findByName(name: string): Promise<Product[]>
    
    delete( id: number): Promise<Boolean>
    
    update(product: Product): Promise<Product>

    findByCategory(name: string): Promise<Product[]>
}

export { IProductsGateway }