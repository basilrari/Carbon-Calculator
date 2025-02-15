"use client"
import { useSearchParams } from 'next/navigation';
import Certificate from '@/Components/certificate/certi';

const CertificatePage = () => {
  const searchParams = useSearchParams();
  const certificateDataParam = searchParams.get('data');
  
  let certificateData;
  try {
    certificateData = certificateDataParam ? JSON.parse(decodeURIComponent(certificateDataParam)) : null;
  } catch (error) {
    console.error('Error parsing certificate data:', error);
    return <div>Error loading certificate</div>;
  }

  if (!certificateData) {
    return <div>No certificate data available</div>;
  }

  return <Certificate certificateData={certificateData} />;
};

export default CertificatePage;