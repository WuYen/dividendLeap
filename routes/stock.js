const express = require("express");
const axios = require("axios");
const router = express.Router();
const API = "https://www.twse.com.tw/exchangeReport/";
const data = require("./Data");
const MonthInfo = require("../models/monthInfo");
const DayInfo = require("../models/dayInfo");
const Schedule = require("../models/schedule");

const getInfo = async () => {
  try {
    let yyyymm = new Date().toISOString().slice(0, 8).replace(/-/g, "");
    let data = await Schedule.find({ updateDate: yyyymm });
    if (!data.length) {
      let response = await axios.get(`${API}TWT48U?response=json`);

      let entity = {
        data: response.data.data,
        updateDate: yyyymm,
      };
      const schedule = new Schedule(entity);

      let result = await schedule.save();
      console.log(`save schedule success`, result);

      return entity.data;
    }
    return data[0].data;
  } catch (error) {
    console.error("fetch schedule error: ", error);
    return error;
  }
};

//date:yyyymmdd
const getStockMonth = async (date, stockNo) => {
  try {
    return await MonthInfo.find({ stockNo: stockNo }).then(async (data) => {
      if (!data.length) {
        //FMSRFK => 月成交資訊
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
          console.log(`save ${stockNo} by month success`, result);
          return entity.data;
        } catch (err) {
          console.log(`save ${stockNo} by month fali`, err);
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

//date:yyyymmdd
const getStockDay = async (date, stockNo) => {
  try {
    return await DayInfo.find({ stockNo: stockNo, updateDate: date }).then(
      async (data) => {
        if (!data.length) {
          //STOCK_DAY => 各日成交資訊
          let newData = await axios.get(
            `${API}STOCK_DAY?response=json&date=${date}&stockNo=${stockNo}`
          );

          try {
            let entity = {
              stockNo: stockNo,
              data: newData.data.data,
              updateDate: date,
            };
            const dayInfo = new DayInfo(entity);

            let result = await dayInfo.save();
            console.log(`save ${stockNo} by day success`, result);
            return entity.data;
          } catch (err) {
            console.log(`save ${stockNo} by day fali`, err);
            return {};
          }
        }

        return data[0].data;
      }
    );
  } catch (error) {
    console.error("fetch day error: ", error);
    return error;
  }
};

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

module.exports = router;

//STOCK_DAY_AVG => 日收盤價及月平均收盤價
