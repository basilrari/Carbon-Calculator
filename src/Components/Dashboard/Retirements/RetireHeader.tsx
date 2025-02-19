import React, { useState } from "react";
import MyButton from "../../MyButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import myServer from "@/utils/Axios/axios";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import TransactionConfirmationModal from "@/Components/TransactionConfirmationModal";
import LoadingOverlay from "@/Components/LoadingAnimation";

const RetireHeader = ({
  totalQuantity = 0,
  selectedCount = 0,
  contractAddress = "",
  project = "N/A", // Added project prop to display project name
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

  const encryptedPrivateKey = window.localStorage.getItem("encryptedPrivateKey");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.retiredBy.trim()) newErrors.retiredBy = "This field is required";
    if (!formData.beneficiary.trim()) newErrors.beneficiary = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRetire = async () => {
    if (!showForm) {
      setShowForm(true);
      return;
    }

    if (!validateForm()) return;

    setShowConfirmation(true);
  };

  const confirmTransaction = async () => {
    setShowConfirmation(false);
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
      toast.success("Retirement successful!", { duration: 4000, style: { maxWidth: "300px", fontSize: "14px" } });
      setTimeout(() => router.push("/decarb/retirements"), 4500);
    } catch (error) {
      console.error("Retirement failed:", error);
      toast.error("Retirement failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className={`relative ${loading ? "pointer-events-none" : ""}`}>
      <Toaster />
      {loading && <LoadingOverlay type="retire" />}
      <div className="bg-[#f0dfbe] rounded-lg p-6 w-auto mx-auto shadow-md font-sans">
        <h2 className="text-lg font-semibold mb-4">DeCarb BioChar Carbon Pool (CHAR)</h2>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Project: <span className="font-semibold">{project}</span>
          </p>
          <p className="text-sm text-gray-600">
            Quantity: <span className="font-semibold">{totalQuantity}</span>
          </p>
        </div>

        {showForm && (
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="retiredBy" className="block text-sm font-medium text-gray-700 mb-1">
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
                className={`w-full p-2 border ${errors.retiredBy ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500`}
              />
              {errors.retiredBy && <p className="mt-1 text-sm text-red-500">{errors.retiredBy}</p>}
            </div>

            <div>
              <label htmlFor="beneficiary" className="block text-sm font-medium text-gray-700 mb-1">
                BENEFICIARY <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="beneficiary"
                name="beneficiary"
                value={formData.beneficiary}
                onChange={handleInputChange}
                className={`w-full p-2 border ${errors.beneficiary ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500`}
              />
              {errors.beneficiary && <p className="mt-1 text-sm text-red-500">{errors.beneficiary}</p>}
            </div>

            <div className="col-span-2">
              <label htmlFor="beneficiaryAddress" className="block text-sm font-medium text-gray-700 mb-1">
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
            text={showForm ? "RETIRE" : "ADD DETAILS"}
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

export default RetireHeader;