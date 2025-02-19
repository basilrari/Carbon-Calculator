// app/transactions/page.tsx
"use client"
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import { chainConfig } from "@/utils/Config/chainConfig";

const erc20ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

const tokenContracts = [
  { address: "0xB297F730E741a822a426c737eCD0F7877A9a2c22", name: "North Pikounda REDD+" },
  { address: "0xF0a5bF1336372FdBc2C877bCcb03310D85e0BF81", name: "Panama Wind Energy Private Limited" },
];

const fetchTransactions = async (walletAddress) => {
  try {
    if (!walletAddress) {
      console.error("Wallet address is empty");
      return { transactions: [], grouped: { buy: [], sell: [], retire: [] } };
    }

    console.log("Fetching transactions for address:", walletAddress);
    const response = await fetch(`http://localhost:4000/api/v1/transactions/${walletAddress}`);
    
    if (!response.ok) {
      console.error("Error response:", response.status, response.statusText);
      return { transactions: [], grouped: { buy: [], sell: [], retire: [] } };
    }
    
    const data = await response.json();
    console.log("Received transaction data:", data);
    return {
      transactions: data.transactions || [],
      grouped: data.grouped || { buy: [], sell: [], retire: [] }
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { transactions: [], grouped: { buy: [], sell: [], retire: [] } };
  }
};

const formatAddress = (address) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

export default function TransactionsPage() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [groupedTransactions, setGroupedTransactions] = useState({
    buy: [],
    sell: [],
    retire: []
  });
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const storedWallet = window.localStorage.getItem("walletAddress");
        if (!storedWallet) {
          setError("Please connect your wallet to view transactions");
          setIsLoading(false);
          return;
        }
        
        setWalletAddress(storedWallet);
        const { transactions, grouped } = await fetchTransactions(storedWallet);
        setTransactions(transactions);
        setGroupedTransactions(grouped);
        
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  const getDisplayTransactions = () => {
    switch (activeTab) {
      case 'buy':
        return groupedTransactions.buy;
      case 'sell':
        return groupedTransactions.sell;
      case 'retire':
        return groupedTransactions.retire;
      default:
        return transactions;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-lg">Loading transactions...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container h-screen overflow-y-auto mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Transaction History</h1>
          <div className="text-sm text-gray-500">
            Wallet: {formatAddress(walletAddress)}
          </div>
        </div>

        {/* Transaction Tabs */}
        <div className="flex space-x-4">
          <button 
            className={`px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => setActiveTab('all')}
          >
            All ({transactions.length})
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => setActiveTab('buy')}
          >
            Bought ({groupedTransactions.buy.length})
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'sell' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => setActiveTab('sell')}
          >
            Sold ({groupedTransactions.sell.length})
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'retire' ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={() => setActiveTab('retire')}
          >
            Retired ({groupedTransactions.retire.length})
          </button>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="divide-y divide-gray-200">
            {getDisplayTransactions().length > 0 ? (
              getDisplayTransactions().map((tx, index) => (
                <div 
                  key={index} 
                  className={`p-4 hover:bg-gray-50 transition-colors
                    ${tx.type === 'buy' ? 'border-l-4 border-green-500' : 
                      tx.type === 'sell' ? 'border-l-4 border-blue-500' : 
                      tx.type === 'retire' ? 'border-l-4 border-red-500' : 'border-l-4 border-gray-300'}`}
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Type</div>
                      <div className="font-medium capitalize">{tx.type || 'Transaction'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Project</div>
                      <div className="font-medium">{tx.project || 'Unknown Project'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Date</div>
                      <div className="font-medium">{formatDate(tx.timestamp)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">From</div>
                      <div className="font-mono text-sm">{formatAddress(tx.from)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">To</div>
                      <div className="font-mono text-sm">{formatAddress(tx.to)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Value</div>
                      <div className="font-medium">{tx.value.toFixed(4)} CELO</div>
                    </div>
                  </div>
                  <div className="mt-2 text-right">
                    <a 
                      href={tx.explorerLink} 
                      className="text-blue-500 hover:text-blue-700 text-sm" 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Explorer →
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-12">
                No {activeTab === 'all' ? '' : activeTab} transactions found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
