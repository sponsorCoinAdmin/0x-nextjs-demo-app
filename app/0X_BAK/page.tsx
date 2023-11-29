'use client'

import "@/styles/globals.css";
import ConnectedPage from "../components/ConnectWrapper";
import Component from './index';
import type { AppProps } from "next/app";
import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";
import { useEffect, useState } from "react";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    // alchemyId: "MzUaa0A87yexjd8UKcHm8HIr1f4aghxT",
    // walletConnectProjectId: "a8024e8262cb4e7102941a3577b5a5c0",

    alchemyId: "EuL5KyMLLBrMyNbZW9CgtiSy45_bh24c",
    walletConnectProjectId: "2c23de9d13468896a8a189e8f56ba34e",

    // Required
    appName: "SponsorCoin Dev Demo App",

    // Optional
    appDescription: "A Next.js demo app for 0x Swap API and ConnectKit",
  })
);

// // export default function App({ Component, pageProps }: AppProps) {
//   export default function App() {
//     const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   return (
//     <div
//     </div>
//   );
// }


import React from 'react'

function connectedPage() {
  return (
    <>
      <ConnectedPage Component={Component} />
    </>
  )
}

export default connectedPage
