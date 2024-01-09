import { Product } from '../../domain/Product'
import { ICreateProductDTO } from '../../domain/dtos/ICreateProductDTO'

interface IProductsRepository{

    create( {code, name, description, categoryId, price, image }: ICreateProductDTO ): Promise<Product>
    
    list(): Promise<Product[]>   

    findById(id: number): Promise<Product> 
    
    findByCode(code: string): Promise<Product> 

    findByName(name: string): Promise<Product>
    
    delete( id: number): Promise<void>

}

export { IProductsRepository }