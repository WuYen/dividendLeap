import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import DataList from "../../pages/News/DataList";

export default function MyStockTabView(props) {
  const { stockNo } = props;
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>新聞</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <DataList.Container keyWord={stockNo} search={true} loading={0} list={1}>
              <DataList.Loading />
              <DataList.List />
            </DataList.Container>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function StockFrame(props) {
  const { stockNo } = props;

  return (
    <iframe
      src={`/detail/${stockNo}`}
      width="100%"
      style={{
        height: "100vh",
      }}
    ></iframe>
  );
}
