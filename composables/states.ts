export const useTradingviewSymbol = () => useState("symbol", () => "BTCUSD");
export const useAuthenticated = () => useState("isAuthenticated", () => true);
export const useMarkets = () => useState("market", () => "A");
export const useSymbols = () => useState("useSymbols", () => []);
export const useStockbullBotHistory = () =>
  useState("useStockbullBotHistory", () => []);

export const useStockbullMarkets = () =>
  useState("useStockbullMarkets", () => []);

export const useActiveTradingViewSymbol = () =>
  useState("activeSymbol", () => {
    return {
      symbol: "BTCUSDT",
      price: 37340.08,
      changePercentage: 0.18,
    };
  });
