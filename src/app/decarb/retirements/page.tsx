"use client";
import React from 'react';
import ItemDisplay from '@/Components/ItemDisplay'; // Import ItemDisplay
import RetirementComp from '@/Components/Dashboard/Retirements/RetireComp';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const page = () => {
  const router = useRouter(); // Initialize router for navigation

  // Dummy data with View button
  const retirementSummary = { quantity: 7, poolName: 'DeCarb BioChar Carbon Pool (CHAR)' };
  const dummyRetirements = [
    {
      Date: '2025-01-01',
      Quantity: 100,
      Project: 'Panama Wind Energy Project',
      Price: 16.67,
      View: { 
        type: 'button', 
        label: 'View', 
        onClick: () => {
          const certificateData = {
            date: "21-02-2025",
            amount: '100', // Convert quantity to string as per your example
            project: 'Panama Wind Energy Project',
            retiredBy: "Bill",
            beneficiary: "DeCarb",
            country: "Congo",
            tokenId: "TCO2-VCS-1052-2012",
            vcsId: "1052",
            vintage: "2012",
            methodology: "VM0011",
            transactionHash: "0xadf4e3f7476af990f5328fdf53a5f20205853ad5f7ce811b22",
            tokenContract: "0x2b97730e74a1a82a426c73ecdf787a7a2c22"
          };
          router.push(`/decarb/certificate?data=${encodeURIComponent(JSON.stringify(certificateData))}`);
        }
      },
    },
    {
      Date: '2025-01-01',
      Quantity: 10,
      Project: 'North Pikounda REDD+',
      Price: 176.7,
      View: { 
        type: 'button', 
        label: 'View', 
        onClick: () => {
          const certificateData = {
            date: "21-02-2025",
            amount: '10', // Convert quantity to string as per your example
            project: 'North Pikounda REDD+',
            retiredBy: "Bill",
            beneficiary: "DeCarb",
            country: "Congo",
            tokenId: "TCO2-VCS-1052-2012",
            vcsId: "1052",
            vintage: "2012",
            methodology: "VM0011",
            transactionHash: "0xadf4e3f7476af990f5328fdf53a5f20205853ad5f7ce811b22",
            tokenContract: "0x2b97730e74a1a82a426c73ecdf787a7a2c22"
          };
          router.push(`/decarb/certificate?data=${encodeURIComponent(JSON.stringify(certificateData))}`);
        }
      },
    },
  ];

  // Define headers for ItemDisplay based on dummyRetirements structure
  const headers = ['Date', 'Quantity', 'Project', 'Price', 'View'];

  return (
    <div>
      <div className="w-full mb-6 mt-5">
        <RetirementComp {...retirementSummary} />
      </div>

      <div>
        <ItemDisplay
          items={dummyRetirements}
          headers={headers}
          quantityMode="display" // Set to display mode (or "input" if you want editable quantities)
          bgColor="#71D1F0" // Optional: table background color
          itemBgColor="#D4F4FF" // Optional: item box background color
        />
      </div>
    </div>
  );
};

export default page;