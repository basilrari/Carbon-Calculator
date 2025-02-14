import React, { useState } from "react";
import MyButton from "../../MyButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RetireAsset = ({ totalQuantity=0, selectedCount=0, contractAddress = ""}) => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    retiredBy: "",
    beneficiary: "",
    beneficiaryAddress: ""
  });
  const [errors, setErrors] = useState({});

  const encryptedPrivateKey = window.localStorage.getItem("encryptedPrivateKey");
  const walletAddress = window.localStorage.getItem("walletAddress");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.retiredBy.trim()) {
      newErrors.retiredBy = "This field is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRetire = async () => {
    if (!showForm) {
      setShowForm(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    console.log("Retiring assets with form data:", {
      ...formData,
    });
    console.log("qty",totalQuantity);
    console.log("encrypted pvt key",encryptedPrivateKey);
    console.log("contract address",contractAddress);
    router.push("/decarb/retirements");
  };

  return (
    <div className="bg-[#f0dfbe] rounded-lg p-6 w-auto mx-auto shadow-md font-sans">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-gray-700 mb-4">{selectedCount} Carbon Assets Selected</h2>
      </div>
      
      <div className="flex justify-between mb-6">
        <p className="text-md font-medium text-gray-600">Quantity: <span className="text-lg font-bold text-gray-800">{totalQuantity}</span></p>
        
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
              className={`w-full p-2 border ${errors.retiredBy ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500`}
            />
            {errors.retiredBy && (
              <p className="mt-1 text-sm text-red-500">{errors.retiredBy}</p>
            )}
          </div>

          <div>
            <label htmlFor="beneficiary" className="block text-sm font-medium text-gray-700 mb-1">
              BENEFICIARY
            </label>
            <input
              type="text"
              id="beneficiary"
              name="beneficiary"
              value={formData.beneficiary}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
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
          text={showForm ? "CONFIRM RETIREMENT" : "RETIRE"} 
          onClick={handleRetire} 
          variant="green" 
        />
      </div>
    </div>
  );
};

export default RetireAsset;