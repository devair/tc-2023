import { Product } from "@domain/Product"
import { ICreateProductDTO } from "@domain/dtos/ICreateProductDTO"

interface IProductsService {

    create({code, name, description, categoryId, price, image }: ICreateProductDTO): Promise<Product>

    list(): Promise<Product[]>

    findByCode(code: string): Promise<Product>

    findById(id: number): Promise<Product>

    delete(id: number): Promise<void>
}

export { IProductsService }