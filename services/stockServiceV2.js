const DividendInfo = require("../models/dividendInfo/serviceV2");

/**
 * 取得除權息預告表
 */
const getDetail = async (stockNo) => {
  try {
    let data = await DividendInfo.entity.findOne({ stockNo: stockNo }).exec();

    if (!data) {
      data = await DividendInfo.getData(stockNo);
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, data: {}, error };
  }
};

module.exports = {
  getDetail,
};
