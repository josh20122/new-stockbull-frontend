export const useTradingviewSymbol = () => useState("symbol", () => "BTCUSD");

export const useActiveTradingViewSymbol = () =>
  useState("activeSymbol", () => {
    return {
      symbol: "BTCUSDT",
      price: 3356639,
      changePercentage: -26,
    };
  });
