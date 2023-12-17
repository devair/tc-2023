import { Product } from '../../domain/Product'
import { ICreateProductDTO } from '../../domain/dtos/ICreateProductDTO'

interface IProductsRepository{

    create( {code, name, description, category, price, image }: ICreateProductDTO ): Promise<Product>
    
    list(): Promise<Product[]>   

    findById(id: number): Promise<Product> 
    
    findByCode(code: string): Promise<Product> 

}

export { IProductsRepository }