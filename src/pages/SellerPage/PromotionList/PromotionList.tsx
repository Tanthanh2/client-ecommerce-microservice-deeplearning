import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Dummy data for promotions (replace with actual data fetched from API)
const promotions = [
  { id: '1', name: 'Promotion A', startDate: new Date('2024-07-05'), endDate: new Date('2024-07-15'), description: 'Description for Promotion A' },
  { id: '2', name: 'Promotion B', startDate: new Date('2024-07-08'), endDate: new Date('2024-07-18'), description: 'Description for Promotion B' },
  { id: '3', name: 'Promotion C', startDate: new Date('2024-07-10'), endDate: new Date('2024-07-20'), description: 'Description for Promotion C' }
  // Add more promotions as needed
];

const PromotionList: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateFilter = () => {
    // Filter promotions based on selectedDate
    // For demonstration, log filtered promotions to console
    const filteredPromotions = promotions.filter(promotion => {
      if (!selectedDate) return true; // Return all if no date selected
      return promotion.startDate <= selectedDate && promotion.endDate >= selectedDate;
    });


    console.log('Filtered promotions:', filteredPromotions);
  };

  const handleEdit = (id: string) =>{

  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Danh sách chương trình khuyến mãi</h2>
      <div className="flex space-x-4 mb-4">
      <div>
          <label htmlFor="datePicker" className="block text-sm font-medium text-gray-700">
            Chọn ngày
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            selectsStart
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="datePicker"
            placeholderText="Chọn ngày"
            dateFormat="dd/MM/yyyy" // Customize date format if needed
          />
        </div>

        <button
          onClick={handleDateFilter}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Lọc
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {promotions.map(promotion => (
          <div key={promotion.id} className="border border-gray-200 rounded-md p-4 shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{promotion.name}</h3>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                onClick={() => handleEdit(promotion.id)}
              >
                Chỉnh sửa
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Ngày bắt đầu:</span> {promotion.startDate.toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Ngày kết thúc:</span> {promotion.endDate.toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Mô tả:</span> {promotion.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionList;
