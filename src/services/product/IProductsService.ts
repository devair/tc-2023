import { Product } from "../../clean/core/entity/Product"
import { ICreateProductDTO } from "../../clean/core/entity/dtos/ICreateProductDTO"
import { IUpdateProductDTO } from "../../clean/core/entity/dtos/IUpdateProductDTO"

interface IProductsService {

    create({code, name, description, categoryId, price, image }: ICreateProductDTO): Promise<Product>

    list(): Promise<Product[]>

    findByCode(code: string): Promise<Product>

    findById(id: number): Promise<Product>

    delete(id: number): Promise<void>

    update( {id, code, name, description, categoryId, price, image }: IUpdateProductDTO): Promise<Product>
}

export { IProductsService }