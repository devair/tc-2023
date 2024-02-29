import { OutputCreateCategoryDTO } from "../../../../core/useCase/categories/createCategory/ICreateCategoryDTO";

class CategoryPresenter {

    public static toJson(data: any): string {
        return JSON.stringify(data)
    }
}

export { CategoryPresenter }