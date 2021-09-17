import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import Loading from "../../components/Loading";
import DataRow from "./DataRow";

function List(props) {
  const { schedule, editItem, service } = props;

  useEffect(() => {
    service.onFetchList();
  }, []);

  if (!schedule) {
    return <Loading h="100%" />;
  }

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={"md"}>股票</Th>
            <Th fontSize={"md"}>除息日</Th>
            <Th fontSize={"md"} isNumeric>
              現金股利
            </Th>
            <Th fontSize={"md"}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {schedule.length === 0 ? (
            <Tr>
              <Td colSpan="4" textAlign="center" color="gray.400">
                目前沒有資料
              </Td>
            </Tr>
          ) : (
            schedule.map((item, index) => {
              const isEditing = item._id === editItem?._id;
              return <DataRow {...item} key={`${item.stockNo}${index}`} isEditing={isEditing} service={service} />;
            })
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
export default List;
