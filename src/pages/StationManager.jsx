import ContentSta from "@/components/StationManager/ContentSta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavLeft from "@/components/NavLeft";
import React from "react";

const StationManager = () => {
  return (
    <div className="container pt-8 mx-auto bg-[#E6E9EE]">
      {/* Đầu trang */}
      <Header />

      {/* Thanh điều hướng */}
      <NavLeft />

      {/* Các thẻ nội dung */}
      <ContentSta />

      {/* Chân trang */}
      <Footer />
    </div>
  );
};

export default StationManager;
