import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormInputs {
  brand: string;
  manufacturer: string;
  material: string;
  ingredients: string;
  productionAddress: string;
  productionDate: string;
  expirationDate: string;
  warrantyInfo: string;
}
export default function FormDetail() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
  };
  return (
<div className="m-2 p-2 border-spacing-44 border-red-300 border">
    <h1>THÔNG TIN CHI TIẾT</h1>
    
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-gray-700">THƯƠNG HIỆU</label>
        <input
          type="text"
          {...register('brand', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.brand && <span className="text-red-500">This field is required</span>}
      </div>

      <div>
        <label className="block text-gray-700">NHÀ SẢN XUẤT</label>
        <input
          type="text"
          {...register('manufacturer', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.manufacturer && <span className="text-red-500">This field is required</span>}
      </div>

      <div>
        <label className="block text-gray-700">CHẤT LIỆU</label>
        <input
          type="text"
          {...register('material', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.material && <span className="text-red-500">This field is required</span>}
      </div>

      <div>
        <label className="block text-gray-700">THÀNH PHẦN</label>
        <input
          type="text"
          {...register('ingredients', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.ingredients && <span className="text-red-500">This field is required</span>}
      </div>

      <div>
        <label className="block text-gray-700">ĐỊA CHỈ CHỊU TRÁNH NHIỆM SẢN XUẤT</label>
        <input
          type="text"
          {...register('productionAddress', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.productionAddress && <span className="text-red-500">This field is required</span>}
      </div>

      <div>
        <label className="block text-gray-700">NGÀY SẢN XUẤT</label>
        <input
          type="date"
          {...register('productionDate', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.productionDate && <span className="text-red-500">This field is required</span>}
      </div>

      <div>
        <label className="block text-gray-700">HẠN SỬ DỤNG</label>
        <input
          type="date"
          {...register('expirationDate', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.expirationDate && <span className="text-red-500">This field is required</span>}
      </div>

      <div>
        <label className="block text-gray-700">THÔNG TIN BẢO HÀNH</label>
        <input
          type="text"
          {...register('warrantyInfo', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.warrantyInfo && <span className="text-red-500">This field is required</span>}
      </div>

      <div className="md:col-span-2 flex justify-end">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Lưu
        </button>
      </div>
    </form>

    </div>
</div>
  )
}
