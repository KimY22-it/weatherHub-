import React from "react";
import { Link, useLocation } from "react-router-dom";
// Import ảnh
import userAvatar from "../assets/img/user.svg";
import homeIcon from "../assets/img/home.svg";
import barIcon from "../assets/img/bar.svg";
import mapIcon from "../assets/img/map.svg";
import userManageIcon from "../assets/img/user-manage.svg";
import { Home, HomeIcon } from "lucide-react";

const NavLeft = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Định nghĩa các lớp CSS để dễ quản lý
  const baseLinkClass = "nav-link flex items-center gap-3 p-4 transition";
  const activeLinkClass = "bg-[#0e1a20] font-bold"; // Lớp cho mục đang active
  const inactiveLinkClass = "hover:bg-[#0e1a20]"; // Lớp cho mục không active

  return (
    <div className="nav-container w-[260px] h-[calc(100vh-55px)] fixed top-[55px] left-0 bg-[#222d32] text-white shadow-lg flex flex-col">
      {/* USER */}
      <div className="user flex items-center gap-3 p-4 border-b border-white/20 h-[150px] flex-col justify-center">
        <img
          src={userAvatar}
          alt="User Avatar"
          className="user-avatar w-10 h-10"
        />
        <div className="user-name text-lg font-bold pt-2">Admin</div>
      </div>

      {/* NAVIGATION */}
      <nav className="nav-bar flex-1">
        <ul className="nav-list flex flex-col">
          <li>
            <Link
              to="/"
              className={`${baseLinkClass} ${pathname === "/" ? activeLinkClass : inactiveLinkClass
                }`}
            >
              <img src={homeIcon} className="w-6 h-6" alt="Home" />
              <span className="text-base">Trang chủ</span>
            </Link>
          </li>

          <li>
            <Link
              to="/stationManager"
              className={`${baseLinkClass} ${pathname === "/stationManager" ||
                pathname.startsWith("/stationManager/detailStation") ||
                pathname === "/stationManager/createStation"
                ? activeLinkClass
                : inactiveLinkClass
                }`}
            >
              <img src={barIcon} className="w-6 h-6" alt="Station" />
              <span className="text-base">Quản lý hệ thống trạm</span>
            </Link>
          </li>

          <li>
            <Link
              to="/mapPage" // Sẽ cập nhật khi có trang Bản đồ
              className={`${baseLinkClass} ${pathname === "/mapPage" ? activeLinkClass : inactiveLinkClass
                }`} // Tạm thời luôn inactive
            >
              <img src={mapIcon} className="w-6 h-6" alt="Map" />
              <span className="text-base">Bản đồ trạm</span>
            </Link>
          </li>

          <li>
            <Link
              to="/userManager"
              className={`${baseLinkClass} ${pathname === "/userManager" ||
                pathname.startsWith("/userManager/detailUser")
                ? activeLinkClass
                : inactiveLinkClass
                }`}
            >
              <img
                src={userManageIcon}
                className="w-6 h-6"
                alt="User Management"
              />
              <span className="text-base">Quản lý người dùng</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavLeft;
