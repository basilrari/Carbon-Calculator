import React, { useState } from "react";
import MyButton from "../../MyButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import myServer from "@/utils/Axios/axios";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import TransactionConfirmationModal from '@/Components/confirm/confirmTransaction';

const LoadingOverlay = () => (
  <div className="fixed inset-0 z-[9999] w-full h-full ">
    {/* Base background */}

    {/* Blurred overlay */}
    <div className="absolute inset-0 backdrop-blur-xl bg-white/50" />

    {/* Content container */}
    <div className="relative h-full flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl max-w-md w-full border border-white/20">
        <div className="flex flex-col items-center space-y-8">
          {/* Main loading spinner */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-800/20 animate-pulse"></div>
            <div className="relative w-20 h-20">
              <Loader2 className="w-20 h-20 text-emerald-800 animate-spin" />
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-emerald-800 animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          {/* Text content */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-emerald-900">
              Processing Your Retirement
            </h2>
            <div className="space-y-3">
              <p className="text-emerald-700 font-medium">
                Securing your transaction on the blockchain
              </p>
              <div className="flex items-center justify-center space-x-2 text-red-500">
                <svg
                  className="w-5 h-5 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="font-semibold">
                  Please do not refresh or close this page
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-800 h-2 rounded-full transition-all duration-[5000ms] ease-linear"
              style={{
                width: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RetireAsset = ({
  totalQuantity = 0,
  selectedCount = 0,
  contractAddress = "",
}) => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    retiredBy: "",
    beneficiary: "",
    beneficiaryAddress: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const encryptedPrivateKey = window.localStorage.getItem(
    "encryptedPrivateKey"
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.retiredBy.trim()) {
      newErrors.retiredBy = "This field is required";
    }
    if (!formData.beneficiary.trim()) {
      newErrors.beneficiary = "This field is required"; // Add validation for beneficiary
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

const handleRetire = async () => {
  if (!showForm) {
    setShowForm(true);
    return;
  }

  if (!validateForm()) {
    return;
  }

  setShowConfirmation(true); // Show the confirmation modal
};

const confirmTransaction = async () => {
  setShowConfirmation(false); // Close the confirmation modal
  setLoading(true);

  const walletAddress = window.localStorage.getItem("walletAddress");
  const data = {
    name: formData.retiredBy,
    recipientAddress: formData.beneficiaryAddress || walletAddress,
    projectName: formData.beneficiary,
    amount: totalQuantity,
    tokenAddress: contractAddress,
    encryptedPrivateKey: encryptedPrivateKey,
  };

  try {
    const response = await myServer.post("/retire/retireCarbonCredits", data);
    console.log("API Response:", response.data);

    toast.success(
      `Retirement successful with Txn Hash: ${response.data.transactionHash}`,
      {
        duration: 4000,
        style: { maxWidth: "300px", fontSize: "14px" },
      }
    );

    setTimeout(() => {
      router.push("/decarb/retirements");
    }, 4500);
  } catch (error) {
    console.error("Retirement failed:", error);
    toast.error("Retirement failed. Please try again.");
  }

  setLoading(false);
};

  return (
    <div className={`relative ${loading ? " pointer-events-none" : ""}`}>
      <Toaster />
      {/* ✅ Loading Overlay */}
      {loading && <LoadingOverlay />}
      <div className="bg-[#f0dfbe] rounded-lg p-6 w-auto mx-auto shadow-md font-sans">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold text-gray-700 mb-4">
            {selectedCount} Carbon Assets Selected
          </h2>
        </div>

        <div className="flex justify-between mb-6">
          <p className="text-md font-medium text-gray-600">
            Quantity:{" "}
            <span className="text-lg font-bold text-gray-800">
              {totalQuantity}
            </span>
          </p>
        </div>

        {showForm && (
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="retiredBy"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                RETIRED BY <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="retiredBy"
                name="retiredBy"
                value={formData.retiredBy}
                onChange={handleInputChange}
                required
                placeholder="Enter name"
                className={`w-full p-2 border ${
                  errors.retiredBy ? "border-red-500" : "border-gray-300"
                } rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500`}
              />
              {errors.retiredBy && (
                <p className="mt-1 text-sm text-red-500">{errors.retiredBy}</p>
              )}
            </div>

            <div>
  <label
    htmlFor="beneficiary"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    BENEFICIARY <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    id="beneficiary"
    name="beneficiary"
    value={formData.beneficiary}
    onChange={handleInputChange}
    className={`w-full p-2 border ${
      errors.beneficiary ? "border-red-500" : "border-gray-300"
    } rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500`}
  />
  {errors.beneficiary && (
    <p className="mt-1 text-sm text-red-500">{errors.beneficiary}</p>
  )}
</div>

            <div className="col-span-2">
              <label
                htmlFor="beneficiaryAddress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                BENEFICIARY ADDRESS
              </label>
              <input
                type="text"
                id="beneficiaryAddress"
                name="beneficiaryAddress"
                value={formData.beneficiaryAddress}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Link href="/decarb/retirements">
            <MyButton text="BACK" variant="red" />
          </Link>
          <MyButton
            text={showForm ? "RETIRE" : "RETIRE"}
            onClick={handleRetire}
            variant="green"
          />
          {showConfirmation && (
        <TransactionConfirmationModal
          onConfirm={confirmTransaction}
          onCancel={() => setShowConfirmation(false)}
          selectedItems={[{ id: contractAddress, selectedQuantity: totalQuantity }]}
          type="retire"
        />
      )}
        </div>
      </div>
    </div>
  );
};

export default RetireAsset;
