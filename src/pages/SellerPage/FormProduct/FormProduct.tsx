import React from 'react'
import FormPurchase from './FormPurchase'
import FormShipping from './FormShipping'
import FormBasic from './FormBasic'
import FormDetail from './FormDetail'
export default function FormProduct() {
  return (
    <div className='overflow-x-auto my-2'>
      <div className='flex justify-between bg-slate-200 rounded-lg  p-4'>
        <div>
          <h1 className='my-2'>THÔNG TIN SẢN PHẨM</h1>
        </div>
      </div>
      <div>

        {/* START THÔNG TIN CƠ BẢN */}
        <FormBasic/>
        {/* END THÔNG TIN CƠ BẢN */}

        {/* START THÔNG TIN CHI TIẾT */}
        <FormDetail/>
        {/* END THÔNG TIN CHI TIẾT */}


        {/* START THÔNG TIN BÁN HÀNG */}
        <FormPurchase/>
        {/* END THÔNG TIN BÁN HÀNG */}


        {/* START THÔNG TIN vẬN CHUYỂN */}
        <FormShipping/>
        {/* END THÔNG TIN vẬN CHUYỂN */}


      </div>
    </div>
  )
}
