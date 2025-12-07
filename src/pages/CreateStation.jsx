import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavLeft from "@/components/NavLeft";
import CreateSta from "@/components/StationManager/CreateSta";

import React from "react";

const CreateStation = () => {
  return (
    <div className="container pt-8 mx-auto bg-[#E6E9EE]">
      {/* Đầu trang */}
      <Header />

      {/* Thanh điều hướng */}
      <NavLeft />

      {/* Các thẻ nội dung */}
      <CreateSta />

      {/* Chân trang */}
      <Footer />
    </div>
  );
};

export default CreateStation;
