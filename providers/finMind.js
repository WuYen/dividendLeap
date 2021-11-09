//https://finmind.github.io/quickstart/
//https://api.finmindtrade.com/docs#/default/data_api_v4_data_get
//https://finmind.github.io/tutor/TaiwanMarket/Technical/#taiwanstockprice

//sample URL: https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockPrice&data_id=2330&start_date=2020-04-02&end_date=2020-04-12&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyMS0xMS0wNCAyMTo0NzowMSIsInVzZXJfaWQiOiJhc3RvY2swMDUwIiwiaXAiOiI2MC4yNTEuNDcuMTk3In0.0zAjTOwcnqvs5sacfs2lpi8mffe3LhUcf_xBLYvT6zM

let query = {
  dataset: "TaiwanStockPrice",
  data_id: "2330",
  start_date: "2020-04-02",
  end_date: "2020-04-12",
};

let result = [
  {
    date: "2020-04-06", //完整日期 20200101、年度 2020、月份 01
    stock_id: "2330",
    Trading_Volume: 59712754,
    Trading_money: 16324198154,
    open: 273,
    max: 275.5,
    min: 270,
    close: 275.5, //股價
    spread: 4,
    Trading_turnover: 19971,
  },
  {
    date: "2020-04-07",
    stock_id: "2330",
    Trading_Volume: 48887346,
    Trading_money: 13817936851,
    open: 283.5,
    max: 284,
    min: 280.5,
    close: 283,
    spread: 7.5,
    Trading_turnover: 24281,
  },
  {
    date: "2020-04-08",
    stock_id: "2330",
    Trading_Volume: 38698826,
    Trading_money: 11016972354,
    open: 285,
    max: 285.5,
    min: 283,
    close: 285,
    spread: 2,
    Trading_turnover: 19126,
  },
];

//dataset:
// 技術面
// 台股總覽 TaiwanStockInfo
// 台灣股價資料表 TaiwanStockPrice
// 歷史台股最佳五檔 TaiwanStockPriceBidAsk
// 個股 PER、PBR 資料表 TaiwanStockPER
// 每 5 秒委託成交統計 TaiwanStockStatisticsOfOrderBookAndTrade
// 加權指數 TaiwanVariousIndicators5Seconds
// 當日沖銷交易標的及成交量值 TaiwanStockDayTrading
// 加權、櫃買報酬指數 TaiwanStockTotalReturnIndex

// 籌碼面
// 個股融資融劵表 TaiwanStockMarginPurchaseShortSale
// 整體市場融資融劵表 TaiwanStockTotalMarginPurchaseShortSale
// 個股三大法人買賣表 TaiwanStockInstitutionalInvestorsBuySell
// 整體三大市場法人買賣表 TaiwanStockTotalInstitutionalInvestors
// 外資持股表 TaiwanStockShareholding
// 股權持股分級表 TaiwanStockHoldingSharesPer
// 借券成交明細 TaiwanStockSecuritiesLending
// 融券借券賣出 TaiwanDailyShortSaleBalances

// 基本面
// 現金流量表 TaiwanStockCashFlowsStatement
// 綜合損益表 TaiwanStockFinancialStatements
// 資產負債表 TaiwanStockBalanceSheet
// 股利政策表 TaiwanStockDividend
// 除權除息結果表 TaiwanStockDividendResult
// 月營收表 TaiwanStockMonthRevenue
// 減資恢復買賣參考價格 TaiwanStockCapitalReductionReferencePrice
