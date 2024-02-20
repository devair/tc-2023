import { IProductsRepository } from "../../../../../ports/repositories/IProductsRepository"

class DeleteProductUseCase {

    constructor(private productsRepository: IProductsRepository){}

    async execute(id: number): Promise<Boolean> {
        return await this.productsRepository.delete(id)
    }
}

export { DeleteProductUseCase }