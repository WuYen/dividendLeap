import React from "react";
import { useParams } from "react-router-dom";

import Content, { usePageInfo } from "./Content";

export default function DividendDetail(props) {
  const params = useParams();
  const [pageInfo] = usePageInfo(params);
  return <Content {...pageInfo} />;
}
