import MyNavbar from "@/Components/Dashboard/navbar";
import { NextUIProvider } from "@nextui-org/react";


export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextUIProvider>
          <MyNavbar />
          {children}
        </NextUIProvider>
  );
}