"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/decarb/contracts/buyassets");
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 w-full h-full">
      {/* Base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-100" />
      
      {/* Blurred overlay */}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/50" />

      {/* Content container */}
      <div className="relative h-full flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl max-w-md w-full border border-white/20">
          <div className="flex flex-col items-center space-y-8">
            {/* Main loading spinner */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full border-4 border-emerald-800/20 animate-pulse"></div>
              <div className="relative w-20 h-20">
                <Loader2 className="w-20 h-20 text-emerald-800 animate-spin" />
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 rounded-full bg-emerald-800 animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>

            {/* Text content */}
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-emerald-900">
                Processing Your Purchase
              </h2>
              <div className="space-y-3">
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
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-800 h-2 rounded-full transition-all duration-[5000ms] ease-linear"
                style={{
                  width: '100%'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;