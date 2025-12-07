import React from "react";
import GoogleMap from "./api/GoogleMap";
import Title from "./Title";

const markers = [
  { lat: 10.762622, lng: 106.660172 },
  { lat: 10.776889, lng: 106.700806 },
];
const ContentMap = () => {
  return (
    <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)]">
      <div className="flex justify-between items-center mb-1">
        <Title text="Bản đồ trạm" />
      </div>
      <div className="p-6 max-w-5xl mx-auto">
        <GoogleMap markers={markers} />
      </div>
    </div>
  );
};

export default ContentMap;
