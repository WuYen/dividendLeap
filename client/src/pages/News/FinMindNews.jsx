import React, { useState, useRef, useEffect } from "react";
import { api } from "../../utils";

/*
<FinMindNews stockNo={stockNo} loading={<DataList.Loading />}>
  {(data) => {
    return <DataList.List list={data} keyWord="個股新聞"></DataList.List>;
  }}
</FinMindNews>;
*/
export default function FinMindNews(props) {
  const { stockNo, loading } = props;
  const [list, setList] = useState([]);
  const isLoaded = useRef(false);

  useEffect(() => {
    api
      .get(`/news/stock/${stockNo}`)
      .then((data) => {
        console.log("fetchData result", data);
        return data;
      })
      .then(({ success, data }) => {
        isLoaded.current = true;
        success && setList(data);
      });
  }, [stockNo]);

  return isLoaded.current ? props.children(list) : loading;
}

/*
<FinMindNews2
  fetchData={{ useFetch: useFinMindData, params: stockNo }}
  loading={DataList.Loading}
  list={DataList.List}
/>;
*/
export function FinMindNews2({ fetchData: { useFetch, params }, ...props }) {
  const [data, isLoaded] = useFetch(params);
  const { loading: LoadingComponent, list: ListComponent } = props;

  return isLoaded ? <ListComponent list={data} /> : <LoadingComponent />;
}

export function useFinMindData(stockNo) {
  const [page, setPage] = useState({ list: [], isLoaded: false });

  useEffect(() => {
    api
      .get(`/news/stock/${stockNo}`)
      .then((data) => {
        console.log("fetchData result", data);
        return data;
      })
      .then(({ success, data }) => {
        success && setPage({ list: data, isLoaded: true });
      });
  }, [stockNo]);

  return [page.list, page.isLoaded];
}
