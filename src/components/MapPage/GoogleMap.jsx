
import React, { useState } from "react";
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const center = {
    lat: 20.981194861458295,
    lng: 105.796131297053622,
};

export default function GoogleMapComponent({ markers = [] }) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const [activeMarker, setActiveMarker] = useState(null);

    // Debug: Check if API key is loaded
    console.log(
        "API Key loaded:",
        apiKey
            ? "Yes (starts with " + apiKey.substring(0, 10) + "...)"
            : "No - API key is undefined!"
    );

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
    });

    if (loadError) {
        console.error("Google Maps Load Error:", loadError);
        return (
            <div className="p-4 text-red-600">
                <p className="font-bold">Lỗi tải Google Maps</p>
                <p className="text-sm">{loadError.message}</p>
            </div>
        );
    }
    if (!isLoaded) {
        return <div className="p-4 text-gray-600">Đang tải bản đồ…</div>;
    }

    return (
        <div className="w-full h-[500px] rounded-xl shadow-lg overflow-hidden border border-gray-300">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                onClick={() => setActiveMarker(null)}
            >
                {markers.map((m, idx) => (
                    <Marker
                        key={idx}
                        position={{ lat: m.marker.lat, lng: m.marker.lng }}
                        onMouseOver={() => setActiveMarker(m)}
                    >
                        {activeMarker === m && (
                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                <div className="p-2 min-w-[150px]">
                                    <h3 className="font-bold text-lg mb-1">{m.name}</h3>
                                    <p className="text-sm text-gray-600 mb-1">{m.location}</p>
                                    <div
                                        className={`text-xs font-semibold px-2 py-1 rounded inline-block ${m.isPublic
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {m.isPublic ? "Đang chia sẻ" : "Đã khóa"}
                                    </div>
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                ))}
            </GoogleMap>
        </div>
    );
}
