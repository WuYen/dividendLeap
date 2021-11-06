function name(params) {
  const data = [
    { t1: "882", t2: "成交量" },
    { t1: "12.83 (30.78)", t2: "本益比 (同業平均)" },
    { t1: "連5漲 ( 2.22% )", t2: "連漲連跌" },
  ];
  return (
    <div>
      <div>創見2451半導體</div>
      <div className="space between">
        <div className="left">
          <div>69.0 ^0.8(1.17%)</div>
          <div>收盤 | 2021/11/05 14:30 更新</div>
        </div>
        <div className="right">
          {data.map((item) => (
            <div>
              <div>{item.t1}</div>
              <div>{item.t2}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
