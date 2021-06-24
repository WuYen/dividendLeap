const router = require("express").Router();

const {
  getList,
  insert,
  update,
  remove,
} = require("../services/scheduleEditService");

//取得手動新增的除權資料清單
router.get("/list", async function (req, res) {
  let result = await getList();
  return res.send(result);
});

//手動新增個股除權息資料
router.post("/insert", async function (req, res) {
  let result = await insert(req.body);
  return res.send(result);
});

//手動新增個股除權息資料
router.post("/update", async function (req, res) {
  let result = await update(req.body);
  return res.send(result);
});

//手動新增個股除權息資料
router.post("/remove", async function (req, res) {
  let result = await remove(req.body);
  return res.send(result);
});

module.exports = router;
