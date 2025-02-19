// TransactionConfirmationModal.tsx
import React from "react";

interface ProjectMapping {
  [key: string]: string;
}

interface SelectedItem {
  id: string;
  selectedQuantity: number;
}

interface TransactionConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  selectedItems: SelectedItem[];
  type: "buy" | "sell" | "retire";
  projectMapping?: ProjectMapping;
}

const TransactionConfirmationModal: React.FC<
  TransactionConfirmationModalProps
> = ({
  onConfirm,
  onCancel,
  selectedItems,
  type,
  projectMapping = {
    "0xB297F730E741a822a426c737eCD0F7877A9a2c22": "North Pikundo RED+",
    "0xF0a5bF1336372FdBc2C877bCcb03310D85e0BF81":
      "Panama Wind Energy Private Limited",
  },
}) => {
    const getProjectName = (contractAddress: string) => {
      return projectMapping[contractAddress] || "Unknown Project";
    };

    const getTransactionDetails = () => {
      switch (type) {
        case "buy":
          return {
            title: "Confirm Purchase",
            subtitle: "Please review your purchase details before confirming",
            action: "Purchase",
            buttonColor: "bg-blue-600 hover:bg-blue-700",
            description: "Carbon Credit Purchase",
          };
        case "sell":
          return {
            title: "Confirm Sale",
            subtitle: "Please review your sale details before confirming",
            action: "Confirm Sale",
            buttonColor: "bg-green-600 hover:bg-green-700",
            description: "Carbon Credit Sale",
          };
        case "retire":
          return {
            title: "Confirm Retirement",
            subtitle: "Please review retirement details before confirming",
            action: "Retire Credits",
            buttonColor: "bg-purple-600 hover:bg-purple-700",
            description: "Carbon Credit Retirement",
          };
        default:
          return {
            title: "Confirm Transaction",
            subtitle: "Please review your transaction details",
            action: "Confirm",
            buttonColor: "bg-gray-600 hover:bg-gray-700",
            description: "Carbon Credit Transaction",
          };
      }
    };

    const details = getTransactionDetails();

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl"></div>

        <div className="relative bg-white rounded-2xl shadow-2xl w-[32rem] transform transition-all">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-gray-800">
                {details.title}
              </h2>
            </div>
            <p className="mt-2 text-gray-600">{details.subtitle}</p>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Project Details Card */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {getProjectName(selectedItems[0]?.id)}
                  </h3>
                  <p className="text-sm text-gray-500">{details.description}</p>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Quantity</span>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      {selectedItems[0]?.selectedQuantity}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      carbon credits
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Contract Address</span>
                  <span className="text-gray-800 font-medium text-sm font-mono">
                    {selectedItems[0]?.id?.slice(0, 6)}...
                    {selectedItems[0]?.id?.slice(-4)}
                  </span>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-yellow-400"
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
                <p className="text-sm text-yellow-700">
                  This action cannot be undone. The transaction will be recorded
                  on the blockchain.
                </p>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="p-6 bg-gray-50 rounded-b-2xl flex justify-end space-x-4">
            <button
              className="px-6 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className={`px-6 py-2 bg-green-600 text-white rounded-lg font-medium transform transition-all duration-200 hover:bg-green-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600`}
              onClick={onConfirm}
            >
              {details.action}
            </button>
          </div>
        </div>
      </div>
    );
  };

export default TransactionConfirmationModal;
