import CeloComp from "@/Components/Dashboard/celoComp";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 flex flex-col p-6 w-full">
      
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold pl-3 pt-2">Contracts</h1>
        <CeloComp/>
      </div>
      
      <div>
        {children}
      </div>
    </main>
        
  );
}
