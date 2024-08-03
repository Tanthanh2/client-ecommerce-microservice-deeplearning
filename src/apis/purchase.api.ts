import { get } from 'lodash'
import { OrderItemRequest, OrderRequest } from 'src/constants/contant'
import { OrderItem } from 'src/types/order.type'
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
  },


  addOrder(data: OrderRequest) {
    return http.post<string>(`/api/v1/purchases/orders/`, data)
  },
  getOrder(id:string, status:string){
    return http.get<OrderRequest[]>(`/api/v1/purchases/orders/customer/${id}?status=${status}`)
  }
  ,
  getOrderDetailItem(data: OrderItemRequest[]){
    return http.post<OrderItem[]>(`/api/v1/products/orders`, data)
  },
  // New method to update the order status
  updateOrderStatus(id: string, status: string) {
    return http.put<string>(`/api/v1/purchases/orders/${id}/status`, null, {
      params: { status },
    });
  },

}

export default purchaseApi
