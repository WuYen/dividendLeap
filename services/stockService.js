const axios = require("axios");

const API = "https://www.twse.com.tw/exchangeReport/";

const MonthInfo = require("../models/monthInfo");
const DayInfo = require("../models/dayInfo");
const Schedule = require("../models/schedule");
const DividendInfo = require("../models/dividendInfo");

const getStockDetailService = require("./webRequest");

/**
 * 取得除權息預告表
 */
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

/**
 * FMSRFK => 月成交資訊
 * @param {String} date yyyymmdd
 * @param {String} stockNo
 */
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

/**
 * STOCK_DAY => 各日成交資訊
 * @param {String} date yyyymmdd
 * @param {String} stockNo
 */
const getStockDay = async (date, stockNo) => {
  try {
    return await DayInfo.find({ stockNo: stockNo, updateDate: date }).then(
      async (data) => {
        if (!data.length) {
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

/**
 * 取得該股票歷年除權息資料
 * @param {String} stockNo
 */
const getStockDetail = async (stockNo) => {
  try {
    return await DividendInfo.find({ stockNo: stockNo }).then(async (data) => {
      if (!data.length) {
        try {
          let newData = await getStockDetailService(stockNo);
          // let entity = {
          //   stockNo: stockNo,
          //   data: newData.data.data,
          //   updateDate: date,
          // };
          // const dayInfo = new DayInfo(entity);

          // let result = await dayInfo.save();
          // console.log(`save ${stockNo} by day success`, result);
          return newData;
        } catch (err) {
          console.log(`save ${stockNo} by day fali`, err);
          return {};
        }
      }

      return data[0].data;
    });
  } catch (error) {
    console.error("fetch day error: ", error);
    return error;
  }
};

module.exports = {
  getInfo,
  getStockMonth,
  getStockDay,
  getStockDetail,
};
