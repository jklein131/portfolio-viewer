// The lowercase is intentional since it allows us to keep a constant search
export interface Position {
  ticker: string;
  underlying: string;
  assettype: string;
  strategy: string;
  venue: string;
  provider: string;
  isbeta: string;
  classification: string;
  quantity: number;
  price: number | null;
}
