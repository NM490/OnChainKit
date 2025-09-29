"use client";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base, baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { WagmiProvider } from "wagmi";
import { getConfig } from "./wagmi";

export default function Providers({ children }) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
  const [isDark, setIsDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={baseSepolia}
          projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID}
          config={{
            appearance: {
              name: "MintedMe",
              logo: "/favicon.ico",
              mode: isDark ? "dark" : "light",
              theme: "base",
            },
            wallet: {
              display: "modal",
              preference: "all",
              termsUrl: "https://example.com/terms",
              privacyUrl: "https://example.com/privacy",
              supportedWallets: {
                rabby: true,
                trust: true,
                frame: true,
              },
            },
            paymaster: process.env.PAYMASTER_ENDPOINT,
            analytics: true,
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
