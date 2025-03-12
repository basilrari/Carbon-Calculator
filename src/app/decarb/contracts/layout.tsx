import Image from "next/image";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 flex flex-col p-6 w-full">
      <div className="flex items-center justify-center relative">
        <h1 className="text-2xl font-semibold">Contracts</h1>
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

      <div>{children}</div>
    </main>
  );
}
