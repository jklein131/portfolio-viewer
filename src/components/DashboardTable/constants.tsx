import { Position } from "./types";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, getPercentColor } from "@/lib/utils";
export const columns: ColumnDef<Position>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ticker",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ticker
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("ticker")}</div>,
  },
  {
    accessorKey: "underlying",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Underlying
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("underlying")}</div>,
  },
  {
    accessorKey: "assettype",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asset Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("assettype")}</div>,
  },
  {
    accessorKey: "strategy",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Strategy
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("strategy")}</div>,
  },
  {
    accessorKey: "venue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Venue
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("venue")}</div>,
  },
  {
    accessorKey: "provider",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Provider
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("provider")}</div>,
  },
  {
    accessorKey: "classification",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Classification
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("classification")}</div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="">{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "equity",
    header: () => <div className="text-right">Equity</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("equity"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div
          className={cn(
            "text-right font-medium",
            getPercentColor(amount, false)
          )}
        >
          <span className={getPercentColor(amount, false)}>{formatted}</span>
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const Position = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(Position.Ticker)}
  //           >
  //             Copy Position Ticker
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View Position details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export const mockData: Position[] = [
  {
    ticker: "Asset7",
    underlying: "AAPL",
    assettype: "equity",
    strategy: "longshort",
    venue: "broker",
    provider: "TS",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 6741,
    price: 48,
  },
  {
    ticker: "Asset9",
    underlying: "AAPL",
    assettype: "equity",
    strategy: "longshort",
    venue: "broker",
    provider: "TS",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 7593,
    price: 36,
  },
  {
    ticker: "AAPL250417C00275000",
    underlying: "AAPL",
    assettype: "options",
    strategy: "derivatives",
    venue: "broker",
    provider: "TS",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 4415,
    price: null,
  },
  {
    ticker: "Asset2",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 4475,
    price: null,
  },
  {
    ticker: "Asset5",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -1784,
    price: null,
  },
  {
    ticker: "Asset43",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -2565,
    price: null,
  },
  {
    ticker: "Asset35",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -4038,
    price: null,
  },
  {
    ticker: "Asset36",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 3666,
    price: null,
  },
  {
    ticker: "Asset6",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange2",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 8885,
    price: null,
  },
  {
    ticker: "Asset14",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -1956,
    price: null,
  },
  {
    ticker: "Asset59",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -1375,
    price: null,
  },
  {
    ticker: "Asset23",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -2193,
    price: null,
  },
  {
    ticker: "Asset47",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -1504,
    price: null,
  },
  {
    ticker: "Asset17",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 9866,
    price: null,
  },
  {
    ticker: "Asset40",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 8297,
    price: null,
  },
  {
    ticker: "Asset1",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 7586,
    price: null,
  },
  {
    ticker: "Asset19",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 9909,
    price: null,
  },
  {
    ticker: "Asset16",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -2418,
    price: null,
  },
  {
    ticker: "Asset3",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 9977,
    price: null,
  },
  {
    ticker: "Asset4",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -2857,
    price: null,
  },
  {
    ticker: "Asset34",
    underlying: "BTC",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -3461,
    price: null,
  },
  {
    ticker: "Asset15",
    underlying: "COIN",
    assettype: "bond",
    strategy: "credit",
    venue: "broker",
    provider: "MyBank",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 4440,
    price: 30,
  },
  {
    ticker: "Asset24",
    underlying: "DRA",
    assettype: "close-ended-trust",
    strategy: "longshort",
    venue: "broker",
    provider: "Wellington",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 6798,
    price: 66,
  },
  {
    ticker: "Asset25",
    underlying: "DRB",
    assettype: "close-ended-trust",
    strategy: "longshort",
    venue: "broker",
    provider: "Wellington",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 3802,
    price: 91,
  },
  {
    ticker: "Asset26",
    underlying: "DRC",
    assettype: "close-ended-trust",
    strategy: "longshort",
    venue: "broker",
    provider: "Wellington",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -2236,
    price: 44,
  },
  {
    ticker: "Asset27",
    underlying: "DRD",
    assettype: "close-ended-trust",
    strategy: "longshort",
    venue: "broker",
    provider: "Wellington",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 5093,
    price: 34,
  },
  {
    ticker: "Asset28",
    underlying: "DRW",
    assettype: "close-ended-trust",
    strategy: "longshort",
    venue: "broker",
    provider: "Wellington",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 284,
    price: 64,
  },
  {
    ticker: "Asset38",
    underlying: "DRX",
    assettype: "close-ended-trust",
    strategy: "longshort",
    venue: "broker",
    provider: "Wellington",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 2234,
    price: 63,
  },
  {
    ticker: "Asset37",
    underlying: "DRZ",
    assettype: "close-ended-trust",
    strategy: "longshort",
    venue: "broker",
    provider: "Wellington",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -1318,
    price: 63,
  },
  {
    ticker: "Asset21",
    underlying: "ETH",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "on-chain",
    provider: "Ethereum Wallet",
    isbeta: "Yes",
    classification: "MPC",
    quantity: 7171,
    price: 2625,
  },
  {
    ticker: "Asset22",
    underlying: "ETH",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "on-chain",
    provider: "Optimism Wallet",
    isbeta: "Yes",
    classification: "MPC",
    quantity: 4588,
    price: 2625,
  },
  {
    ticker: "Asset18",
    underlying: "ETH",
    assettype: "crypto-options",
    strategy: "derivatives",
    venue: "dealer",
    provider: "ISDA",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 5201,
    price: 2625,
  },
  {
    ticker: "Asset20",
    underlying: "ETH",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "on-chain",
    provider: "Arbitrum Wallet",
    isbeta: "Yes",
    classification: "MPC",
    quantity: 2499,
    price: 2625,
  },
  {
    ticker: "Asset67",
    underlying: "ETH",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "on-chain",
    provider: "Ethereum Wallet",
    isbeta: "Yes",
    classification: "MPC",
    quantity: -523,
    price: 2625,
  },
  {
    ticker: "Asset30",
    underlying: "INTC",
    assettype: "equity",
    strategy: "longshort",
    venue: "broker",
    provider: "TS",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 4514,
    price: 82,
  },
  {
    ticker: "Asset29",
    underlying: "INTC",
    assettype: "equity",
    strategy: "longshort",
    venue: "broker",
    provider: "TS",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 302,
    price: 82,
  },
  {
    ticker: "INTC241115C00019000",
    underlying: "INTC",
    assettype: "options",
    strategy: "derivatives",
    venue: "broker",
    provider: "TS",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -177,
    price: null,
  },
  {
    ticker: "INTC241101P00022000",
    underlying: "INTC",
    assettype: "options",
    strategy: "derivatives",
    venue: "broker",
    provider: "TS",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 422,
    price: null,
  },
  {
    ticker: "Asset65",
    underlying: "MU",
    assettype: "equity",
    strategy: "longshort",
    venue: "broker",
    provider: "TS",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -4109,
    price: 25,
  },
  {
    ticker: "NVDA260116C00160000",
    underlying: "NVDA",
    assettype: "options",
    strategy: "derivatives",
    venue: "broker",
    provider: "TS",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 9976,
    price: null,
  },
  {
    ticker: "Asset13",
    underlying: "NVDA",
    assettype: "equity",
    strategy: "longshort",
    venue: "broker",
    provider: "TS",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -627,
    price: 300,
  },
  {
    ticker: "NVDA241220P00120000",
    underlying: "NVDA",
    assettype: "options",
    strategy: "derivatives",
    venue: "broker",
    provider: "TS",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -1076,
    price: null,
  },
  {
    ticker: "NVDA241220C00125000",
    underlying: "NVDA",
    assettype: "options",
    strategy: "derivatives",
    venue: "broker",
    provider: "TS",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 7333,
    price: null,
  },
  {
    ticker: "Asset46",
    underlying: "SOL",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange2",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 5238,
    price: 150,
  },
  {
    ticker: "Asset45",
    underlying: "SOL",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "on-chain",
    provider: "Solana Wallet",
    isbeta: "Yes",
    classification: "MPC",
    quantity: 4127,
    price: 150,
  },
  {
    ticker: "Asset44",
    underlying: "SOL",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "on-chain",
    provider: "Solana Wallet",
    isbeta: "Yes",
    classification: "MPC",
    quantity: -3360,
    price: 150,
  },
  {
    ticker: "Asset42",
    underlying: "SOL",
    assettype: "crypto-options",
    strategy: "derivatives",
    venue: "dealer",
    provider: "ISDA",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -357,
    price: 150,
  },
  {
    ticker: "Asset62",
    underlying: "USD",
    assettype: "accrual",
    strategy: "accounting",
    venue: "accounting",
    provider: "Accounting",
    isbeta: "No",
    classification: "accounting",
    quantity: 2374,
    price: 1,
  },
  {
    ticker: "Asset56",
    underlying: "USD",
    assettype: "cash equivalents",
    strategy: "other",
    venue: "broker",
    provider: "MyBank",
    isbeta: "No",
    classification: "3PC",
    quantity: 5567,
    price: 1,
  },
  {
    ticker: "Asset63",
    underlying: "USD",
    assettype: "cash equivalents",
    strategy: "accounting",
    venue: "accounting",
    provider: "Accounting",
    isbeta: "No",
    classification: "accounting",
    quantity: 4971,
    price: 1,
  },
  {
    ticker: "Asset48",
    underlying: "USD",
    assettype: "cash",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "No",
    classification: "3PC",
    quantity: -1964,
    price: 1,
  },
  {
    ticker: "Asset54",
    underlying: "USD",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "No",
    classification: "3PC",
    quantity: -3996,
    price: 1,
  },
  {
    ticker: "Asset57",
    underlying: "USD",
    assettype: "margin",
    strategy: "accounting",
    venue: "",
    provider: "CryptoExchange1",
    isbeta: "No",
    classification: "3PC",
    quantity: 6623,
    price: 1,
  },
  {
    ticker: "Asset41",
    underlying: "USD",
    assettype: "cash equivalents",
    strategy: "derivatives",
    venue: "dealer",
    provider: "ISDA",
    isbeta: "No",
    classification: "3PC",
    quantity: -2170,
    price: 1,
  },
  {
    ticker: "Asset60",
    underlying: "USD",
    assettype: "accrual",
    strategy: "accounting",
    venue: "accounting",
    provider: "Accounting",
    isbeta: "No",
    classification: "accounting",
    quantity: 7979,
    price: 1,
  },
  {
    ticker: "Asset51",
    underlying: "USD",
    assettype: "cash equivalents",
    strategy: "longshort",
    venue: "broker",
    provider: "TS",
    isbeta: "No",
    classification: "3PC",
    quantity: -3414,
    price: 1,
  },
  {
    ticker: "Asset52",
    underlying: "USD",
    assettype: "cash equivalents",
    strategy: "derivatives",
    venue: "broker",
    provider: "TS",
    isbeta: "No",
    classification: "3PC",
    quantity: -3981,
    price: 1,
  },
  {
    ticker: "Asset61",
    underlying: "USD",
    assettype: "cash equivalents",
    strategy: "derivatives",
    venue: "dealer",
    provider: "ISDA",
    isbeta: "No",
    classification: "3PC",
    quantity: 6709,
    price: 1,
  },
  {
    ticker: "Asset66",
    underlying: "USD",
    assettype: "accrual",
    strategy: "accounting",
    venue: "accounting",
    provider: "Accounting",
    isbeta: "No",
    classification: "accounting",
    quantity: 2820,
    price: 1,
  },
  {
    ticker: "Asset50",
    underlying: "USD",
    assettype: "cash equivalents",
    strategy: "other",
    venue: "bank",
    provider: "MyBank",
    isbeta: "No",
    classification: "3PC",
    quantity: 5564,
    price: 1,
  },
  {
    ticker: "Asset53",
    underlying: "USD",
    assettype: "cash equivalents",
    strategy: "longshort",
    venue: "broker",
    provider: "TS",
    isbeta: "No",
    classification: "3PC",
    quantity: -1910,
    price: 1,
  },
  {
    ticker: "Asset64",
    underlying: "USD",
    assettype: "accrual",
    strategy: "accounting",
    venue: "accounting",
    provider: "Accounting",
    isbeta: "No",
    classification: "accounting",
    quantity: 3028,
    price: 1,
  },
  {
    ticker: "Asset33",
    underlying: "USD",
    assettype: "accrual",
    strategy: "accounting",
    venue: "broker",
    provider: "TS",
    isbeta: "No",
    classification: "3PC",
    quantity: 460,
    price: 1,
  },
  {
    ticker: "Asset49",
    underlying: "USD",
    assettype: "cash",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange2",
    isbeta: "No",
    classification: "3PC",
    quantity: 1975,
    price: 1,
  },
  {
    ticker: "Asset55",
    underlying: "USDT",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: 2657,
    price: 1,
  },
  {
    ticker: "Asset58",
    underlying: "XRP",
    assettype: "cryptoasset",
    strategy: "other",
    venue: "crypto-exchange",
    provider: "CryptoExchange1",
    isbeta: "Yes",
    classification: "3PC",
    quantity: -730,
    price: 32,
  },
];
