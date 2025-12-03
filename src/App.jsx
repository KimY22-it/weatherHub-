import { Toaster, toast } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import StationManager from "./pages/StationManager";
import UserManager from "./pages/UserManager";
import LoginPage from "./pages/LoginPage";
import "./index.css";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/stationManager" element={<StationManager />} />
          <Route path="/userManager" element={<UserManager />} />
          <Route path="/mapPage" element={<MapPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
