import React, { useEffect, useState } from "react";

export default function StockFrame(props) {
  const { stockNo, divRef, variant } = props;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (variant !== "sm") {
      const height = divRef.current.clientHeight;
      setHeight(window.innerHeight - 100 > height ? height : 10);
    } else {
      setHeight(window.innerHeight);
    }
  }, []);

  return (
    height && (
      <iframe
        src={`https://www.cmoney.tw/finance/technicalanalysis.aspx?s=${stockNo}`}
        width="100%"
        style={{
          height: variant == "sm" ? `${height}px` : `calc(100vh - 60px - ${height}px)`,
        }}
      ></iframe>
    )
  );
}
