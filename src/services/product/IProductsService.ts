import { Product } from "../../domain/Product"

interface IProductsService {

    create({code, name, description, category, price, image }): Promise<Product>

    list(): Promise<Product[]>

    findByCode(code: string): Promise<Product>
}

export { IProductsService }