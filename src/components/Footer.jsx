import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-[260px] right-0 z-50 bg-white p-4 text-center text-sm text-gray-600 shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.1)]">
      <p>
        &copy; {new Date().getFullYear()} WeatherHub. Connect your mini weather
        station and stay updated with real-time local forecasts.
      </p>
    </footer>
  );
};

export default Footer;
