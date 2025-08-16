
"use client";

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
})

const queryClient = new QueryClient()

// export const metadata: Metadata = {
//   title: 'EGLIFE TOKEN',
//   description: 'The central hub for the Eglife Token project.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <title>EGLIFE TOKEN</title>
        <meta name="description" content="The central hub for the Eglife Token project." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#262626" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
       <WagmiProvider config={config}>
         <QueryClientProvider client={queryClient}>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
