import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Title from "@/components/Title";
import { createStations } from "../useController";

const CreateSta = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdCount, setCreatedCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate quantity
    const validQuantity = parseInt(quantity, 10);
    if (!validQuantity || validQuantity < 1) {
      toast.error("Vui lòng nhập số lượng hợp lệ (tối thiểu 1)!");
      setQuantity(1);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createStations(validQuantity);

      if (result) {
        // Success - result is the API response
        setCreatedCount(result.data?.length || validQuantity);
        setShowSuccessModal(true);
        console.log("Created stations:", result);
      } else {
        // result is null (error case)
        toast.error("Có lỗi xảy ra khi tạo trạm!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Có lỗi xảy ra khi tạo trạm!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/stationManager");
  };

  return (
    <div className="absolute top-[55px] left-[260px] p-6 pb-2 pt-2 w-[calc(100%-260px)] bg-gray-50 min-h-[calc(100vh-55px)]">
      <div className="flex justify-between items-center mb-1">
        <Title text="Tạo trạm" />
      </div>

      {/* Centered card for the form */}
      <div className="mt-8 flex justify-center">
        <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md relative">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Nhập số lượng
            </h2>

            {/* Quantity Input */}
            <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-gray-700 text-sm font-bold mb-2 sr-only"
              >
                Số lượng trạm
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow empty input for editing
                  if (value === "") {
                    setQuantity("");
                  } else {
                    const num = parseInt(value, 10);
                    if (!isNaN(num) && num >= 1) {
                      setQuantity(num);
                    } else if (num < 1) {
                      // Optionally, set to 1 if user tries to type 0 or negative
                      setQuantity(1);
                    }
                  }
                }}
                className="shadow-inner appearance-none border border-gray-300 rounded-lg w-full py-4 px-5 text-gray-800 text-center text-xl leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-center justify-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-wait"
              >
                {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/stationManager")}
                className="w-full bg-transparent hover:bg-gray-100 text-gray-600 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Hủy
              </button>
            </div>
          </form>

          {/* Success Modal - Centered within form card */}
          {showSuccessModal && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-white rounded-lg shadow-2xl border border-gray-300 p-6 min-w-[200px] text-center">
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  Tạo {createdCount} trạm thành công!
                </p>
                <button
                  onClick={handleCloseModal}
                  className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-8 rounded transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateSta;
