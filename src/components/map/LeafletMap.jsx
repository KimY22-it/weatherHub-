import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

// Fix lỗi icon không hiển thị
function fixLeafletIcon() {
  const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
  const iconShadow =
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

  const DefaultIcon = L.icon({
    iconUrl,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  L.Marker.prototype.options.icon = DefaultIcon;
}

const LeafletMap = () => {
  useEffect(() => {
    fixLeafletIcon();
  }, []);

  // Danh sách marker
  const stations = [
    { id: 1, name: "Trạm Hồ Chí Minh", position: [10.762622, 106.660172] },
    { id: 2, name: "Trạm Hà Nội", position: [21.027763, 105.83416] },
    { id: 3, name: "Trạm Đà Nẵng", position: [16.047079, 108.20623] },
  ];

  return (
    <MapContainer
      center={[16.047079, 108.20623]}
      zoom={5}
      style={{ height: "500px", width: "100%", borderRadius: "10px" }}
    >
      {/* Nền bản đồ từ OpenStreetMap */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Render nhiều marker */}
      {stations.map((st) => (
        <Marker key={st.id} position={st.position}>
          <Popup>{st.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
