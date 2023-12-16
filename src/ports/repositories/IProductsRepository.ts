import { Product } from '../../domain/Product'

interface IProductsRepository{

    create( product : Product): Promise<void>
    
    list(): Promise<Product[]>   

    findById(id: string): Promise<Product> 
    
    findByCode(code: string): Promise<Product> 

}

export { IProductsRepository }