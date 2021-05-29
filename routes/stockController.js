const router = require("express").Router();

const {
  getInfo,
  getStockMonth,
  getStockDay,
  getStockDetail,
} = require("../services/stockService");

//除權除息日期
router.get("/info", async (req, res) => {
  let result = await getInfo();
  return res.send(result);
});

//月成交資訊
router.get("/month/:stockNo", async function (req, res) {
  //["年度","月份","最高價","最低價","加權(A/B)平均價","成交筆數","成交金額(A)","成交股數(B)","週轉率(%)"]
  let rightNow = new Date().toISOString().slice(0, 10).replace(/-/g, ""); //yyyymmdd
  let result = await getStockMonth(rightNow, req.params.stockNo);
  return res.send(result);
});

//各日成交資訊 date:yyyymmdd
router.get("/day/:date/:stockNo", async function (req, res) {
  //["日期","成交股數","成交金額","開盤價","最高價","最低價","收盤價","漲跌價差","成交筆數"]
  let result = await getStockDay(req.params.date, req.params.stockNo);
  return res.send(result);
});

//個股除權息資料
router.get("/detail/:stockNo", async function (req, res) {
  let result = await getStockDetail(req.params.stockNo);
  return res.send(result);
});

module.exports = router;

//STOCK_DAY_AVG => 日收盤價及月平均收盤價
