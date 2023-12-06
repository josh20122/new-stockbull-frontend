export const useTradingviewSymbol = () => useState("symbol", () => "BTCUSD");

export const useAuthenticated = () => useState("isAuthenticated", () => true);

export const useMarkets = () => useState("market", () => "A");

export const useSymbols = () => useState("useSymbols", () => []);

export const useUser = () => useState("useUser", () => []);

export const useStockbullBotHistory = () =>
  useState("useStockbullBotHistory", () => []);

export const useStockbullProfits = () =>
  useState("useStockbullProfits", () => {
    return {
      profit: 0.0,
      loss: 0.0,
    };
  });

export const useActiveStockbullMarket = () =>
  useState("useActiveStockbullMarket", () => {
    return {
      name: "Stockbull (1f)",
      real_name: "november",
    };
  });


export const useStockbullAccounts = () =>
  useState("useStockbullAccounts", () => []);

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

export const useActiveAccount = () =>
  useState("useActiveAccount", () => {
    return {};
  });

export const useBotDetails = () => useState('useBotDetails', () => {
  return {
    activities: [],
    stake_amount: 0,
    wallets: [0, 0],
    stake: 0,
  }
})

export const useStockbullCountdown = () => useState('useStockbullCountdown', () => {
  return {
    timer: 0,
    percentage: 0,
  }
})

export const useStockbullNextPayment = () => useState('useStockbullNextPayment', () => 0);

export const useArbitrageConstants = () => useState('useArbitrageConstants', () => {
  return {
    cza: 20,
    cza2: 20,
  }
})

export const useUserArbitrageWallet = () => useState('useUserArbitrageWallet', () => {
  return [];
})