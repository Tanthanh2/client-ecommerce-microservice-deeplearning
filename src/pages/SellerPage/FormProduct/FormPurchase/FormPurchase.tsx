import React from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';

interface SizeQuantity {
  size: string;
  quantity: number;
}

interface FormInputs {
  price: number;
  sizes: SizeQuantity[];
}
export default function FormPurchase() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      sizes: [{ size: '', quantity: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sizes'
  });

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
  };
  return (
    <div className="m-2 p-2 border-spacing-44 border-red-300 border">
        <h1>THÔNG TIN Bán Hàng</h1>
        
        <div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <div>
        <label className="block text-gray-700">Giá</label>
        <input
          type="number"
          {...register('price', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.price && <span className="text-red-500">This field is required</span>}
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Thông tin Size và Số lượng</label>
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-gray-700">Size</label>
              <input
                type="text"
                {...register(`sizes.${index}.size`, { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.sizes?.[index]?.size && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
              <label className="block text-gray-700">Số lượng</label>
              <input
                type="number"
                {...register(`sizes.${index}.quantity`, { required: true, min: 1 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.sizes?.[index]?.quantity && <span className="text-red-500">This field is required</span>}
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button type="button" onClick={() => remove(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Remove
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ size: '', quantity: 0 })}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Size
        </button>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Lưu
        </button>
      </div>
    </form>
        </div>
    </div>
  )
}
