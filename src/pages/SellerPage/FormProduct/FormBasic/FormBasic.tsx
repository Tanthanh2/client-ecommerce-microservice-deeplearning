import React, {useState} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormInputs {
  name: string;
  description: string;
  industry: string;
  type: string;
  details: string;
}

const industries = [
  { value: 'tech', label: 'Technology' },
  { value: 'health', label: 'Health' },
];



const ProductForm: React.FC = () => {
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [imgs, setImgs] = useState<File[] | null>(null);

    const selectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          const selectedFiles: File[] = Array.from(event.target.files); // Chuyển HTMLCollection thành mảng File
          setImgs(selectedFiles); // Cập nhật state imgs với danh sách các file đã chọn
      
          const images: string[] = [];
          for (let i = 0; i < selectedFiles.length; i++) {
            images.push(URL.createObjectURL(selectedFiles[i]));
          }
          setImagePreviews(images);
        }
      };




  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
  };

  return (
    <div className="m-2 p-2 border-spacing-44 border-red-300 border">
        <h1>THÔNG TIN CƠ BẢN</h1>
        <div>

        <div className="m-4 p-4">
        <h1 className="text-red-500 text-xl font-semibold mb-4">Chọn ảnh sản phẩm</h1>
        <div className="row m-4 p-4">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={selectFiles}
              />
            </label>
          </div>
          <ul className="divide-y divide-gray-200">
            <li className="py-4 flex items-center">
              <span className="h-2 w-2 bg-gray-500 rounded-full mr-3"></span>
              <p className="text-gray-700">Tải lên hình ảnh 1:1</p>
            </li>
            <li className="py-4 flex items-center">
              <span className="h-2 w-2 bg-gray-500 rounded-full mr-3"></span>
              <p className="text-gray-700">Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi ý hôm nay,... Việc sử dụng ảnh bìa đẹp sẽ thu hút thêm lượt truy cập vào sản phẩm của bạn</p>
            </li>
          </ul>
        </div>
        {imagePreviews && (
          <div className="grid grid-cols-4 gap-4">
            {imagePreviews.map((img, i) => {
              return (
                <img className="w-64 h-32" src={img} alt={"image-" + i} key={i} />
              );
            })}
          </div>
        )}
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
            <div>
                <label className="block text-gray-700">Tên sản phẩm</label>
                <input
                type="text"
                {...register('name', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                {errors.name && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
                <label className="block text-gray-700">Mô tả</label>
                <input
                type="text"
                {...register('description', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                {errors.description && <span className="text-red-500">This field is required</span>}
            </div>

            <div>
                <label className="block text-gray-700">Ngành hàng</label>
                <select
                {...register('industry', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                {industries.map(industry => (
                    <option key={industry.value} value={industry.value}>
                    {industry.label}
                    </option>
                ))}
                </select>
                {errors.industry && <span className="text-red-500">Loại sản phẩm</span>}
            </div>

            <div>
                <label className="block text-gray-700">Chi tiết</label>
                <input
                type="text"
                {...register('details', { required: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
                {errors.details && <span className="text-red-500">This field is required</span>}
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Lưu
            </button>
        </form>

        </div>
    </div>
  );
};

export default ProductForm;
