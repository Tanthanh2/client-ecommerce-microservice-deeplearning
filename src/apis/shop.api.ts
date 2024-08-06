import { Shop } from 'src/constants/contant'
import { Category } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'


const ShopApi = {
  getShop(id:string) {
    return http.get<Shop>(
        `/api/v1/users/shop/seller/${id}`
    )
  },
  
}

export default ShopApi
