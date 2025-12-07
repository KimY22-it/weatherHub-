import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-[260px] right-0 z-50 p-4 text-center text-sm text-gray-600 ">
      <p>
        &copy; {new Date().getFullYear()} WeatherHub. Connect your mini weather
        station and stay updated with real-time local forecasts.
      </p>
    </footer>
  );
};

export default Footer;
