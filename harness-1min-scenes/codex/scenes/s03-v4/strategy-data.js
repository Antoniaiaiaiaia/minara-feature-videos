// Existing illustrative S08/S09 UI content; no execution or trading API.
const selectedAssets=new Set(['NVDA','AMD','AVGO','MU']);
function codeSource(){
  return [
    '// Semiconductor Trend',
    '// Long-only · daily evaluation',
    'export const strategy = {',
    `  universe: [${[...selectedAssets].map(x=>`"${x}"`).join(', ')}],`,
    '  interval: "1d",',
    '  factors: {',
    '    volumeTrend: "Volume Trend (Full History)",',
    '    returnVolatility: "Return Volatility (30D, inverted)",',
    '    atr: "Average True Range (12D)",',
    '  },',
    '  entry: "volumeTrend > 0",',
    '  rankBy: "returnVolatility",',
    '  direction: "long",',
    '  risk: { stopLossATR: 2, maxPositionPct: 25 },',
    '  rebalance: "daily",',
    '};',
  ];
}
