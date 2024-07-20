import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';


interface FormInputs {
  weight: number;
  height: number;
  length: number;
  width: number;
}

export default function FormShipping() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
  };


  return (
    <div className="m-2 p-2 border-spacing-44 border-red-300 border">
        <h1>THÔNG TIN VẬN CHUYỂN</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <div>
        <label className="block text-gray-700">Thông tin cân nặng sau khi đóng gói (kg)</label>
        <input
          type="number"
          step="0.01"
          {...register('weight', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.weight && <span className="text-red-500">This field is required</span>}
      </div>

      <div>
        <label className="block text-gray-700">Thông tin thể tích (cao x dài x rộng) (cm)</label>
        <div className="flex space-x-2">
          <input
            type="number"
            step="0.01"
            placeholder="Cao"
            {...register('height', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Dài"
            {...register('length', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Rộng"
            {...register('width', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        {(errors.height || errors.length || errors.width) && <span className="text-red-500">All fields are required</span>}
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Lưu
        </button>
      </div>
    </form>

    </div>
  )
}
