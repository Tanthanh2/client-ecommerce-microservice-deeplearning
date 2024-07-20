import React, { useState, useEffect } from 'react';
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import axios from 'axios';
import { City, District, Ward } from 'src/constants/contant'


export default function RegisterSeller() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedWard, setSelectedWard] = useState<string>('');
  const [specificAddress, setSpecificAddress] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<any>('https://online-gateway.ghn.vn/shiip/public-api/master-data/province',{
          headers: {
            'token': '5b44734c-e7ae-11ee-8529-6a2e06bbae55'
          }
        });
        setCities(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value.split("_")[1];
    setSelectedCity(e.target.value);
    console.log('Selected city:', cityId);
    fetchDatadistrict(cityId)

  };

  const fetchDatadistrict = async (id: any) => {
    try {
      const response = await axios.get<any>(
        'https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
        {
          headers: {
            'token': '5b44734c-e7ae-11ee-8529-6a2e06bbae55'
          },
          params: {
            province_id: id
          }
        }
      );
      setDistricts(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = e.target.value.split("_")[1];
    setSelectedDistrict(e.target.value);
    fetchDataward(districtId)
  };
  const fetchDataward = async (id: any) => {
    try {
      const response = await axios.get<any>(
        'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward',
        {
          headers: {
            'token': '5b44734c-e7ae-11ee-8529-6a2e06bbae55'
          },
          params: {
            district_id : id
          }
        }
      );
      setWards(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWard(e.target.value);
  };






  return (
    <div className='h-[800px] bg-orange'>
    <div className='container bg-shopee bg-contain bg-center bg-no-repeat'>
        <div className='grid grid-cols-1 py-12 lg:h-[470px] lg:grid-cols-5 lg:pr-10'>
          <div className='md:col-span-2 md:col-start-4 md:mx-8'>
            <form className='rounded bg-white p-10 shadow-sm'>
              <div className='text-2xl'>Đăng ký shop bán hàng</div>
              <Input
                className='mt-6'
                type='text'
                placeholder='Tên shop'
                name='nameShop'
                // register={register}
                // errorMessage={errors.email?.message}
              />
              <Input
                className='my-2'
                type='text'
                placeholder='Loại hình kinh doanh'
                name='typeBusiness'
                // register={register}
                // errorMessage={errors.password?.message}
              />
              <Input
                className='my-2'
                type='text'
                placeholder='Mô tả shop'
                name='shopDescription'
                // register={register}
                // errorMessage={errors.password?.message}
              />

              <div>
                <div className='text-2xl'>Địa Chỉ Kinh Doanh</div>
              </div>

              <div className="flex flex-col items-center space-y-4">
  <select 
    value={selectedCity} 
    onChange={handleCityChange} 
    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
  >
    <option value="">Chọn tỉnh thành</option>
    {cities.map(city => (
      <option key={city.ProvinceID} value={`${city.ProvinceName}_${city.ProvinceID}`}>{city.ProvinceName}</option>
    ))}
  </select>
  <select 
    value={selectedDistrict} 
    onChange={handleDistrictChange} 
    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
  >
    <option value="">Chọn quận huyện</option>
    {districts.map(district => (
      <option key={district.DistrictID} value={`${district.DistrictName}_${district.DistrictID}`}>{district.DistrictName}</option>
    ))}
  </select>
  <select 
    value={selectedWard} 
    onChange={handleWardChange} 
    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
  >
    <option value="">Chọn phường xã</option>
    {wards.map(ward => (
      <option key={ward.WardCode} value={`${ward.WardName}_${ward.WardCode}`}>{ward.WardName}</option>
    ))}
  </select>

</div>
              <Input
                className='my-2'
                type='text'
                placeholder='Địa chỉ cụ thể'
                name='detailAddress'
                // register={register}
                // errorMessage={errors.password?.message}
              />


              <Button
                type='button'
                // isLoading={loginAccountMutation.isLoading}
                // disabled={loginAccountMutation.isLoading}
                className='flex w-full justify-center bg-red-500 px-2 py-4 text-sm uppercase text-white hover:bg-red-600'
              >
                Đăng ký Shop
              </Button>
            </form>
          </div>
        </div>
    </div>
    </div>
  )
}
