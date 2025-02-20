import Image from "next/image";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col p-6 w-full h-screen">
      {children}
    </main>
  );
}