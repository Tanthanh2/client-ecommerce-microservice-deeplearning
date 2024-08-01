import React from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { ProductRequest } from 'src/constants/contant';

interface FormBasicProps {
  formData: ProductRequest;
  onFormDataChange: (newData: Partial<ProductRequest>) => void;
}
interface SizeQuantity {
  id: number;
  size: string;
  color: string;
  quantity: number;
}

interface FormInputs {
  price: number;
  priceBeforeDiscount: 0;
  quantity: number;
  sizeQuantities: SizeQuantity[] | null;
}

const FormPurchase: React.FC<FormBasicProps> = ({ formData, onFormDataChange }) => {
  const { register, control, handleSubmit, watch, formState: { errors },  } = useForm<FormInputs>({
    defaultValues: {
      sizeQuantities: [{ id: Date.now(), size: '', color: '', quantity: 0 }],
      quantity: 0,
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sizeQuantities'
  });

  const sizeQuantities = watch('sizeQuantities');
  const hasSize = sizeQuantities && sizeQuantities.length > 0;

  const handleSave = () => {
    const data = watch(); // Lấy dữ liệu từ form
    if (hasSize) {
      // Tính tổng số lượng từ sizeQuantities
      data.quantity = sizeQuantities.reduce((total, item) => total + Number(item.quantity), 0);
    } else {
      data.sizeQuantities = []; // Đặt thành một mảng rỗng nếu không có size
    }
    console.log(data);
    onFormDataChange(data as Partial<ProductRequest>); // Cast về Partial<ProductRequest>
  };

  return (
    <div className="m-2 p-2 border-spacing-44 border-red-300 border">
      <h1>THÔNG TIN BÁN HÀNG</h1>

      <div>
        <form  className="p-4 space-y-4">
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
            <label className="block text-gray-700 mb-2">Sản phẩm có size?</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={hasSize}
                onChange={() => {
                  if (hasSize) {
                    remove();
                  } else {
                    append({ id: Date.now(), size: '', color: '', quantity: 0 });
                  }
                }}
                className="mr-2"
              />
              <span>Có</span>
            </div>
          </div>

          {hasSize ? (
            <div>
              <label className="block text-gray-700 mb-2">Thông tin Size, Màu và Số lượng</label>
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                  <div>
                    <label className="block text-gray-700">Size</label>
                    <input
                      type="text"
                      {...register(`sizeQuantities.${index}.size`, { required: true })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.sizeQuantities?.[index]?.size && <span className="text-red-500">This field is required</span>}
                  </div>

                  <div>
                    <label className="block text-gray-700">Màu</label>
                    <input
                      type="text"
                      {...register(`sizeQuantities.${index}.color`, { required: true })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.sizeQuantities?.[index]?.color && <span className="text-red-500">This field is required</span>}
                  </div>

                  <div>
                    <label className="block text-gray-700">Số lượng</label>
                    <input
                      type="number"
                      {...register(`sizeQuantities.${index}.quantity`, { required: true, min: 1 })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                    {errors.sizeQuantities?.[index]?.quantity && <span className="text-red-500">This field is required</span>}
                  </div>

                  <div className="md:col-span-3 flex justify-end">
                    <button type="button" onClick={() => remove(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => append({ id: Date.now(), size: '', color: '', quantity: 0 })}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Size
              </button>
            </div>
          ) : (
            <div>
              <label className="block text-gray-700">Số lượng</label>
              <input
                type="number"
                {...register('quantity', { required: true, min: 1 })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
              {errors.quantity && <span className="text-red-500">This field is required</span>}
            </div>
          )}

          <div className="flex justify-end">
            <button type="button" onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default FormPurchase;