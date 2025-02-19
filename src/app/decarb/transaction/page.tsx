"use client"
import React, { useState, useEffect } from "react";

const fetchTransactions = async (walletAddress) => {
  try {
    if (!walletAddress) {
      console.error("Wallet address is empty");
      return { transactions: [], grouped: {}, summary: {} };
    }

    console.log("Fetching transactions for address:", walletAddress);
    const response = await fetch(`http://localhost:4000/api/v1/transactions/${walletAddress}`);
    
    if (!response.ok) {
      console.error("Error response:", response.status, response.statusText);
      return { transactions: [], grouped: {}, summary: {} };
    }
    
    const data = await response.json();
    console.log("Received transaction data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { transactions: [], grouped: {}, summary: {} };
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
  const [filter, setFilter] = useState('all');
  const [summary, setSummary] = useState({ total: 0, incoming: 0, outgoing: 0 });
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
        const data = await fetchTransactions(storedWallet);
        setTransactions(data.grouped[filter] || data.transactions || []);
        setSummary(data.summary || { total: 0, incoming: 0, outgoing: 0 });
        
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactionData();
  }, [filter]);

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

        {/* Filters and Summary */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              All ({summary.total})
            </button>
            <button
              onClick={() => setFilter('incoming')}
              className={`px-4 py-2 rounded-lg ${filter === 'incoming' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Incoming ({summary.incoming})
            </button>
            <button
              onClick={() => setFilter('outgoing')}
              className={`px-4 py-2 rounded-lg ${filter === 'outgoing' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Outgoing ({summary.outgoing})
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="divide-y divide-gray-200">
            {transactions.length > 0 ? (
              transactions.map((tx, index) => (
                <div 
                  key={index} 
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    tx.direction === 'incoming' ? 'border-l-4 border-green-500' :
                    tx.direction === 'outgoing' ? 'border-l-4 border-orange-500' : ''
                  }`}
                >
                  {/* Main Transaction Info Grid */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Transaction Hash</div>
                      <div className="font-mono text-sm">{formatAddress(tx.hash)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Date</div>
                      <div className="font-medium">{formatDate(tx.timestamp)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">From</div>
                      <div className="font-mono text-sm">{formatAddress(tx.from)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">To</div>
                      <div className="font-mono text-sm">{formatAddress(tx.to)}</div>
                    </div>
                  </div>

                  {/* Token Transfers */}
                  {tx.tokenTransfers && tx.tokenTransfers.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-100">
                      <div className="text-sm text-gray-500 mb-2">Token Transfers</div>
                      {tx.tokenTransfers.map((transfer, idx) => (
                        <div key={idx} className="grid grid-cols-2 gap-x-12 text-sm mb-2">
                          <div>
                            <span className="text-gray-500">Token: </span>
                            {formatAddress(transfer.tokenAddress)}
                          </div>
                          <div>
                            <span className="text-gray-500">Amount: </span>
                            {transfer.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="mt-4 flex justify-between items-center pt-2 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Method: {tx.method}
                    </div>
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
                No transactions found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}