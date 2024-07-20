import React, { useState } from 'react';
import path from 'src/constants/path';
import { purchasesStatus } from 'src/constants/purchase';
import { createSearchParams, Link } from 'react-router-dom';
import useQueryParams from 'src/hooks/useQueryParams';
import { formatCurrency, generateNameId } from 'src/utils/utils';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' },
  { status: purchasesStatus.refund, name: 'Hoàn tiền' },
  { status: purchasesStatus.indelevered, name: 'Giao không thành công' }
];

export default function Order() {
  const queryParams: { status?: string } = useQueryParams();
  const status = Number(queryParams.status) || purchasesStatus.all;

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchDate, setSearchDate] = useState<[Date | null, Date | null] | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSearch = () => {
    setSearchDate([startDate, endDate]);
    // Thực hiện tìm kiếm hoặc xử lý khác tại đây với searchDate
  };

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.order,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ));

  return (
    <div className='overflow-x-auto my-2'>
      <div className='flex justify-between bg-slate-200 rounded-lg p-4'>
        <div>
          <h1 className='my-2'>QUẢN LÝ ĐƠN HÀNG</h1>
        </div>
      </div>

      <div className='my-4 flex items-center'>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          isClearable
          placeholderText='Chọn khoảng thời gian'
          className='p-2 border rounded-md'
        />
        <button
          onClick={handleSearch}
          className='ml-2 p-2 bg-blue-500 text-white rounded-md'
        >
          Tìm
        </button>
      </div>

      <div>
        <div className='overflow-x-auto'>
          <div className='min-w-[700px]'>
            <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          </div>
        </div>

        <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
          <div className='col-span-6'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input
                  type='checkbox'
                  className='h-5 w-5 accent-orange'
                />
              </div>
              <div className='flex-grow text-black'>Sản phẩm</div>
            </div>
          </div>
          <div className='col-span-6'>
            <div className='grid grid-cols-5 text-center'>
              <div className='col-span-2'>Tổng tiền</div>
              <div className='col-span-1'>Số lượng</div>
              <div className='col-span-1'>Trạng thái</div>
              <div className='col-span-1'>Thao tác</div>
            </div>
          </div>
        </div>

        {/* DANH SÁCH SẢN PHẨM */}
        <div className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'>
          <div className='col-span-6'>
            <div className='flex'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <input
                  type='checkbox'
                  className='h-5 w-5 accent-orange'
                />
              </div>
              <div className='flex-grow'>
                <div className='flex'>
                  <div className='h-20 w-20 flex-shrink-0'>
                    <img alt="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg" src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg" />
                  </div>
                  <div className='flex-grow px-2 pt-1 pb-2'>
                    <div className='text-left line-clamp-2'>
                      TÊN SẢN PHẨM NÈ
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-6'>
            <div className='grid grid-cols-5 items-center'>
              <div className='col-span-2'>
                <div className='flex items-center justify-center'>
                  <span className='ml-3'>₫{formatCurrency(100000)}</span>
                </div>
              </div>
              <div className='col-span-1'>
                <div>10</div>
              </div>
              <div className='col-span-1'>
                <span className='text-orange'>
                  chờ xác nhận
                </span>
              </div>
              <div className='col-span-1'>
                <button
                  className='text-black transition-colors text-red-300 m-2 hover:text-orange'
                >
                  xem chi tiết
                </button>
                <button
                  className='text-black transition-colors text-green-400 m-2 hover:text-slate-300'
                >
                  in đơn hàng
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* END DANH SÁCH SẢN PHẨM */}
      </div>
    </div>
  );
}
