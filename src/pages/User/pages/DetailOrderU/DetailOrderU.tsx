import React, { useEffect, useState } from 'react';
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { useMutation, useQuery  } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import purchaseApi from 'src/apis/purchase.api';
import { OrderItemRequest, OrderRequest } from 'src/constants/contant'
import { OrderItem } from 'src/types/order.type'
import { Link } from 'react-router-dom';
import path from 'src/constants/path'
import { toast } from 'react-toastify';




export default function DetailOrderU() {
  const location = useLocation();
  const { purchase } = location.state as { purchase: OrderRequest };
  console.log(purchase);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  // Fetch order details using useQuery
  const { refetch } = useQuery(
    ['orderDetails', purchase.id],
    () => purchaseApi.getOrderDetailItem(purchase.orderItems),
    {
      onSuccess: (response) => { // Change this to response
        console.log('Order items fetched successfully:', response.data);
        setOrderItems(response.data); // Use response.data to set state
      },
      onError: (error) => {
        console.error('Failed to fetch order items:', error);
      },
    }
  );
  


  const mutation = useMutation({
    mutationFn: (data: { id: string; status: string }) => {
      return purchaseApi.updateOrderStatus(data.id, data.status);
    },
    onSuccess: (data) => {
      // Handle success, e.g., show a success message or refetch data
      console.log('Order status updated successfully:', data);
      toast.success('Order status updated successfully', { autoClose: 2000 });
      refetch(); // Refetch order details after canceling
      purchase.status = 'ô'
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status', { autoClose: 2000 });
    },
  });

  const handleCancelOrder = () => {
    const orderId = purchase.id?.toString() || '0'; // Replace with your order ID
    const newStatus = 'cancelled'; // Replace with your new status
    // Call the mutation
    mutation.mutate({ id: orderId, status: newStatus });
  };


  return (

    <div className='m-6'>


    <div className='max-w-2xl mx-auto mt-4 p-4 bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold text-center text-blue-800 mb-6'>Thông tin chi tiết Order</h2>
      
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <span className='font-semibold text-gray-700'>Mã đơn hàng:</span>
          <span className='text-blue-600 font-bold'>{purchase.id}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='font-semibold text-gray-700'>Ngày đặt:</span>
          <span className='text-blue-600'>{new Date(purchase.orderDate).toLocaleDateString()}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='font-semibold text-gray-700'>Tổng giá tiền:</span>
          <span className='text-orange-500 font-bold text-xl'>₫{formatCurrency(purchase.totalMoney)}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='font-semibold text-gray-700'>Trạng thái:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${purchase.status === 'delivered' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
            { purchase.status}
          </span>
        </div>
      </div>
      <div className='mt-6 flex justify-center space-x-4'>
      {purchase.status === 'waitForConfirmation' && (
          <div className='mt-6 flex justify-center space-x-4'>
            <button
              onClick={handleCancelOrder}
              className='px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none'
            >
              Hủy đơn hàng
            </button>
          </div>
        )}
      </div>
    </div>


    <h3 className='text-xl font-semibold text-gray-800 mt-8 mb-4'>Chi tiết sản phẩm</h3>
      <div className='space-y-4'>
        {orderItems.map((item) => (
          <div key={item.id} className='p-4 border rounded-lg shadow-sm bg-gray-50'>
            <div className='flex'>

            <Link
                                  className='h-20 w-20 flex-shrink-0 '
                                  to={`${path.home}${generateNameId({
                                    name: item.product.name,
                                    id: item.product.id.toString()
                                  })}`}
                                >
              <img src={item.product.image} alt={item.product.name} className='w-24 h-24 object-cover rounded-lg' />
              </Link>
              <div className='ml-4 flex-grow p-6 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
  <h4 className='text-2xl font-bold text-blue-800 mb-3'>{item.product.name}</h4>
  <p className='text-base text-gray-700 mb-2'><span className='font-semibold'>Mô tả:</span> {item.product.description}</p>
  <p className='text-base text-gray-700 mb-2'><span className='font-semibold'>Danh mục:</span> {item.product.category.name}</p>
  <p className='text-lg font-semibold text-blue-600 mb-2'>Giá: ₫{formatCurrency(item.product.price)}</p>
  <p className='text-base text-gray-700 mb-2'><span className='font-semibold'>Số lượng:</span> {item.quantity}</p>
  <p className='text-base text-gray-700 mb-2'>
    <span className='font-semibold'>Màu:</span> {item.product.sizeQuantities.find(sq => sq.id === item.idSizeQuantity)?.color || 'N/A'}
  </p>
  <p className='text-base text-gray-700 mb-2'>
    <span className='font-semibold'>Kích cỡ:</span> {item.product.sizeQuantities.find(sq => sq.id === item.idSizeQuantity)?.size || 'N/A'}
  </p>
  
  {item.promotion && (
    <p className='text-base text-red-600 mb-2'>
      <span className='font-semibold'>Khuyến mãi:</span> {item.promotion.name} - <span className='font-bold'>Giảm giá: ₫{formatCurrency(item.promotion.discountAmount)}</span>
    </p>
  )}
  <p className='text-base text-gray-700'>
    <span className='font-semibold'>Ghi chú:</span> {item.note || 'Không có ghi chú'}
  </p>
</div>

              
            </div>
            <div className='flex space-x-4 mt-4'>
              {item.product.images.map((img, index) => (
                <img key={index} src={img} alt={`Product image ${index + 1}`} className='w-16 h-16 object-cover rounded-lg' />
              ))}
            </div>
            <Link
                                  className='h-20 w-20 flex-shrink-0 '
                                  to={`${path.home}${generateNameId({
                                    name: item.product.name,
                                    id: item.product.id.toString()
                                  })}`}
                                >
            <button
          className='px-4 py-2 mt-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none'
        >
          Mua lại
        </button>
        </Link>

          </div>
        ))}
      </div>

    </div>

  )
}
