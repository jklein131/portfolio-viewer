// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
var bs = require("black-scholes");

export interface Root {
  stockPrice: number;
  options: Options;
}

export interface Options {
  options: Options2;
}

export interface Options2 {
  calls: Call[];
  puts: Put[];
}

export interface Call {
  contractSymbol: string;
  strike: number;
  currency: string;
  lastPrice: number;
  change: number;
  percentChange: number;
  volume?: number;
  openInterest: number;
  bid: number;
  ask: number;
  contractSize: string;
  expiration: string;
  lastTradeDate: string;
  impliedVolatility: number;
  inTheMoney: boolean;
  optionValue: number;
}

export interface Put {
  contractSymbol: string;
  strike: number;
  currency: string;
  lastPrice: number;
  change: number;
  percentChange: number;
  openInterest: number;
  bid: number;
  ask: number;
  contractSize: string;
  expiration: string;
  lastTradeDate: string;
  impliedVolatility: number;
  inTheMoney: boolean;
  optionValue: number;
  volume?: number;
}

export type OptionsReturnData = Root;

export async function getOptionsForTicker(symbol: string) {
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
  // Get stock price
  const stockPrice = await getStockPrice(symbol);

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
  function calculateOptionPrice(
    option: OptionData,
    optionType: "call" | "put"
  ): number {
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
      optionType
    );
  }

  // Calculate the Black-Scholes price
  const optionRet = {
    options: {
      calls: optionData.options[0].calls.map((t: any) => {
        return {
          ...t,
          optionValue: calculateOptionPrice(t, "call"),
        };
      }),
      puts: optionData.options[0].puts.map((t: any) => {
        return {
          ...t,
          optionValue: calculateOptionPrice(t, "put"),
        };
      }),
    },
  };
  return { stockPrice, options: optionRet } as OptionsReturnData;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OptionsReturnData | { error: string }>
) {
  // Example usage

  if (!req.query.ticker) {
    res.status(400).json({ error: "ticker error" });
    return;
  }

  const symbol = req.query.ticker as string; // Apple Inc.

  res.status(200).json(await getOptionsForTicker(symbol));
}
