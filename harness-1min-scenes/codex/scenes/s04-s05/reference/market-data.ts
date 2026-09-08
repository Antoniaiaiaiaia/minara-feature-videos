/**
 * Fixed demo market data for S04/S05. No live account data; prices are
 * plausible September-2026 levels in the spirit of the client's Markets tiles.
 * Logos are the exact files the client itself resolves for these symbols
 * (`lib/markets/asset-logo-resolver.ts` → static.minara.ai exchange-assets),
 * downloaded once into public/logos/curated/.
 */
export type Category = "crypto" | "stocks" | "commodities" | "indices";

export interface Asset {
  symbol: string;
  category: Category;
  price: number;
  changePct: number;
  volume: number; // 24h, USD
  logo: string; // public path
  /** Deterministic sparkline seed. */
  seed: number;
  /** Shows the green "Strong signal" tag in the waterfall (some cards only). */
  signal?: boolean;
}

const L = (f: string) => `logos/curated/${f}.svg`;

export const ASSETS: Asset[] = [
  { symbol: "NVDA", category: "stocks", price: 231.32, changePct: 0.25, volume: 9.16e6, logo: L("nvda"), seed: 11, signal: true },
  { symbol: "BTC", category: "crypto", price: 79866.3, changePct: 0.23, volume: 1.43e9, logo: L("btc"), seed: 2 },
  { symbol: "CL", category: "commodities", price: 68.42, changePct: -1.12, volume: 3.8e8, logo: L("cl"), seed: 5 },
  { symbol: "ETH", category: "crypto", price: 2496.9, changePct: 1.54, volume: 9.2e8, logo: L("eth"), seed: 3, signal: true },
  { symbol: "TSLA", category: "stocks", price: 356.63, changePct: 0.39, volume: 6.1e6, logo: L("tsla"), seed: 7 },
  { symbol: "GOLD", category: "commodities", price: 4427.8, changePct: -0.07, volume: 2.4e8, logo: L("gold"), seed: 13 },
  { symbol: "SOL", category: "crypto", price: 100.19, changePct: -3.77, volume: 4.1e8, logo: L("sol"), seed: 17 },
  { symbol: "SP500", category: "indices", price: 7724.6, changePct: 0.01, volume: 0, logo: L("sp500"), seed: 19 },
  { symbol: "COIN", category: "stocks", price: 186.21, changePct: 0.59, volume: 2.7e6, logo: L("coin"), seed: 23, signal: true },
  { symbol: "MU", category: "stocks", price: 1028.9, changePct: 1.24, volume: 1.9e6, logo: L("mu"), seed: 29 },
  { symbol: "HYPE", category: "crypto", price: 41.87, changePct: 4.62, volume: 3.3e8, logo: L("hype"), seed: 31, signal: true },
  { symbol: "XYZ100", category: "indices", price: 29623, changePct: 0.15, volume: 0, logo: L("xyz100"), seed: 37 },
  { symbol: "AAPL", category: "stocks", price: 268.14, changePct: -0.42, volume: 4.4e6, logo: L("aapl"), seed: 41 },
  { symbol: "XRP", category: "crypto", price: 1.35, changePct: -2.86, volume: 2.2e8, logo: L("xrp"), seed: 43 },
  { symbol: "SILVER", category: "commodities", price: 52.16, changePct: 0.88, volume: 9.1e7, logo: L("silver"), seed: 47 },
  { symbol: "MSFT", category: "stocks", price: 512.4, changePct: 0.31, volume: 2.1e6, logo: L("msft"), seed: 53 },
  { symbol: "DOGE", category: "crypto", price: 0.0819, changePct: -2.1, volume: 1.6e8, logo: L("doge"), seed: 59 },
  { symbol: "AMD", category: "stocks", price: 244.7, changePct: 2.08, volume: 3.6e6, logo: L("amd"), seed: 61, signal: true },
  { symbol: "LINK", category: "crypto", price: 11.28, changePct: 0.74, volume: 9.8e7, logo: L("link"), seed: 67 },
  { symbol: "PLTR", category: "stocks", price: 173.9, changePct: -1.36, volume: 5.2e6, logo: L("pltr"), seed: 71 },
  { symbol: "AVAX", category: "crypto", price: 18.64, changePct: 3.12, volume: 7.7e7, logo: L("avax"), seed: 73 },
  { symbol: "META", category: "stocks", price: 742.3, changePct: 0.12, volume: 1.4e6, logo: L("meta"), seed: 79 },
  { symbol: "SNDK", category: "stocks", price: 1783, changePct: 1.32, volume: 8.8e5, logo: L("sndk"), seed: 83 },
  { symbol: "RKLB", category: "stocks", price: 58.72, changePct: 5.41, volume: 3.1e6, logo: L("rklb"), seed: 89, signal: true },
  { symbol: "SUI", category: "crypto", price: 2.41, changePct: -0.93, volume: 6.4e7, logo: L("sui"), seed: 97 },
  { symbol: "AMZN", category: "stocks", price: 236.8, changePct: 0.67, volume: 3.9e6, logo: L("amzn"), seed: 101 },
  { symbol: "SKHX", category: "stocks", price: 1288.2, changePct: 0.8, volume: 7.5e5, logo: L("skhx"), seed: 103 },
  { symbol: "GOOGL", category: "stocks", price: 214.6, changePct: -0.28, volume: 2.6e6, logo: L("googl"), seed: 107 },
  { symbol: "NFLX", category: "stocks", price: 1194.5, changePct: 0.44, volume: 6.2e5, logo: L("nflx"), seed: 109 },
];

/** Category label the client shows in the tile badge (`markets.search.groupHeader.*`). */
export const CATEGORY_LABEL: Record<Category, string> = {
  crypto: "Crypto",
  stocks: "Stocks",
  commodities: "Commodities",
  indices: "Indices",
};

/** Deterministic 24-point close series that ends on the sign of `changePct`. */
export function sparkFor(a: Asset, n = 24): number[] {
  let s = a.seed * 9301 + 49297;
  const rnd = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  const drift = a.changePct / 100 / n;
  const out: number[] = [];
  let v = 1;
  for (let i = 0; i < n; i++) {
    v *= 1 + drift + (rnd() - 0.5) * 0.012;
    out.push(v);
  }
  // Pin the end so the trend colour and the printed change agree.
  const target = 1 + a.changePct / 100;
  const k = target / out[out.length - 1];
  return out.map((x, i) => x * (1 + (k - 1) * (i / (n - 1))));
}

export function fmtPrice(n: number): string {
  if (n >= 1000) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(2);
  return n.toFixed(4);
}

export function fmtPct(n: number): string {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toFixed(2)}%`;
}

export function fmtCompact(n: number): string {
  if (Math.abs(n) >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
  if (Math.abs(n) >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (Math.abs(n) >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toFixed(0);
}
