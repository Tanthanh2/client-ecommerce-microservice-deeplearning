import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import categoryApi from 'src/apis/categoriest';
import { useQuery } from '@tanstack/react-query';
import { TailSpin } from 'react-loader-spinner';
import { storage } from 'src/configs/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ProductRequest } from 'src/constants/contant';

interface FormBasicProps {
  formData: ProductRequest;
  onFormDataChange: (newData: Partial<ProductRequest>) => void;
}

interface FormInputs {
  images: string[];
  name: string;
  description: string;
  categoryId: number;
  image: string;
}

const ProductForm: React.FC<FormBasicProps> = ({ formData, onFormDataChange }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (files) {
      setLoading(true);
      const promises: Promise<string>[] = [];
      Array.from(files).forEach((file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytes(storageRef, file).then(async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          return downloadURL;
        });
        promises.push(uploadTask);
      });

      try {
        const downloadURLs = await Promise.all(promises);
        alert('Files uploaded successfully!');
        setImagePreviews(downloadURLs);
        return downloadURLs;
      } catch (error) {
        console.error('Error uploading files:', error);
        alert('Error uploading files.');
        return [];
      } finally {
        setLoading(false);
      }
    } else {
      alert('No files selected.');
      return [];
    }
  };

  const { register, handleSubmit, formState: { errors } ,watch } = useForm<FormInputs>();
  // Theo dõi dữ liệu form
  const formValues = watch();
  const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Ngăn chặn hành vi submit của form

    const uploadedImages = await handleUpload();

    // Check if images are uploaded successfully
    if (uploadedImages.length === 0) {
      alert('Please upload at least one image before saving the form.');
      return; // Prevent submission if no images were uploaded
    }

    const data1: FormInputs = {
      images: uploadedImages,
      name: formValues.name,
      description: formValues.description,
      categoryId: formValues.categoryId,
      image: uploadedImages[0], // Use the first uploaded image as the main image
    };

    console.log(data1);
    onFormDataChange(data1);
  };

  // Fetch categories using useQuery
  const { data, error, isLoading } = useQuery(['categoriesList'], categoryApi.getCategories, {
    onError: (error) => {
      console.error('Error fetching categories:', error);
    }
  });

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories</p>;

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
                  onChange={handleChange}
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
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {imagePreviews.map((img, i) => (
                <img className="w-64 h-32" src={img} alt={"image-" + i} key={i} />
              ))}
            </div>
          )}
        </div>

        <form className="p-4 space-y-4">
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
              {...register('categoryId', { required: true })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              {data?.data.data.map(industry => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <span className="text-red-500">This field is required</span>}
          </div>

          {loading && <TailSpin height="50" width="50" color="blue" ariaLabel="loading" />}
          <button type="button" onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Ấn Lưu trước khi chuyển
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
