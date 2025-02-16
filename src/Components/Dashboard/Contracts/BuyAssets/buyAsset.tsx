"use client";
import { useState } from "react";
import MyButton from "../../MyButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import myServer from "@/utils/Axios/axios";
import { Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import TransactionConfirmationModal from "@/Components/confirm/confirmTransaction";

const LoadingOverlay = () => (
  <div className="fixed inset-0 w-full h-full z-[9999]">
    <div className="absolute inset-0 backdrop-blur-xl bg-white/50" />
    <div className="relative h-full flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl max-w-md w-full border border-white/20">
        <div className="flex flex-col items-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-800/20 animate-pulse"></div>
            <div className="relative w-20 h-20">
              <Loader2 className="w-20 h-20 text-emerald-800 animate-spin" />
            </div>
          </div>

          <div className="flex space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-emerald-800 animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-emerald-900">
              Processing Your Purchase
            </h2>
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
                  "Token Purchase successful! Txn Hash: " +
                    response.data.transactionHash,
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
      {loading && <LoadingOverlay />}

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
