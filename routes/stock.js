const express = require("express");
const axios = require("axios");
const router = express.Router();
const API = "https://www.twse.com.tw/exchangeReport/";
const data = require("./Data");
const MonthInfo = require("../models/monthInfo");

const getInfo = async () => {
  try {
    return await axios.get(`${API}TWT48U?response=json`).then((response) => {
      //console.log(response.data.data);
      return response.data.data;
    });
  } catch (error) {
    return error;
  }
};

//STOCK_DAY => 各日成交資訊
//STOCK_DAY_AVG => 日收盤價及月平均收盤價
//FMSRFK => 月成交資訊
const getStockMonth = async (date, stockNo) => {
  try {
    return await MonthInfo.find({ stockNo: stockNo }).then(async (data) => {
      if (!data.length) {
        let newData = await axios.get(
          `${API}FMSRFK?response=json&date=${date}&stockNo=${stockNo}`
        );

        try {
          let entity = {
            stockNo: stockNo,
            data: newData.data.data,
            updateDate: date,
          };
          const monthInfo = new MonthInfo(entity);

          let result = await monthInfo.save();
          console.log(`save ${stockNo} success`, result);
          return entity;
        } catch (err) {
          console.log(`save ${stockNo} fali`, err);
          return {};
        }
      }

      return data[0].data;
    });
  } catch (error) {
    console.error("fetch month error: ", error);
    return error;
  }
};

const getStockDay = async (date, stockNo) => {
  try {
    return await axios
      .get(`${API}STOCK_DAY?response=json&date=${date}&stockNo=${stockNo}`)
      .then((response) => {
        //console.log(response.data);
        return response.data.data;
      });
  } catch (error) {
    return error;
  }
};

//除權除息日期
router.get("/info", (req, res) => {
  //console.log("get stock info", data);
  return res.send(data);
});

//月成交資訊
router.get("/month/:stockNo", async function (req, res) {
  let rightNow = new Date().toISOString().slice(0, 10).replace(/-/g, ""); //yyyymmdd
  let result = await getStockMonth(rightNow, req.params.stockNo);
  console.log("result", result);
  return res.send(result);
});

//各日成交資訊
router.get("/day/:date/:stockNo", async function (req, res) {
  let result = await getStockDay(req.params.date, req.params.stockNo);
  return res.send(result);
});

module.exports = router;
