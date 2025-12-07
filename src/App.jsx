import { Toaster, toast } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import StationManager from "./pages/StationManager";
import UserManager from "./pages/UserManager";
import LoginPage from "./pages/LoginPage";
import "./index.css";
import MapPage from "./pages/MapPage";
import ProtectedRoute from "./components/logic/ProtectedRoute";
import DetailStation from "./pages/DetailStation";
import CreateStation from "./pages/CreateStation";
import DetailUserPage from "./pages/DetailUserPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Trang login */}
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/stationManager"
            element={
              <ProtectedRoute>
                <StationManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stationManager/detailStation/:stationId"
            element={
              <ProtectedRoute>
                <DetailStation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stationManager/createStation"
            element={
              <ProtectedRoute>
                <CreateStation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/userManager"
            element={
              <ProtectedRoute>
                <UserManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userManager/detailUserPage/:userId"
            element={
              <ProtectedRoute>
                <DetailUserPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mapPage"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
