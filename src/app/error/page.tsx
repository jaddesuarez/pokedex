"use client";

import { useEffect, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorData {
  message: string;
  timestamp: string;
}

export default function ErrorPage() {
  const [error, setError] = useState<ErrorData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const errorData = sessionStorage.getItem("apiError");
    if (errorData) {
      setError(JSON.parse(errorData));
      sessionStorage.removeItem("apiError");
    }
  }, []);

  const handleRetry = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (!error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No Error Found
          </h1>
          <button
            onClick={handleGoHome}
            className="text-blue-600 hover:text-blue-800"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRetry}
            className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className="inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Error occurred at: {new Date(error.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
