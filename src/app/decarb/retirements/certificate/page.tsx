"use client"
import React from 'react';
import Image from 'next/image';
import { useRef } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
}

const Certificate = () => {
  const certificateRef = useRef<HTMLDivElement>(null);
  
  const downloadPDF = async () => {
    if (!certificateRef.current) return;

    try {
      // Create the canvas with better quality settings
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS for images
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: certificateRef.current.scrollWidth,
        windowHeight: certificateRef.current.scrollHeight
      });

      // Calculate dimensions to maintain aspect ratio
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF with proper dimensions
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Add image to PDF with calculated dimensions
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      
      // Download the PDF
      pdf.save('carbon_retirement_certificate.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  };

  const data: CertificateData = {
    date: '3 DEC 2023',
    retiredBy: 'Basil',
    beneficiary: 'DeCarb',
    project: 'North Pikounda REDD+',
    country: 'Congo',
    tokenId: 'TCO2-VCS-1052-2012',
    amount: '1',
    vcsId: '1052',
    vintage: '2012',
    methodology: 'VM0011',
    transactionHash: '0xadf4e3f7476af990f5328fdf53a5f20205853ad5f7ce811b22',
    tokenContract: '0x2b97730e74a1a82a426c73ecdf787a7a2c22'
  };

  return (
    <div className="h-screen w-full overflow-y-auto bg-gray-50 p-6 md:p-12">
      <div className="mx-auto max-w-4xl">
        <div 
          ref={certificateRef} 
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          style={{ width: '210mm' }} // Set to A4 width
        >
          <div className="p-6 md:p-12">
            {/* Rest of your JSX remains the same */}
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-6 mb-8">
              <div className="mb-4 md:mb-0">
                <div className="relative pl-6 mb-4">
                  <div className="absolute left-0 top-0 w-1 h-full bg-green-700" />
                  <h1 className="text-2xl font-normal leading-tight">Carbon Retirement Certificate</h1>
                </div>
                <p className="text-xs text-gray-600">RETIRED ON {data.date}</p>
              </div>
              <div className="text-right">
                <div className="relative">
                  <span className="text-6xl font-bold text-green-700">{data.amount}</span>
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
                  <p className="text-green-700">{data.retiredBy}</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                  <p className="text-xs font-medium text-gray-600 mb-2">BENEFICIARY</p>
                  <p className="text-green-700">{data.beneficiary}</p>
                </div>
              </div>

              {/* Address and Transaction */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                  <p className="text-xs font-medium text-gray-600 mb-2">BENEFICIARY ADDRESS</p>
                  <p className="text-gray-500">-</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                  <p className="text-xs font-medium text-gray-600 mb-2">RETIREMENT TRANSACTION</p>
                  <p className="text-green-700 break-all">{data.transactionHash}</p>
                  <p className="text-green-700 mt-1 cursor-pointer hover:underline">Celo Explorer →</p>
                </div>
              </div>

              {/* Project Details */}
              <div className="relative pl-6 py-6 border-y border-gray-200">
                <div className="absolute left-0 top-0 w-1 h-full bg-green-700" />
                <p className="text-xs font-medium text-gray-600 mb-2">PROJECT</p>
                <p className="text-green-700 mb-4">{data.project}</p>
                <p className="text-xs font-medium text-gray-600 mb-1">HOST COUNTRY</p>
                <p className="text-green-700">{data.country}</p>
              </div>

              {/* Token Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-12">
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                    <p className="text-xs font-medium pt-4 text-gray-600 mb-2">PROJECT-SPECIFIC TOKEN</p>
                    <p>{data.tokenId}</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                    <p className="text-xs font-medium text-gray-600 mb-2">TCO2 TOKEN CONTRACT</p>
                    <p className="text-green-700 break-all">{data.tokenContract}</p>
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
                      <p>{data.vcsId}</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                      <p className="text-xs font-medium text-gray-600 mb-2">VINTAGE</p>
                      <p>{data.vintage}</p>
                    </div>
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-0 w-1 h-full bg-gray-200" />
                      <p className="text-xs font-medium text-gray-600 mb-2">VCS METHODOLOGY</p>
                      <p>{data.methodology}</p>
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
      </div>
      
      {/* Download Button */}
      <div className="mt-6 mb-4 flex justify-center">
        <button
          onClick={downloadPDF}
          className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors duration-200"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Certificate;