import { useState, useEffect } from "react";

interface BtcResponse {
  bpi: {
    USD: {
      code: string;
      symbol: string;
      rate: string;
      description: string;
      rate_float: number;
    };
  };
}

export const useBtcUsdMultiplier = (): {
  btcUsd: number | null;
  loading: boolean;
  error: Error | null;
} => {
  const [btcUsd, setBtcUsd] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchBtcUsd = async () => {
    console.log("RELOAD BTC");
    try {
      const response = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch BTC price");
      }

      const data: BtcResponse = await response.json();

      // Get the BTC -> USD rate
      const btcToUsdRate = data.bpi.USD.rate_float;

      // Set the rate in state
      setBtcUsd(btcToUsdRate);
      setError(null); // Clear any previous error on successful fetch
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      // Avoid state updates
      if (loading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBtcUsd();
    // Fetch every 2 second
    const intervalId = setInterval(fetchBtcUsd, 5000);

    // Fetch the first time immediately when the component mounts

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchBtcUsd]);

  return { btcUsd, loading, error };
};

export default useBtcUsdMultiplier;
