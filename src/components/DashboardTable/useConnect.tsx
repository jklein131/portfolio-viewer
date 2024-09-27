import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Chart } from "react-google-charts";
import { advancedSearch, cn, getPercentColor } from "@/lib/utils";
import { Position } from "./types";
import { columns } from "./constants";
import { error } from "console";
import useBtcUsdMultiplier from "@/hooks/useBtcUsdMultiplier";

export const useConnect = ({ data }: { data: Position[] }) => {
  const btcData = useBtcUsdMultiplier();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [search, setSearch] = React.useState<string>("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const tableData = React.useMemo(() => {
    const rowHydrator = (data: Position[]) => {
      return data.map((t) => {
        if (t.underlying === "BTC") {
          const price = btcData.loading ? 0 : btcData.btcUsd;
          return {
            ...t,
            price: price,
            equity: (price ?? 0) * t.quantity,
          };
        }
        return {
          ...t,
          equity: (t.price ?? 0) * t.quantity,
        };
      });
    };

    const hydratedData = rowHydrator(data);
    return advancedSearch(search, hydratedData);
  }, [search, data, btcData.btcUsd]);

  const table = useReactTable({
    data: tableData.data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const totalValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    tableData.data.reduce((prev, cur) => {
      return prev + cur.equity;
    }, 0)
  );
  const totalLiability = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    tableData.data.reduce((prev, cur) => {
      if (cur.equity < 0) {
        return prev + cur.equity;
      }
      return prev;
    }, 0)
  );

  // Calculate Net Equity by Provider
  const netEquityByProvider = tableData.data.reduce((acc, position) => {
    // const provider =
    const netEquity = position.quantity * (position?.price || 0);
    const old = acc.get(position.provider) ?? 0;
    acc.set(position.provider, old + netEquity);
    return acc;
  }, new Map<string, number>());
  // Prepare data for the bar chart
  const barChartData = [
    ["Provider", "Net Equity"],
    ...Array.from(netEquityByProvider).map(([provider, netEquity]) => [
      provider,
      netEquity,
    ]),
  ];

  // Prepare data for the pie chart (Number of Positions in Each Strategy)
  const strategyCounts = tableData.data.reduce((acc, position) => {
    const count = acc.get(position.strategy) || 0;
    acc.set(position.strategy, count + 1);
    return acc;
  }, new Map<string, number>());

  const pieChartData = [
    ["Strategy", "Number of Positions"],
    ...Array.from(strategyCounts).map(([strategy, count]) => [strategy, count]),
  ];
  const calculateNegativeEquityPercentage = (data: Position[]) => {
    const equityByUnderlying = new Map<
      string,
      { total: number; negative: number }
    >();

    data.map((position) => {
      const netEquity = position.quantity * (position.price ?? 0);
      const underlying = position.underlying;

      if (!equityByUnderlying.get(underlying)) {
        equityByUnderlying.set(underlying, { total: 0, negative: 0 });
      }

      // Add to total equity
      const ret = equityByUnderlying.get(underlying) || {
        total: 0,
        negative: 0,
      };

      // Add to negative equity if netEquity is negative
      if (netEquity < 0) {
        equityByUnderlying.set(underlying, {
          ...ret,
          negative: ret.negative + netEquity,
        });
      } else {
        equityByUnderlying.set(underlying, {
          ...ret,
          total: ret.total + netEquity,
        });
      }
    });

    // Calculate percentage of negative equity
    return Array.from(equityByUnderlying).map(([underlying, values]) => [
      underlying,
      values.total !== 0 ? Math.abs((values.negative / values.total) * 100) : 0, // Negative Equity Percentage
      // Math.abs(values.total) - Math.abs(values.negative), // Non-negative Equity (for stacked bar chart)
    ]);
  };

  const chartData = [
    ["Underlying", "Negative Equity (%)"],
    ...calculateNegativeEquityPercentage(tableData.data),
  ];
  const stats = [
    {
      name: "Total Equity",
      stat: totalValue,
    },
    {
      name: "Total Liability",
      stat: totalLiability,
    },
    {
      name: "Total Assets",
      stat: tableData.data.length,
    },
    {
      name: "Net Equity By Provider",
      footer: (
        <Chart
          chartType="Bar"
          data={barChartData}
          options={{
            legend: { position: "none" },
            title: "Net Equity by Provider",
            hAxis: { title: "Net Equity" },
            vAxis: { title: "Provider" },
          }}
          width="100%"
          height="400px"
        />
      ),
    },
    {
      name: "Net Equity Risk",
      footer: (
        <Chart
          chartType="BarChart"
          data={chartData}
          options={{
            legend: { position: "none" },
            title: "Percentage of Negative Equity by Underlying Asset",
            isStacked: true,
            hAxis: { title: "Percentage" },
            vAxis: { title: "Underlying Asset" },
            colors: ["#e57373", "#81c784"], // Red for negative, Green for positive
          }}
          width="100%"
          height="400px"
          legendToggle
        />
      ),
    },
    {
      name: "Net Equity By Provider",
      footer: (
        <Chart
          chartType="PieChart"
          data={pieChartData}
          options={{
            title: "Number of Positions in Each Strategy",
            is3D: true,
          }}
          width="100%"
          height="400px"
        />
      ),
    },
  ];
  return { stats, tableData, search, setSearch, table };
};
