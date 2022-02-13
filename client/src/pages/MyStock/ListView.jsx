import React, { useState } from "react";
import { Box, Flex, Spacer, Link } from "@chakra-ui/layout";
import MyStockButton from "./../../components/MyStockButton";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
{
  /* <Link
as={RouterLink}
_focus={{ outline: "none" }}
to={{
  pathname: `/detail/${meta.no}/${meta.nm}`,
}}
></Link> */
}
export default function ListView(props) {
  const history = useHistory();
  const { data } = props;
  const { meta, dividend, info } = data;
  return (
    <Box>
      <Box
        m="2"
        display="inline-block"
        boxShadow="0px 6px 10px rgba(0, 0, 0, 0.20)"
        p="4"
        rounded="xl"
        minW={"700px"}
        _hover={{ boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.40)" }}
        cursor="pointer"
        onClick={(e) => {
          var url = `/detail/${meta.no}/${meta.nm}`;
          e.ctrlKey ? window.open(url) : history.push(url);
        }}
      >
        <Flex alignItems="center">
          <Flex fontSize="20px" fontWeight="600" alignItems="center" w="220px">
            <Box mr="2" color="teal.600">
              {meta.nm}
            </Box>
            <Box mr="4" color="teal.500" fontWeight="500">
              {meta.no}
            </Box>
            <Box fontSize="sm" color="teal.400" backgroundColor="teal.50" px="2" rounded={"full"} maxW="80px">
              {meta.industry}
            </Box>
          </Flex>
          <Box fontSize="sm" fontWeight="350" mr="4">
            除息日: {dividend.date}
          </Box>
          <Box fontSize="sm" fontWeight="350" mr="4">
            現金股利: {dividend.cash}
          </Box>
          <Box fontSize="sm" fontWeight="350" mr="4">
            殖利率: {dividend.rate}%
          </Box>
          <Spacer />
          <MyStockButton withText={true} stockNo={meta.no} />
        </Flex>
        <Flex alignItems="flex-end">
          <Box w="220px">
            <Box mb="4px" display="block" fontWeight="700" fontSize="20px">
              {meta.price}
            </Box>
            <Box display="block" color="#6e7780" fontSize="12px">
              {meta.priceDt} 更新
            </Box>
          </Box>
          {info.map((item, index) => {
            return (
              <Box
                key={index}
                alignItems="center"
                borderRight="1px solid #e0e4e9"
                mr="2"
                pr="2"
                _last={{ borderRight: "none", mr: "0", pr: "0" }}
              >
                <Box textAlign="center" mb="4px" display="block" fontWeight="700" fontSize="16px">
                  {item.value ? item.value + "%" : "--"}
                </Box>
                <Box textAlign="center" display="block" color="#6e7780" fontSize="12px">
                  {item.text}
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}

// function ListView(props) {
//   const { data } = props;

//   return (
//     <Grid m="2" templateColumns="220px 1fr" templateRows="repeat(2, 1fr)">
//       <GridItem>
//         <Flex fontSize="20px" fontWeight="600" alignItems="center" w="220px">
//           <Box mr="2" color="teal.600">
//             創見
//           </Box>
//           <Box mr="4" color="teal.500" fontWeight="500">
//             2451
//           </Box>
//           <Box fontSize="sm" color="teal.400" backgroundColor="teal.50" px="2" mr="4" rounded={"full"}>
//             半導體
//           </Box>
//         </Flex>
//       </GridItem>
//       <GridItem>
//         <Flex>
//           <Box fontSize="sm" fontWeight="300" mr="4">
//             除息日: 2022-02-14
//           </Box>
//           <Box fontSize="sm" fontWeight="300" mr="4">
//             現金股利: 4
//           </Box>
//           <Box fontSize="sm" fontWeight="300" mr="4">
//             殖利率: 4%
//           </Box>

//           <MyStockButton withText={true} stockNo={"2451"} />
//         </Flex>
//       </GridItem>
//       <GridItem>
//         <Box mb="4px" display="block" fontWeight="700" fontSize="20px">
//           71.7
//         </Box>
//         <Box display="block" color="#6e7780" fontSize="12px">
//           2022/02/11 14:30 更新
//         </Box>
//       </GridItem>
//       <GridItem>
//         <Flex alignItems="flex-end">
//           {[
//             { value: "276.74%", text: "去年同期EPS" },
//             { value: "170.61%", text: "去年全年EPS" },
//             { value: "125.06%", text: "去年全年獲利" },
//             { value: "6.07%", text: "5年平均殖利率" },
//             { value: "6.33%", text: "10年平均殖利率" },
//           ].map((item, index) => {
//             return (
//               <Box
//                 key={index}
//                 alignItems="center"
//                 borderRight="1px solid #e0e4e9"
//                 mr="2"
//                 pr="2"
//                 _last={{ borderRight: "none", mr: "0", pr: "0" }}
//               >
//                 <Box textAlign="center" mb="4px" display="block" fontWeight="700" fontSize="16px">
//                   {item.value}
//                 </Box>
//                 <Box textAlign="center" display="block" color="#6e7780" fontSize="12px">
//                   {item.text}
//                 </Box>
//               </Box>
//             );
//           })}
//         </Flex>
//       </GridItem>
//     </Grid>
//   );
// }

// function ListView1(props) {
//   const { data } = props;

//   return (
//     <Box m="2">
//       <Flex>
//         <Box mr={"auto !important"}>
//           <Flex fontSize="20px" fontWeight="600" alignItems="center">
//             <Box mr="2" color="teal.600">
//               創見
//             </Box>
//             <Box mr="4" color="teal.500" fontWeight="500">
//               2451
//             </Box>
//             <Box fontSize="sm" color="teal.400" backgroundColor="teal.50" px="2" mr="4" rounded={"full"}>
//               半導體
//             </Box>
//             <Box fontSize="sm" fontWeight="300" mr="4">
//               除息日: 2022-02-14
//             </Box>
//             <Box fontSize="sm" fontWeight="300" mr="4">
//               現金股利: 4
//             </Box>
//             <Box fontSize="sm" fontWeight="300" mr="4">
//               殖利率: 4%
//             </Box>
//           </Flex>
//         </Box>
//         <Box ml={"auto !important"} textAlign={"right"}>
//           <MyStockButton stockNo={"2451"} />
//         </Box>
//       </Flex>
//       <Flex alignItems="flex-end">
//         <Box mr={"auto !important"}>
//           <Box display="flex">
//             <Box alignItems="center" borderRight="1px solid #e0e4e9" _last={{ borderRight: "none" }}>
//               <Box mb="4px" display="block" fontWeight="700" fontSize="20px">
//                 71.7
//               </Box>
//               <Box display="block" color="#6e7780" fontSize="12px">
//                 2022/02/11 14:30 更新
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//         <Box ml={"auto !important"} textAlign={"right"}>
//           <Box
//             display="import { Grid } from '@chakra-ui/react';
// flex"
//           >
//             {[
//               { value: "276.74%", text: "去年同期EPS" },
//               { value: "170.61%", text: "去年全年EPS" },
//               { value: "125.06%", text: "去年全年獲利" },
//               { value: "6.07%", text: "5年平均殖利率" },
//               { value: "6.33%", text: "10年平均殖利率" },
//             ].map((item, index) => {
//               return (
//                 <Box
//                   key={index}
//                   alignItems="center"
//                   borderRight="1px solid #e0e4e9"
//                   mr="2"
//                   pr="2"
//                   _last={{ borderRight: "none", mr: "0", pr: "0" }}
//                 >
//                   <Box textAlign="center" mb="4px" display="block" fontWeight="700" fontSize="16px">
//                     {item.value}
//                   </Box>
//                   <Box textAlign="center" display="block" color="#6e7780" fontSize="12px">
//                     {item.text}
//                   </Box>
//                 </Box>
//               );
//             })}
//           </Box>
//         </Box>
//       </Flex>
//     </Box>
//   );
// }
