import React, { useState } from 'react';

interface ShopFormProps {}

const ShopProfile: React.FC<ShopFormProps> = () => {
  const [formData, setFormData] = useState({
    shopName: '',
    shopAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWBpWCt8mEim-vwUaNaijfL_YnH-r0fhzgDA&s',
    shopDescription: '',
    businessType: '',
    businessAddress: '',
    invoiceEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Shop Information</h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="shopName" className="block text-sm font-medium text-gray-700">
            Shop Name
          </label>
          <input
            type="text"
            name="shopName"
            id="shopName"
            value={formData.shopName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="shopAvatar" className="block text-sm font-medium text-gray-700">
            Shop Avatar
          </label>
          <input
            type="text"
            name="shopAvatar"
            id="shopAvatar"
            value={formData.shopAvatar}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
          {formData.shopAvatar && (
            <div className="mt-4">
              <img
                src={formData.shopAvatar}
                alt="Shop Avatar"
                className="w-32 h-32 object-cover rounded-full mx-auto shadow-md"
              />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="shopDescription" className="block text-sm font-medium text-gray-700">
            Shop Description
          </label>
          <textarea
            name="shopDescription"
            id="shopDescription"
            value={formData.shopDescription}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>
        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
            Business Type
          </label>
          <input
            type="text"
            name="businessType"
            id="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700">
            Business Registration Address
          </label>
          <input
            type="text"
            name="businessAddress"
            id="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="invoiceEmail" className="block text-sm font-medium text-gray-700">
            Email for Receiving Electronic Invoices
          </label>
          <input
            type="email"
            name="invoiceEmail"
            id="invoiceEmail"
            value={formData.invoiceEmail}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopProfile;
