import React from "react";
import { Card } from "./ui/card";

const Content = () => {
  return (
    <div className="absolute top-[65px] left-[260px] p-6 w-[calc(100%-260px)]">
      {/* Container for cards */}
      <div className="flex gap-6">
        {/* Card 1: Station Stats */}
        <Card className="p-4 border-0 bg-white shadow-lg flex-1">
          <h2 className="text-lg font-semibold mb-2">Tổng số trạm</h2>
          <p className="text-3xl font-bold mb-4">12</p>
          <ul className="text-sm space-y-1">
            <li className="flex items-center">
              <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
              Trạm online: 10
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
              Trạm offline: 2
            </li>
          </ul>
        </Card>

        {/* Card 2: User Stats */}
        <Card className="p-4 border-0 bg-white shadow-lg flex-1">
          <h2 className="text-lg font-semibold mb-2">Tổng số người dùng</h2>
          <p className="text-3xl font-bold mb-4">5</p>
          <ul className="text-sm space-y-1">
            <li className="flex items-center">
              <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
              Số người dùng online: 1
            </li>
            <li className="flex items-center">
              <span className="h-2 w-2 bg-gray-400 rounded-full mr-2"></span>
              Số người dùng offline: 4
            </li>
          </ul>
        </Card>

        {/* You can add more cards here */}
        {/* <Card className="p-4 border-0 bg-white shadow-lg flex-1">
          ...
        </Card> */}
      </div>

      {/* Other content can go here */}
    </div>
  );
};

export default Content;
