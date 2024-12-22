import Sidebar from "@/Components/Dashboard/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen">
      <div className=" text-black">
        <Sidebar />
      </div>
      
      <div className="flex w-full bg-white">
        {children}
      </div>
    </main>
        
  );
}
