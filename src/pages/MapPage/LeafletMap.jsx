import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

// Fix lỗi icon không hiển thị và đổi màu đỏ
function fixLeafletIcon() {
  const iconUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
  const iconShadow =
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png";

  const DefaultIcon = L.icon({
    iconUrl,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  L.Marker.prototype.options.icon = DefaultIcon;
}

const LeafletMap = ({ markers = [] }) => {
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  return (
    <MapContainer
      center={[20.981194861458295, 105.796131297053622]}
      zoom={10}
      style={{ height: "500px", width: "100%", borderRadius: "10px", color: "red" }}
    >
      {/* Nền bản đồ từ OpenStreetMap */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Render nhiều marker */}

      {markers.map((m, idx) => (
        <Marker
          key={idx}
          position={{ lat: m.marker.lat, lng: m.marker.lng }}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup(),
            mouseout: (event) => event.target.closePopup(),
          }}
        >
          <Popup>
            <div className="p-2 min-w-[150px]">
              <h3 className="font-bold text-lg mb-1">{m.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{m.location}</p>
              <div
                className={`text-xs font-semibold px-2 py-1 rounded inline-block ${m.isPublic
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
                  }`}
              >
                {m.isPublic ? "Đang chia sẻ" : "Đã khóa"}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
