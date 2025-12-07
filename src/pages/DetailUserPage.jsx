import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NavLeft from "@/components/NavLeft";
import DetailUser from "@/components/UserManager/DetailUser";
import React from "react";

const DetailUserPage = () => {
    return (
        <div className="container pt-8 mx-auto bg-[#E6E9EE]">
            {/* Đầu trang */}
            <Header />

            {/* Thanh điều hướng */}
            <NavLeft />

            {/* Các thẻ nội dung */}
            <DetailUser />

            {/* Chân trang */}
            <Footer />
        </div>
    );
};

export default DetailUserPage;
