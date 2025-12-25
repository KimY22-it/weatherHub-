import React from "react";
import Title from "@/components/Title";
import LeafletMap from "./LeafletMap";
import { useAllLocations } from "./useController.js";

const Content = () => {
  const { stations, refetch: fetchLocation } = useAllLocations();

  return (

    <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
      <div className="flex justify-between items-center mb-1">
        <Title text="Bản đồ trạm" />
      </div>
      <div className="border border-gray-200 rounded-lg bg-white shadow-lg p-6 pb-2 pt-2">
        <div className="p-6 w-full mx-auto">
          <LeafletMap markers={stations || []} />
        </div>
      </div>
    </div>
  );
};

export default Content;
