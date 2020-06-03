// HINTS INDICATOR
const getCurrentMonthSpent = (transactionList = []) => {
  if (transactionList.length === 0) return { spentList: 0, spentSum: 0 };
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();
  const currentMonthTransactions = transactionList.filter((transaction) => {
    const transactionDate = new Date(`${transaction.date}`);
    const transactionMonth = transactionDate.getMonth() + 1;
    const transactionYear = transactionDate.getFullYear();
    return (
      currentYear === transactionYear &&
      `${currentMonth}` === `${transactionMonth}`
    );
  });
  const spentList =
    currentMonthTransactions.length > 0
      ? currentMonthTransactions.map((item) => item.amount)
      : [0];
  const spentSum =
    spentList.length > 0
      ? spentList.reduce((sum = 0, item) => parseInt(sum) + parseInt(item))
      : 0;
  return { spentList, spentSum };
};
export { getCurrentMonthSpent };
