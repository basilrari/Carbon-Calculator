"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";

interface CertificateData {
  date: string;
  retiredBy: string;
  beneficiary: string;
  project: string;
  country: string;
  tokenId: string;
  amount: string;
  vcsId: string;
  vintage: string;
  methodology: string;
  transactionHash: string;
  tokenContract: string;
  benefAddress?: string; // Added for BenefAddress
}

const CertificatePage = () => {
  const router = useRouter();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);

  useEffect(() => {
    const data = window.localStorage.getItem("certificateData");
    console.log(data);
    if (data) {
      setCertificateData(JSON.parse(data));
    }
  }, []);

  const downloadPDF = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: certificateRef.current.scrollWidth,
        windowHeight: certificateRef.current.scrollHeight,
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save("carbon_retirement_certificate.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  if (!certificateData) {
    return <div>No certificate data available</div>;
  }

  return (
    <div className="h-screen w-full overflow-y-auto bg-gray-50 p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        <div
          ref={certificateRef}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          style={{ width: "210mm" }}
        >
          <div className="p-6 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6 mb-8">
              <div className="mb-4 md:mb-0">
                <div className="relative pl-6 mb-4">
                  <div className="absolute left-0 top-0 w-1 h-full bg-green-700" />
                  <h1 className="text-2xl font-normal leading-tight">Carbon Retirement Certificate</h1>
                </div>
                <p className="text-xs text-gray-600">RETIRED ON {certificateData.date}</p>
              </div>
              <div className="text-right">
                <div className="relative">
                  <span className="text-6xl font-bold text-green-700">{certificateData.amount}</span>
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-green-50 rounded-full -z-10" />
                </div>
                <p className="text-xs text-gray-600 mt-2">TONNE OF CO2 EMISSIONS</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-8">
              {/* Retired By and Beneficiary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                  <p className="text-xs font-medium text-gray-600 mb-2">RETIRED BY</p>
                  <p className="text-green-700">{certificateData.retiredBy}</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                  <p className="text-xs font-medium text-gray-600 mb-2">BENEFICIARY</p>
                  <p className="text-green-700">{certificateData.beneficiary}</p>
                </div>
              </div>

              {/* Address and Transaction */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                  <p className="text-xs font-medium text-gray-600 mb-2">BENEFICIARY ADDRESS</p>
                  <p className="text-green-700 break-all">{certificateData.benefAddress || "-"}</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                  <p className="text-xs font-medium text-gray-600 mb-2">RETIREMENT TRANSACTION</p>
                  <p className="text-green-700 break-all">{certificateData.transactionHash}</p>
                  <p className="text-green-700 mt-1 cursor-pointer hover:underline">Celo Explorer →</p>
                </div>
              </div>

              {/* Project Details */}
              <div className="relative pl-6 py-6 border-y border-gray-200">
                <div className="absolute left-0 top-0 w-1 h-full bg-green-700" />
                <p className="text-xs font-medium text-gray-600 mb-2">PROJECT</p>
                <p className="text-green-700 mb-4">{certificateData.project}</p>
                <p className="text-xs font-medium text-gray-600 mb-1">HOST COUNTRY</p>
                <p className="text-green-700">{certificateData.country}</p>
              </div>

              {/* Token Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-12">
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                    <p className="text-xs font-medium pt-4 text-gray-600 mb-2">PROJECT-SPECIFIC TOKEN</p>
                    <p>{certificateData.tokenId}</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                    <p className="text-xs font-medium text-gray-600 mb-2">TCO2 TOKEN CONTRACT</p>
                    <p className="text-green-700 break-all">{certificateData.tokenContract}</p>
                    <p className="text-green-700 mt-1 cursor-pointer hover:underline">Celo Explorer →</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center">
                      <Image
                        src="/images/verra.png"
                        alt="Verra"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <p className="font-medium">Verified Carbon Standard</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                      <p className="text-xs font-medium text-gray-600 mb-2">VCS ID</p>
                      <p>{certificateData.vcsId}</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                      <p className="text-xs font-medium text-gray-600 mb-2">VINTAGE</p>
                      <p>{certificateData.vintage}</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                      <p className="text-xs font-medium text-gray-600 mb-2">VCS METHODOLOGY</p>
                      <p>{certificateData.methodology}</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                      <p className="text-xs font-medium text-gray-600 mb-2">VCS ISSUANCE RECORD</p>
                      <p className="text-green-700 cursor-pointer hover:underline">Verra →</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Logo */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <div className="w-24 h-24 rounded-full flex items-center justify-center">
                <Image
                  src="/images/decarblogo.png"
                  alt="DeCarb Logo"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-gray-500 text-center">
                This on-chain carbon retirement was made possible with DeCarb in association with Toucan Protocol.
              </p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-6 mb-4 flex justify-center gap-4">
          <button
            onClick={downloadPDF}
            className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-200"
          >
            Download PDF
          </button>
          <button
            onClick={() => router.push("/decarb/retirements")}
            className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            Back to Retirements
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;