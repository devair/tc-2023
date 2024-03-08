import { IProductsGateway } from "../../../../communication/gateway/IProductsGateway"
import { OutputFindProductDTO } from "../findByIdProduct/IFindProductDTO"

class FindByNameProductUseCase {

    constructor(private productsRepository: IProductsGateway){}

    async execute(name: string): Promise<OutputFindProductDTO[]> {
        const products = await this.productsRepository.findByName(name)      
        
        const output = products.map((elem) => ({
            id: elem.id,
            name: elem.name,
            code: elem.code,
            description: elem.description,
            price: elem.price,
            image: elem.image           
        }))

        return output
    }
}

export { FindByNameProductUseCase }