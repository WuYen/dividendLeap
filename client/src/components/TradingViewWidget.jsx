import React, { useRef, useEffect } from "react";

export default function TradingViewWidget(props) {
  const ref = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
    script.async = true;
    script.innerHTML = `{
              "symbol": "TWSE:${props.stockNo}",
              "colorTheme": "light",
              "isTransparent": false,
              "largeChartUrl": "",
              "displayMode": "regular",
              "width": 480,
              "height": 830,
              "locale": "zh_TW"
            }
          `;

    ref.current.appendChild(script);
  }, []);

  return (
    <div class="tradingview-widget-container" ref={ref}>
      <div class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright">
        <a
          href={`https://tw.tradingview.com/symbols/TWSE-${props.stockNo}/financials-overview/`}
          rel="noopener"
          target="_blank"
        >
          <span class="blue-text">{props.stockNo}基本面數據</span>
        </a>
        由TradingView提供
      </div>
    </div>
  );
}

/*
<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <div class="tradingview-widget-copyright"><a href="https://tw.tradingview.com/symbols/TWSE-2881/financials-overview/" rel="noopener" target="_blank"><span class="blue-text">2881基本面數據</span> </a>由TradingView提供</div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-financials.js" async>
  {
  "symbol": "TWSE:2881",
  "colorTheme": "light",
  "isTransparent": false,
  "largeChartUrl": "",
  "displayMode": "regular",
  "width": "100%",
  "height": "100%",
  "locale": "zh_TW"
}
  </script>
</div>
<!-- TradingView Widget END -->
*/
