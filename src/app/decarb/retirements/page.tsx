"use client";
import React, { useState, useEffect } from "react";
import ItemDisplay from "@/Components/ItemDisplay";
import { useRouter } from "next/navigation";
import ActionHeader from "@/Components/ActionHeader";
import myServer from "@/utils/Axios/axios";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const [retirementSummary, setRetirementSummary] = useState({
    quantity: 0,
    poolName: "",
  });
  const [retirements, setRetirements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRetirements = async () => {
      try {
        const walletAddress =
          window.localStorage.getItem("walletAddress") || "";
        const response = await myServer.post("retire/getNFTdata", {
          walletAddress,
        });
        const data = response.data;

        const totalQuantity = data.nfts.reduce(
          (sum, item) => sum + parseFloat(item.Quantity),
          0
        );
        setRetirementSummary({
          quantity: totalQuantity,
          poolName: "DeCarb BioChar Carbon Pool (CHAR)",
        });

        const mappedRetirements = data.nfts.map((item) => ({
          Date: item.Date,
          Quantity: item.Quantity,
          Project: item.ProjectName,
          Price: item.Price || 0,
          View: {
            type: "button",
            label: "View",
            onClick: () => {
              const cert = item.Certificate;
              const certificateData = {
                date: cert.Date || "21-02-2025",
                amount: cert.Quantity,
                project: cert.ProjectName,
                retiredBy: cert.RetiredBy || "Unknown",
                beneficiary: cert.Beneficiary || "DeCarb",
                benefAddress: cert.BenefAddress || "Unknown",
                country: cert.HostCountry || "Unknown",
                tokenId: cert.ProjectSpecificToken || "Unknown",
                vcsId: cert.VCSID || "Unknown",
                vintage: cert.Vintage || "Unknown",
                methodology: cert.VCSMethodology || "Unknown",
                transactionHash:
                  cert.TxHash ||
                  "0x0000000000000000000000000000000000000000000000000000000000000000",
                tokenContract:
                  cert.TCO2TokenAddress ||
                  "0x0000000000000000000000000000000000000000",
              };
              console.log("certificateData", certificateData);
              window.localStorage.setItem(
                "certificateData",
                JSON.stringify(certificateData)
              );
              router.push("/decarb/certificate");
            },
          },
        }));

        // Sort retirements by Date (DDMMYYYY) in descending order (latest first)
        const sortedRetirements = mappedRetirements.sort((a, b) => {
          const dateA = a.Date; // e.g., "31032025"
          const dateB = b.Date; // e.g., "15022025"
          
          // Convert DDMMYYYY to YYYYMMDD for easy comparison
          const comparableDateA = `${dateA.slice(4)}${dateA.slice(2, 4)}${dateA.slice(0, 2)}`;
          const comparableDateB = `${dateB.slice(4)}${dateB.slice(2, 4)}${dateB.slice(0, 2)}`;
          
          return comparableDateB.localeCompare(comparableDateA); // Descending order
        });

        setRetirements(sortedRetirements);
      } catch (error) {
        console.error("Error fetching retirements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRetirements();
  }, [router]);

  const headers = ["Date", "Quantity", "Project", "View"];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center relative">
        <h1 className="text-2xl font-semibold">Retirements</h1>
        <div className="absolute right-0 overflow-hidden rounded-full w-12 h-12">
          <Image
            src="/images/greenbg.png"
            alt="image"
            height={48}
            width={48}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="mt-8">
        <ActionHeader
          quantity={retirementSummary.quantity * 1000}
          price={0}
          primaryAction={{
            text: "RETIRE",
            href: "/decarb/retirements/retireassets",
          }}
          secondaryAction={undefined}
        />
      </div>
      <div className="mt-12 flex-1 overflow-y-auto">
        {loading ? (
          <p>Loading retirements...</p>
        ) : (
          <ItemDisplay
            items={retirements}
            headers={headers}
            quantityMode="display"
            bgColor="#71D1F0"
            itemBgColor="#D4F4FF"
          />
        )}
      </div>
    </div>
  );
};

export default Page;