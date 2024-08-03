import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = '/api/v1/carts'

const purchaseApi = {
  addToCart(iduser:string, body: { idProduct: string; quantity: number; idSizeQuantity:string|null }) {
    return http.post<SuccessResponse<Purchase>>(`/api/v1/carts/${iduser}`, body)
  },

  getPurchases(id:string) {
    return http.get<SuccessResponse<Purchase[]>>(`/api/v1/carts/carts-user/${id}`)
  },




  
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body)
  },






  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
