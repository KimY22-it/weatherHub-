import React from "react";
import GoogleMap from "./GoogleMap";
import Title from "../Title";
import { useAllLocations } from "./controllerMap";
import LeafletMap from "./LeafletMap";

const ContentMap = () => {
  const { stations, refetch: fetchLocation } = useAllLocations();
  console.log(stations);
  const markers = stations ? stations.map((station) => station.marker) : [];
  console.log(markers);
  return (
    <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
      <div className="flex justify-between items-center mb-1">
        <Title text="Bản đồ trạm" />
      </div>
      <div className="p-6 max-w-5xl mx-auto">
        {/* <GoogleMap markers={stations || []} /> */}
        <LeafletMap markers={stations || []} />
      </div>
    </div>
  );
};

export default ContentMap;
