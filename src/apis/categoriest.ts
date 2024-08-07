import { Category } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/api/v1/products/category'
const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  },
  getCategoryDetail(id: string) {
    return http.get<SuccessResponse<Category>>(`${URL}/${id}`)
  }
}

export default categoryApi
