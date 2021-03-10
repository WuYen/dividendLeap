import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { helper } from "../utility";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";

function Detail(props) {
  let { stockNo, name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${helper.APIKey}/stock/detail/${stockNo}`)
      .then((res) => {
        console.log("res", res);
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [stockNo]);

  console.log("data", data);
  return (
    <div>
      <Link to="/">Back To Home</Link>
      <div>
        {data ? (
          <MaterialTable {...getTableProps(stockNo, name)} data={data} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

function getTableProps(stockNo, name) {
  return {
    title: `${name}`,
    columns: [
      { title: "年度", field: "year0" },
      { title: "現金股利盈餘", field: "cash0" },
      { title: "現金股利公積", field: "cash1" },
      { title: "現金股利合計%", field: "cash2" },
      { title: "股票股利盈餘", field: "stock0" },
      { title: "股票股利公積", field: "stock1" },
      { title: "股票股利合計", field: "stock2" },
      { title: "股利合計%", field: "dividendTotal" },
    ],
    options: {
      search: false,
      paging: false,
    },
  };
}

export default Detail;
