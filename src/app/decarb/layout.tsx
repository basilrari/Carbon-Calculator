import Sidebar from "@/Components/Dashboard/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main> 
      <Sidebar />
      {children}
      </main>
      
   
  );
}
