export const useTradingviewSymbol = () => useState("symbol", () => "BTCUSD");

export const useActiveTradingViewSymbol = () =>
  useState("activeSymbol", () => {});
