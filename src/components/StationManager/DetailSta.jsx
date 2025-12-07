import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Circle,
  Edit,
  Icon,
  IdCard,
  IdCardIcon,
  Locate,
  MailSearch,
  Map,
  TicketIcon,
  UserCog,
} from "lucide-react";
import Title from "../Title";
import { useStationById } from "./stationController";

const DetailSta = () => {
  const { stationId } = useParams(); // Gọi hook ở đầu
  const { station, loading, error } = useStationById(stationId);

  if (loading) {
    return (
      <div className="absolute top-[55px] left-[260px] p-6 w-[calc(100%-260px)]">
        <Title text="Thông tin chi tiết trạm" />
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-[55px] left-[260px] p-6 w-[calc(100%-260px)]">
        <Title text="Thông tin chi tiết trạm" />
        <div className="bg-white p-6 rounded-lg shadow-lg text-center text-red-500">
          Lỗi: {error}
        </div>
      </div>
    );
  }

  // Nếu không tìm thấy trạm, hiển thị thông báo
  if (!station) {
    return (
      <div className="absolute top-[55px] left-[260px] p-6 w-[calc(100%-260px)]">
        <Title text="Lỗi" />
        <p>Không tìm thấy thông tin trạm.</p>
      </div>
    );
  }

  return (
    <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
      <div className="flex justify-between items-center mb-1">
        <Title text="Thông tin chi tiết trạm" />
      </div>

      {/* Card chứa dữ liệu */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Bảng dữ liệu */}
        <div className="w-full max-w-4xl mx-auto border rounded-lg overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-white border-b">
            <h2 className="text-lg font-semibold text-[#035e9b]">
              Thông tin trạm {station.name}
            </h2>
          </div>

          {/* Body */}
          <div className="flex">
            {/* Cột trái */}
            <div className="bg-[#035e9b] text-white w-1/4 p-4 space-y-5">
              <p className="font-medium">
                <IdCard className="inline" /> Mã trạm:
              </p>
              <p className="font-medium">
                <Edit className="inline" /> Tên trạm:
              </p>
              <p className="font-medium">
                <TicketIcon className="inline" /> Mã Token:
              </p>
              <p className="font-medium">
                <Map className="inline" /> Vị trí:
              </p>
              <p className="font-medium">
                <UserCog className="inline" /> Chủ sở hữu:
              </p>
              <p className="font-medium">Trạng thái kích hoạt:</p>
              <p className="font-medium">Trạng thái kết nối:</p>
              <p className="font-medium">Ngày tạo:</p>
              <p className="font-medium">Cập nhật lần cuối:</p>
            </div>

            {/* Cột phải */}
            <div className="bg-gray-100 text-gray-800 w-3/4 p-4 space-y-5">
              <p>{station.name}</p>
              <p>{station.token}</p>
              <p>{station.location}</p>
              <p>{station.owner}</p>
              <p>{station.activationStatus}</p>
              <p>{station.connectionStatus}</p>
              <p>{station.createdAt}</p>
              <p>{station.lastUpdatedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSta;
