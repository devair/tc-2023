import { Product } from "../../domain/Product"
import { ICreateProductDTO } from "../../domain/dtos/ICreateProductDTO"
import { IUpdateProductDTO } from "../../domain/dtos/IUpdateProductDTO"

interface IProductsService {

    create({code, name, description, categoryId, price, image }: ICreateProductDTO): Promise<Product>

    list(): Promise<Product[]>

    findByCode(code: string): Promise<Product>

    findById(id: number): Promise<Product>

    delete(id: number): Promise<void>

    update( {id, code, name, description, categoryId, price, image }: IUpdateProductDTO): Promise<Product>
}

export { IProductsService }