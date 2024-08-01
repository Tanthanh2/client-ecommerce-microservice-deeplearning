import React, {useState} from 'react'
import FormPurchase from './FormPurchase'
import FormShipping from './FormShipping'
import FormBasic from './FormBasic'
import FormDetail from './FormDetail'
import {  ProductRequest } from 'src/constants/contant';


const initialFormData: ProductRequest = {
  id: undefined, // or a default value if needed
  images: [],
  name: '',
  description: '',
  categoryId: 0, // Default category ID (replace with a valid ID if needed)
  image: '',
  shortDescription: '',
  length: 0,
  width: 0,
  hight: 0, // Consider renaming to height if needed
  weight: 0,
  price: 0,
  priceBeforeDiscount: 0,
  quantity: 0,
  sizeQuantities: [],
  idShop: parseInt(localStorage.getItem("shopId") || "0", 10),
 // Default shop ID (replace with a valid ID if needed)
};


export default function FormProduct() {

  const validateFormData = (data: ProductRequest) => {
    // Kiểm tra tên sản phẩm
    if (!data.name || data.name.trim() === '') {
      console.error("Product name is required.");
      return false;
    }
  
    // Kiểm tra mô tả sản phẩm
    if (!data.description || data.description.trim() === '') {
      console.error("Product description is required.");
      return false;
    }
  
    // Kiểm tra danh mục sản phẩm
    if (data.categoryId <= 0) {
      console.error("Valid category ID is required.");
      return false;
    }
  
    // Kiểm tra giá sản phẩm
    if (data.price <= 0) {
      console.error("Product price must be greater than 0.");
      return false;
    }
  
    // Kiểm tra giá trước khi giảm giá
    if (data.priceBeforeDiscount < 0) {
      console.error("Price before discount cannot be negative.");
      return false;
    }
  
    // Kiểm tra số lượng sản phẩm
    if (data.quantity < 0) {
      console.error("Product quantity cannot be negative.");
      return false;
    }
  
    // Kiểm tra kích thước sản phẩm
    if (data.length <= 0 || data.width <= 0 || data.hight <= 0) {
      console.error("Length, width, and height must be greater than 0.");
      return false;
    }
  
    // Kiểm tra trọng lượng sản phẩm
    if (data.weight <= 0) {
      console.error("Product weight must be greater than 0.");
      return false;
    }
  
    // Kiểm tra ID shop
    if (!data.idShop) {
      console.error("Shop ID is required.");
      return false;
    }
  
    return true; // Nếu tất cả đều hợp lệ
  };
  

  const [formDataProduct, setFormDataProduct] = useState<ProductRequest>(initialFormData);
  // Function to handle updates to formDataProduct
  const handleFormDataChange = (newData: Partial<ProductRequest>) => {
    setFormDataProduct((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    const isValid = validateFormData(formDataProduct);

    if (isValid) {
      console.log(formDataProduct);
      // Thực hiện hành động khác như gửi dữ liệu đến API


      
    } else {
      console.error("Form data is invalid");
      // Bạn có thể hiển thị thông báo lỗi hoặc thực hiện hành động khác ở đây
    }
  };

  return (
    <form onSubmit={handleSubmit} className='overflow-x-auto my-2'>
    <div className='flex justify-between bg-slate-200 rounded-lg p-4'>
      <div>
        <h1 className='my-2'>THÔNG TIN SẢN PHẨM</h1>
      </div>
    </div>
    <div>
      {/* START THÔNG TIN CƠ BẢN */}
      <FormBasic formData={formDataProduct} onFormDataChange={handleFormDataChange} />
      {/* END THÔNG TIN CƠ BẢN */}

      {/* START THÔNG TIN CHI TIẾT */}
      <FormDetail formData={formDataProduct} onFormDataChange={handleFormDataChange} />
      {/* END THÔNG TIN CHI TIẾT */}

      {/* START THÔNG TIN BÁN HÀNG */}
      <FormPurchase formData={formDataProduct} onFormDataChange={handleFormDataChange} />
      {/* END THÔNG TIN BÁN HÀNG */}

      {/* START THÔNG TIN VẬN CHUYỂN */}
      <FormShipping formData={formDataProduct} onFormDataChange={handleFormDataChange} />
      {/* END THÔNG TIN VẬN CHUYỂN */}

      <div className="flex justify-start ml-2">
        <button type="submit" className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Lưu sản phẩm
        </button>
      </div>
    </div>
  </form>
  )
}
