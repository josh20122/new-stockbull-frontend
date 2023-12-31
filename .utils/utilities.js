import axios from "axios";

export const setStockbullProfits = () => {
  let stockbullProfits = useStockbullProfits();
  const activeAccount = useActiveAccount();
  const stockbullAccounts = useStockbullAccounts();

  axios.get("/account-details").then((response) => {
    stockbullAccounts.value = response.data.accounts;
    stockbullProfits.value = response.data.profitBal;

    activeAccount.value = response.data.accounts.filter(
      (value) => value.type == "live"
    )[0];
  });
};


export const setStockbullBotDetails = () => {
  const botDetails = useBotDetails();
  axios.get("/bot-activity").then((response) => {
    botDetails.value = response.data
  });
}

export const handleStockbullNextPayment = () => {
  const nextPayment = useStockbullNextPayment();

  axios.get("/next-payment").then((response) => {
    nextPayment.value = response.data * 60
  });
}

export const setUserArbitrageWallets = () => {
  let wallet = useUserArbitrageWallet();
  axios.get('/user-arbitrage-markets').then(response => {
    wallet.value = response.data;
  })
}