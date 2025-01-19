"use client";
import { useState } from "react";
import MyButton from "../../MyButton";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";

const quantitySchema = z.number().min(1).max(10);

type BuyCharComponentProps = {};

const BuyCharComponent: React.FC<BuyCharComponentProps> = () => {
  const [state, setState] = useState({
    quantity: 0,
    price: 0,
    loading: false,
  });

  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseFloat(value);

    if (!value || isNaN(parsedValue)) {
      setState((prev) => ({ ...prev, quantity: 0, price: 0 }));
      setValidationMessage("Please enter a valid number.");
      return;
    }

    const quantityValidation = quantitySchema.safeParse(parsedValue);

    if (quantityValidation.success) {
      setState((prev) => ({
        ...prev,
        quantity: parsedValue,
        price: parsedValue * 25,
      }));
      setValidationMessage(null); // Clear validation message
    } else {
      setValidationMessage(
        parsedValue > 10
          ? "You can only purchase up to 10 units."
          : "Quantity must be at least 1."
      );
    }
  };

  const handleBuy = async () => {
    alert("Purchase successful!");
    setState((prev) => ({ ...prev, quantity: 0, price: 0 }));
  };

  return (
    <div className="bg-blue-50 rounded-lg p-6 w-auto mx-auto shadow-md font-sans">
      <div className="flex justify-between">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          Choose the quantity you would like to buy (Max: 10)
        </h2>
        <h2 className="text-sm font-semibold text-gray-700 mb-2">
          DeCarb BioChar Carbon Pool (CHAR)
        </h2>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <div className="flex items-center">
            <p className="text-sm font-medium text-gray-600 pt-4 pr-2">Quantity:</p>
            <input
              id="quantity"
              type="text"
              value={state.quantity}
              onChange={handleQuantityChange}
              className="text-xl border pl-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              disabled={state.loading}
            />
            <p className="pl-4 text-sm text-gray-600">
              Price:{" "}
              <span className="text-lg font-semibold text-gray-800">
                ${state.price.toFixed(2)}
              </span>
            </p>
          </div>
          {/* Reserve space for the validation message */}
          <div style={{ minHeight: "24px" }}>
            {validationMessage && (
              <p className="text-sm text-red-500 mt-2">{validationMessage}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <h1 className="text-3xl p-2 font-semibold">DCO2</h1>
          <Image
            src="/images/decarbtoken.png"
            alt="Token"
            width={48}
            height={48}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Link href="/decarb/contracts">
          <MyButton text="BACK" variant="red" />
        </Link>
        <MyButton
          text="BUY CHAR"
          onClick={handleBuy}
          variant="green"
          disabled={state.loading || state.quantity === 0}
        />
      </div>
    </div>
  );
};

export default BuyCharComponent;
