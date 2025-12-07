
import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const center = {
    lat: 10.762622,
    lng: 106.660172,
};

export default function GoogleMapComponent({ markers = [center] }) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // Debug: Check if API key is loaded
    console.log("API Key loaded:", apiKey ? "Yes (starts with " + apiKey.substring(0, 10) + "...)" : "No - API key is undefined!");

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
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
                {markers.map((m, idx) => (
                    <Marker key={idx} position={{ lat: m.lat, lng: m.lng }} />
                ))}
            </GoogleMap>
        </div>
    );
}
