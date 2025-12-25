import Content from "@/pages/MapPage/Content";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavLeft from "@/components/NavLeft";
import React from "react";

const MapPage = () => {
  return (
    <div className="container pt-8 mx-auto bg-[#D9D9D9]">
      {/* Đầu trang */}
      <Header />

      {/* Thanh điều hướng */}
      <NavLeft />

      {/* Các thẻ nội dung */}
      <Content />

      {/* Chân trang */}
      <Footer />
    </div>
  );
};

export default MapPage;
