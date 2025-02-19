"use client";
import React, { useState } from "react";
import MyButton from "./MyButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import LoadingOverlay from "@/Components/LoadingAnimation";
import TransactionConfirmationModal from "./TransactionConfirmationModal";

type ActionSelectionProps = {
  actionType: "buy" | "sell"; // Only buy and sell actions
  price?: number; // For buy/sell actions
  quantity?: number; // For buy/sell actions
  project?: string; // For buy/sell actions
  contract?: string; // For buy/sell actions
  totalQuantity?: number; // For sell action (optional for buy if needed)
  totalPrice?: number; // For sell action (optional for buy if needed)
  selectedCount?: number; // For sell action (optional for buy if needed)
  selectedItems?: any[]; // For sell action (optional for buy if needed)
  onAction: () => void; // Callback for the action (handled in page.tsx)
  backLink: string; // Link for the "BACK" button (ensured as string)
  primaryButtonText: string; // Text for the primary action button
  secondaryButtonText?: string; // Optional text for a secondary button (e.g., for sell)
  secondaryButtonLink?: string; // Optional link for secondary button (ensured as string)
  showModal?: boolean; // Whether to show the confirmation modal
  setShowModal?: (show: boolean) => void; // Function to toggle modal visibility
};

const ActionSelection: React.FC<ActionSelectionProps> = ({
  actionType,
  price = 0,
  quantity = 0,
  project = "N/A",
  contract = "NA",
  totalQuantity = 0,
  totalPrice = 0,
  selectedCount = 0,
  selectedItems = [],
  onAction,
  backLink,
  primaryButtonText,
  secondaryButtonText,
  secondaryButtonLink,
  showModal = false,
  setShowModal,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConfirm = (event: React.MouseEvent) => {
    console.log("handleConfirm clicked - event:", event.type, "showModal before:", showModal, "actionType:", actionType, "primaryButtonText:", primaryButtonText, "selectedItems:", selectedItems);
    if (setShowModal) {
      setShowModal(true);
      console.log("showModal set to true");
    }
  };

  const confirmAction = () => {
    console.log("confirmAction triggered - showModal before:", showModal, "actionType:", actionType, "selectedItems:", selectedItems);
    if (setShowModal) {
      setShowModal(false);
      console.log("showModal set to false");
    }
    setLoading(true);
    console.log("Calling onAction (handleSell) - actionType:", actionType, "selectedItems:", selectedItems);
    onAction(); // Delegate the action logic to page.tsx
    console.log("onAction completed");
    setLoading(false); // Assuming page.tsx handles loading state reset
  };

  return (
    <div className={`relative ${loading ? "pointer-events-none opacity-50" : ""}`}>
      <Toaster />
      {loading && <LoadingOverlay type={actionType} />}

      <div
        className={`${actionType === "buy" ? "bg-blue-50" : "bg-[#f0dfbe]"
          } rounded-lg p-6 w-auto mx-auto shadow-md font-sans`}
      >
        <h2 className="text-lg font-semibold mb-4">
          DeCarb BioChar Carbon Pool (CHAR)
        </h2>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Project: <span className="font-semibold">{project}</span>
          </p>
          <p className="text-sm text-gray-600">
            Quantity: <span className="font-semibold">{quantity || totalQuantity || 0}</span>
          </p>
          {(actionType === "buy" || actionType === "sell") && (
            <p className="text-sm text-gray-600">
              Total Price:{" "}
              <span className="font-semibold">₹{Number(price || totalPrice || 0).toFixed(2)}</span>
            </p>
          )}
          {actionType === "sell" && selectedCount > 0 && (
            <p className="text-sm text-gray-600">
              Selected Assets: <span className="font-semibold">{selectedCount}</span>
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          {backLink && ( // Ensure backLink exists before rendering Link
            <Link href={backLink}> {/* Use backLink directly as the href */}
              <MyButton text="BACK" variant="red" />
            </Link>
          )}
          <MyButton
            text={primaryButtonText}
            onClick={handleConfirm}
            variant={actionType === "sell" ? "yellow" : "green"}
            disabled={
              (actionType === "sell" && (!selectedItems || selectedItems.length === 0 || !selectedItems[0]?.selectedQuantity)) ||
              (actionType === "sell" && selectedItems[0]?.selectedQuantity <= 0)
            }
          />
          {secondaryButtonText && secondaryButtonLink && ( // Ensure secondaryButtonLink exists
            <Link href={secondaryButtonLink}>
              <MyButton text={secondaryButtonText} variant="yellow" />
            </Link>
          )}
        </div>

        {showModal && (
          <TransactionConfirmationModal
            type={actionType}
            onConfirm={confirmAction}
            onCancel={() => {
              console.log("Modal canceled - showModal before:", showModal, "actionType:", actionType, "selectedItems:", selectedItems);
              if (setShowModal) {
                setShowModal(false);
                console.log("showModal set to false on cancel");
              }
            }}
            selectedItems={
              actionType === "buy"
                ? [{ id: contract, selectedQuantity: quantity }]
                : selectedItems
            }
          />
        )}
      </div>
    </div>
  );
};

export default ActionSelection;