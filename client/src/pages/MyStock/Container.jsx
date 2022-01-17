import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, VStack, StackDivider } from "@chakra-ui/react";
import { connect } from "react-redux";
import useRouter from "../../hooks/useRouter";
import Content, { Container as ContentWrapper } from "./Content";
import LeftPanel from "./LeftPanel";
import { useMyStocks } from "../../hooks/useMyStock";
import { ForecastAPI, ScheduleAPI } from "../../utils/api";

function Container(props) {
  const { myType } = props;
  const [{ stockNo: selectedStockNo }, history] = useRouter();
  const [myStock, handleAdd, handleRemove] = useMyStocks();
  const [kdList, setKDList] = useState([]);
  const [typeList, setTypeList] = useState([]);

  useEffect(() => {
    !selectedStockNo && myStock.length && history.push(`/my/stock/${myStock[0].stockNo}`);
    ForecastAPI.getListKD().then((response) => {
      console.log("fetch kd list result", response);
      const { data, success } = response;
      success && setKDList(data);
    });
    ScheduleAPI.getMenu().then((response) => {
      console.log("fetch schedule menu", response);
      const { data, success } = response;
      success && setTypeList(data);
    });
  }, []);

  const handleSelect = useCallback((stockNo) => {
    history.push(`/my/stock/${stockNo}`);
  }, []);

  return (
    <Box p="4" width="100%">
      <Grid templateColumns="200px 4fr" gap={4}>
        <Box>
          <LeftPanel
            // onAdd={handleAdd}
            onRemove={handleRemove}
            onSelect={handleSelect}
            myStock={myStock}
            selectedStockNo={selectedStockNo}
            kdList={kdList}
            typeList={typeList}
            myType={myType}
          />
        </Box>
        <Box>
          {selectedStockNo && (
            <ContentWrapper stockNo={selectedStockNo}>
              <Content />
            </ContentWrapper>
          )}
        </Box>
      </Grid>
    </Box>
  );
}

const mapStateToProps = ({ member }) => ({ myType: member.myType });
const mapActionToProps = {};
export default connect(mapStateToProps, mapActionToProps)(Container);
