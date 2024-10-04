
"use client"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";


export const useHydrateStore = () => {

  const { connection } = useConnection();
  const { publicKey } = useWallet();



  useEffect(() => {
    //TODO - update
    const fetchAndSetStats = async () => {}

    fetchAndSetStats();

    const interval = setInterval(fetchAndSetStats, 30000);

    return () => clearInterval(interval);
  }, []);
};
