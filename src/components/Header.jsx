import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import authService from "../apis/services/authService";
// Import ảnh
import logo from "../assets/img/logo.svg";
import logoutIcon from "../assets/img/log-out.svg";
import { LogOut } from "lucide-react";

const Header = ({ showLogout = true }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <div className="main-content w-full">
          <div className="body h-[55px] w-full flex justify-between items-center gap-4 bg-gradient-to-r from-[#5DAAD8] to-[#315A72]">
            <div className="logo ml-[30px]">
              <Link to="/" className="inner-logo flex items-center gap-2">

                <img src={logo} alt="WeatherHub" />
                <span className="logo-text text-white text-[30px] font-bold">
                  WeatherHub
                </span>
              </Link>
            </div>

            {showLogout && (
              <div className="log-out mr-[23px]">
                <button
                  onClick={handleLogout}
                  className="inner-log-out flex items-center gap-2 hover:scale-105 transition hover:cursor-pointer"
                >
                  <img
                    src={logoutIcon}
                    alt="Log Out"
                    className="w-[22px] h-[22px] object-contain"
                    style={{ filter: "brightness(1.2) saturate(0.6)" }}
                  />
                  <span className="log-out-text text-[#D9D9D9] text-lg hover:text-white">
                    Đăng xuất
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
