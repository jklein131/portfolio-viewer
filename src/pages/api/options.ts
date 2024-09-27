// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
var bs = require("black-scholes");
type Data = {
  stockPrice: number;
  options: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const yf = require("yahoo-finance2").default;

  // Fetch stock price for a specific ticker symbol
  const getStockPrice = async (symbol: string) => {
    const quote = await yf.quote(symbol);
    return quote.regularMarketPrice;
  };

  // Fetch option chain for a specific ticker
  const getOptionChain = async (symbol: string) => {
    const options = await yf.options(symbol);
    return options;
  };

  // Example usage

  const symbol = "AAPL"; // Apple Inc.

  // Get stock price
  const stockPrice = await getStockPrice(symbol);
  console.log(`Current Stock Price: ${stockPrice}`);

  // Get option chain (which includes strike prices and expirations)
  const optionData = await getOptionChain(symbol);
  console.log(`Option Chain:`, optionData);

  // Define the type for the option data
  interface OptionData {
    contractSymbol: string;
    strike: number;
    currency: string;
    lastPrice: number;
    change: number;
    percentChange: number;
    volume: number;
    openInterest: number;
    bid: number;
    ask: number;
    contractSize: string;
    expiration: string; // ISO date format string
    lastTradeDate: string; // ISO date format string
    impliedVolatility: number;
    inTheMoney: boolean;
  }

  // Main function to calculate Black-Scholes price from option data
  function calculateOptionPrice(option: OptionData): number {
    const stockPrice = option.bid; // Using bid price as the current stock price (S)
    const strikePrice = option.strike; // Strike price (K)
    const expirationDate = new Date(option.expiration);
    const currentDate = new Date(); // Current date
    const timeToExpiration =
      (expirationDate.getTime() - currentDate.getTime()) /
      (1000 * 60 * 60 * 24 * 365); // T (in years)
    const riskFreeRate = 0.05; // Assumed risk-free rate (5%)
    const volatility = option.impliedVolatility; // Volatility (σ), converting to decimal

    console.log({ timeToExpiration });
    // Calculate and return the Black-Scholes price for the option
    return bs.blackScholes(
      stockPrice,
      strikePrice,
      1 / 365,
      volatility,
      riskFreeRate,
      "call"
    );
  }

  // Example usage with the provided option data
  const optionData1: OptionData = {
    contractSymbol: "AAPL240927C00105000",
    strike: 105,
    currency: "USD",
    lastPrice: 117.6,
    change: 0,
    percentChange: 0,
    volume: 1,
    openInterest: 1,
    bid: 121.9,
    ask: 123.25,
    contractSize: "REGULAR",
    expiration: "2024-09-27T00:00:00.000Z",
    lastTradeDate: "2024-09-03T18:16:00.000Z",
    impliedVolatility: 3.93750015625,
    inTheMoney: true,
  };

  // Calculate the Black-Scholes price
  const option = optionData.options[0].calls[0];
  console.log("option", option);
  const optionPrice = calculateOptionPrice(option);
  console.log(`Call Option Price: ${optionPrice}`);
  res.status(200).json({ stockPrice, options: optionData });
}
