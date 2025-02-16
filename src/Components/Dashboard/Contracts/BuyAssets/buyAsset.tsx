"use client";
import { useState } from "react";
import MyButton from "../../MyButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import myServer from "@/utils/Axios/axios";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import TransactionConfirmationModal from "@/Components/confirm/confirmTransaction";
import LoadingOverlay from "@/Components/loading/load";

type BuyCharComponentProps = {
  price?: number;
  quantity?: number;
  project?: string;
  contract?: string;
};

const BuyCharComponent: React.FC<BuyCharComponentProps> = ({
  price = 0,
  quantity = 0,
  project = "N/A",
  contract = "NA",
}) => {
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to handle the confirmation modal
  const router = useRouter();

  const handleBuy = async () => {
    setShowModal(false);
    if (!quantity) {
      toast.error("Please select a quantity before buying.", {
        duration: 4000,
        style: { maxWidth: "300px", fontSize: "14px" },
      });
      return;
    }

    try {
      const apiKey = "rzp_test_74fvUBAvMzsdVl"; // Replace with actual key
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = async () => {
        const options = {
          key: apiKey,
          amount: Math.round(Number(price) * 100),
          currency: "INR",
          name: "DeCarb",
          description: `Purchase ${quantity} units of ${project}`,
          image: "/images/decarbtoken.png",
          theme: { color: "#2F4F4F" },
          handler: async function (response: any) {
            console.log("Payment response:", response);
            try {
              const backendResponse = await myServer.get("/buy/buyTest", {
                params: {
                  amount: price,
                  quantity,
                  project,
                  paymentId: response.razorpay_payment_id,
                },
              });

              if (backendResponse.status === 200) {
                const walletAddress =
                  window.localStorage.getItem("walletAddress");
                const data = {
                  quantity,
                  tokenAddress: contract,
                  toAddress: walletAddress,
                };
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                const response = await myServer.post("/buy/buyTokens", data);

                setLoading(false);
                setProcessingPayment(false);
                toast.success(
                  "Token Purchase successful!",
                  {
                    duration: 4000,
                    style: { maxWidth: "300px", fontSize: "14px" },
                  }
                );
              } else {
                toast.error(
                  "Payment was successful, but order processing failed.",
                  {
                    duration: 4000,
                    style: { maxWidth: "300px", fontSize: "14px" },
                  }
                );
              }
            } catch (error) {
              toast.error("Payment successful, but order processing failed.", {
                duration: 4000,
                style: { maxWidth: "300px", fontSize: "14px" },
              });
            } finally {
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
          },
          modal: { ondismiss: () => setLoading(false) },
        };

        const razorpayInstance = new (window as any).Razorpay(options);
        razorpayInstance.open();
      };

      document.body.appendChild(script);
    } catch (error) {
      toast.error("Error initiating payment. Please try again.", {
        style: { maxWidth: "300px", fontSize: "14px" },
      });
      setLoading(false);
    }
  };

  const handleConfirmPurchase = () => {
    setShowModal(false);
    handleBuy();
  };

  return (
    <div className={`relative ${loading ? "pointer-events-none" : ""}`}>
      <Toaster />
      {loading && <LoadingOverlay type="buy"/>}

      <div
        className={`bg-blue-50 rounded-lg p-6 w-auto mx-auto shadow-md font-sans ${
          processingPayment ? "blur-md" : ""
        }`}
      >
        <h2 className="text-lg font-semibold">
          DeCarb BioChar Carbon Pool (CHAR)
        </h2>
        <p className="text-sm text-gray-600">
          Project: <span className="font-semibold">{project}</span>
        </p>
        <p className="text-sm text-gray-600">
          Quantity: <span className="font-semibold">{quantity}</span>
        </p>
        <p className="text-sm text-gray-600">
          Total Price:{" "}
          <span className="font-semibold">₹{Number(price).toFixed(2)}</span>
        </p>

        <div className="flex justify-end space-x-4">
          <Link href="/decarb/contracts">
            <MyButton text="BACK" variant="red" />
          </Link>
          <MyButton
            text="BUY CHAR"
            onClick={() => setShowModal(true)}
            variant="green"
          />
        </div>

        {showModal && (
          <TransactionConfirmationModal
            type="buy"
            onConfirm={handleBuy}
            onCancel={() => setShowModal(false)}
            selectedItems={[{ id: contract, selectedQuantity: quantity }]}
          />
        )}
      </div>
    </div>
  );
};

export default BuyCharComponent;
