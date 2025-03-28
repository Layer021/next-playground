import type { Metadata } from "next";
import "./globals.css";
import ClientSideRenderer from '@/components/layout/ClientSideRenderer';
import MainLayout from '@/components/layout/MainLayout';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-theme="light">
      <body>
        <MainLayout>
          <ClientSideRenderer>
            {children}
          </ClientSideRenderer>
        </MainLayout>
      </body>
    </html>
  );
}
