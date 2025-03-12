import React from "react";
import MyButton from "./MyButton";
import Link from "next/link";
import Image from "next/image";

const ActionHeader = ({ quantity, price, primaryAction, secondaryAction }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 border rounded-lg shadow-md bg-white w-full mx-auto">
      <div className="flex items-center space-x-4">
        <Image src="/images/decarbtoken.png" alt="Token" width={48} height={48} />
        <div>
          <h5 className="text-sm font-medium text-gray-600">DeCarb Carbon Credit Pool</h5>
          {quantity !== undefined ? (
            <h2 className="text-2xl font-bold text-gray-900">{quantity} KG</h2>
          ) : (
            <h2 className="text-2xl font-bold text-gray-900">₹{price.toFixed(2)}</h2>
          )}
        </div>
      </div>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <Link href={primaryAction.href}>
          <MyButton variant="green" text={primaryAction.text} />
        </Link>
        {secondaryAction && (
          <Link href={secondaryAction.href}>
            <MyButton variant="yellow" text={secondaryAction.text} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ActionHeader;