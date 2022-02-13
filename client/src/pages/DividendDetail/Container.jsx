import React from "react";
import { useParams } from "react-router-dom";

import { Detail } from "./Content";

export default function DividendDetail(props) {
  const params = useParams();
  return <Detail stockNo={params.stockNo} />;
}
