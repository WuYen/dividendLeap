const fugleProvider = require("../providers/fugle.api");

function watch(stockNo) {
  // fugleProvider.socketClient(fugleProvider.channel.chart, "2884", (data) => {
  //   console.log("watch receive", data);
  // });
}

function unWatch(stockNo) {
  // fugleProvider.socketClient(fugleProvider.channel.chart, "2884", (data) => {
  //   console.log("watch receive", data);
  // });
}

module.exports = {
  watch,
  unWatch,
};
