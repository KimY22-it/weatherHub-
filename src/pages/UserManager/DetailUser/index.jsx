import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavLeft from "@/components/NavLeft";
import React from "react";
import Content from "./Content";

const DetailUserPage = () => {
    return (
        <div className="container pt-8 mx-auto bg-[#E6E9EE]">
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

export default DetailUserPage;
