var Markets = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // codex/scenes/s04-s05/reference/market-data.ts
  var market_data_exports = {};
  __export(market_data_exports, {
    ASSETS: () => ASSETS,
    CATEGORY_LABEL: () => CATEGORY_LABEL,
    fmtCompact: () => fmtCompact,
    fmtPct: () => fmtPct,
    fmtPrice: () => fmtPrice,
    sparkFor: () => sparkFor
  });
  var L = (f) => `logos/curated/${f}.svg`;
  var ASSETS = [
    { symbol: "NVDA", category: "stocks", price: 231.32, changePct: 0.25, volume: 916e4, logo: L("nvda"), seed: 11, signal: true },
    { symbol: "BTC", category: "crypto", price: 79866.3, changePct: 0.23, volume: 143e7, logo: L("btc"), seed: 2 },
    { symbol: "CL", category: "commodities", price: 68.42, changePct: -1.12, volume: 38e7, logo: L("cl"), seed: 5 },
    { symbol: "ETH", category: "crypto", price: 2496.9, changePct: 1.54, volume: 92e7, logo: L("eth"), seed: 3, signal: true },
    { symbol: "TSLA", category: "stocks", price: 356.63, changePct: 0.39, volume: 61e5, logo: L("tsla"), seed: 7 },
    { symbol: "GOLD", category: "commodities", price: 4427.8, changePct: -0.07, volume: 24e7, logo: L("gold"), seed: 13 },
    { symbol: "SOL", category: "crypto", price: 100.19, changePct: -3.77, volume: 41e7, logo: L("sol"), seed: 17 },
    { symbol: "SP500", category: "indices", price: 7724.6, changePct: 0.01, volume: 0, logo: L("sp500"), seed: 19 },
    { symbol: "COIN", category: "stocks", price: 186.21, changePct: 0.59, volume: 27e5, logo: L("coin"), seed: 23, signal: true },
    { symbol: "MU", category: "stocks", price: 1028.9, changePct: 1.24, volume: 19e5, logo: L("mu"), seed: 29 },
    { symbol: "HYPE", category: "crypto", price: 41.87, changePct: 4.62, volume: 33e7, logo: L("hype"), seed: 31, signal: true },
    { symbol: "XYZ100", category: "indices", price: 29623, changePct: 0.15, volume: 0, logo: L("xyz100"), seed: 37 },
    { symbol: "AAPL", category: "stocks", price: 268.14, changePct: -0.42, volume: 44e5, logo: L("aapl"), seed: 41 },
    { symbol: "XRP", category: "crypto", price: 1.35, changePct: -2.86, volume: 22e7, logo: L("xrp"), seed: 43 },
    { symbol: "SILVER", category: "commodities", price: 52.16, changePct: 0.88, volume: 91e6, logo: L("silver"), seed: 47 },
    { symbol: "MSFT", category: "stocks", price: 512.4, changePct: 0.31, volume: 21e5, logo: L("msft"), seed: 53 },
    { symbol: "DOGE", category: "crypto", price: 0.0819, changePct: -2.1, volume: 16e7, logo: L("doge"), seed: 59 },
    { symbol: "AMD", category: "stocks", price: 244.7, changePct: 2.08, volume: 36e5, logo: L("amd"), seed: 61, signal: true },
    { symbol: "LINK", category: "crypto", price: 11.28, changePct: 0.74, volume: 98e6, logo: L("link"), seed: 67 },
    { symbol: "PLTR", category: "stocks", price: 173.9, changePct: -1.36, volume: 52e5, logo: L("pltr"), seed: 71 },
    { symbol: "AVAX", category: "crypto", price: 18.64, changePct: 3.12, volume: 77e6, logo: L("avax"), seed: 73 },
    { symbol: "META", category: "stocks", price: 742.3, changePct: 0.12, volume: 14e5, logo: L("meta"), seed: 79 },
    { symbol: "SNDK", category: "stocks", price: 1783, changePct: 1.32, volume: 88e4, logo: L("sndk"), seed: 83 },
    { symbol: "RKLB", category: "stocks", price: 58.72, changePct: 5.41, volume: 31e5, logo: L("rklb"), seed: 89, signal: true },
    { symbol: "SUI", category: "crypto", price: 2.41, changePct: -0.93, volume: 64e6, logo: L("sui"), seed: 97 },
    { symbol: "AMZN", category: "stocks", price: 236.8, changePct: 0.67, volume: 39e5, logo: L("amzn"), seed: 101 },
    { symbol: "SKHX", category: "stocks", price: 1288.2, changePct: 0.8, volume: 75e4, logo: L("skhx"), seed: 103 },
    { symbol: "GOOGL", category: "stocks", price: 214.6, changePct: -0.28, volume: 26e5, logo: L("googl"), seed: 107 },
    { symbol: "NFLX", category: "stocks", price: 1194.5, changePct: 0.44, volume: 62e4, logo: L("nflx"), seed: 109 }
  ];
  var CATEGORY_LABEL = {
    crypto: "Crypto",
    stocks: "Stocks",
    commodities: "Commodities",
    indices: "Indices"
  };
  function sparkFor(a, n = 24) {
    let s = a.seed * 9301 + 49297;
    const rnd = () => {
      s = s * 1103515245 + 12345 & 2147483647;
      return s / 2147483647;
    };
    const drift = a.changePct / 100 / n;
    const out = [];
    let v = 1;
    for (let i = 0; i < n; i++) {
      v *= 1 + drift + (rnd() - 0.5) * 0.012;
      out.push(v);
    }
    const target = 1 + a.changePct / 100;
    const k = target / out[out.length - 1];
    return out.map((x, i) => x * (1 + (k - 1) * (i / (n - 1))));
  }
  function fmtPrice(n) {
    if (n >= 1e3) return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
    if (n >= 1) return n.toFixed(2);
    return n.toFixed(4);
  }
  function fmtPct(n) {
    const sign = n > 0 ? "+" : "";
    return `${sign}${n.toFixed(2)}%`;
  }
  function fmtCompact(n) {
    if (Math.abs(n) >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
    if (Math.abs(n) >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (Math.abs(n) >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
    return n.toFixed(0);
  }
  return __toCommonJS(market_data_exports);
})();
