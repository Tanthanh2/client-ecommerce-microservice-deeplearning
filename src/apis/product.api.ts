import { ProductRequest } from 'src/constants/contant'
import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
const URL = '/api/v1/products'
const productApi = {

  
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(`${URL}/search`, { params })
  },

  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  },

  addProduct(data:ProductRequest){
    return http.post<string>("/api/v1/products/seller", data)
  },
  async getProductByIdShop(idShop: string) {
    const response = await http.get<Product[]>(`/api/v1/products/shop/${idShop}`);
    return response.data; // Trả về dữ liệu sản phẩm từ phản hồi
  },
  updateStatusProduct(id: string, status: number) {
    return http.patch<void>(`/api/v1/products/seller/${id}/public?isPublic=${status}`)
  },


  updateProductBasic(id: string, data: any) {
    return http.put<SuccessResponse<Product>>(`/api/v1/products/seller/${id}/basic`, data)
  },

  updateProductDetail(id: string, data: any) {
    return http.put<SuccessResponse<Product>>(`/api/v1/products/seller/${id}/detail`, data)
  },

  updateProductSell(id: string, data: any) {
    return http.put<SuccessResponse<Product>>(`/api/v1/products/seller/${id}/sell`, data)
  },

  updateProductShip(id: string, data: any) {
    return http.put<SuccessResponse<Product>>(`/api/v1/products/seller/${id}/ship`, data)
  },

  deleteSizeQuantity(id: any) {
    return http.delete<void>(`/api/v1/products/seller/${id}/sizequantity`)
  }
  
}
export default productApi
