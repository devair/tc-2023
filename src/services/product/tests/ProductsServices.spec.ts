import "reflect-metadata"
import { CategoriesRepositoryInMemory } from "../../../adapters/repositories/in-memory/CategoriesRepositoryInMemory"
import { ProductsRepositoryInMemory } from "../../../adapters/repositories/in-memory/ProductsRepositoryInMemory"
import { ICategoriesService } from "../../category/ICategoriesService"
import { CategoriesService } from "../../category/impl/CategoriesService"
import { IProductsService } from "../IProductsService"
import { ProductsService } from "../impl/ProductsService"

let categoriesService: ICategoriesService
let productsService: IProductsService

