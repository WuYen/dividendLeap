import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { formatHelper } from '../../utilities';

export default function EpsTable(props) {
  const { data, dividend } = props;
  return (
    <Table variant='simple' size={'sm'}>
      <Thead>
        <TableHeaderTemplate isHistory={false} />
      </Thead>
      <Tbody>
        <TableRowTemplate data={[data[0]]} isHistory={false} dividend={dividend} />
        {/* {dividend && <TableRowTemplate2 dividend={dividend} />} */}
      </Tbody>
      <Thead>
        <TableHeaderTemplate isHistory={true} />
      </Thead>
      <Tbody>
        <TableRowTemplate data={data.slice(1)} isHistory={true} />
      </Tbody>
    </Table>
  );
}

function HistoryPrice(props) {
  const { data = [] } = props;

  return data.map((item, index) => {
    const { month, day } = formatHelper.getDateFragment(item.date);
    return item ? (
      <div key={item.date} style={{ width: '100%' }}>{`${item.price} (${month}-${day})`}</div>
    ) : (
      <div key={index}>--</div>
    );
  });
}

function TableHeaderTemplate(props) {
  const { isHistory } = props;
  return (
    <Tr>
      <Th>發放年度</Th>
      <Th isNumeric>Q1</Th>
      <Th isNumeric>Q2</Th>
      <Th isNumeric>Q3</Th>
      <Th isNumeric>Q4</Th>
      <Th isNumeric>EPS</Th>
      <Th isNumeric>{isHistory ? '現金股利' : '股利'}</Th>
      <Th>分配率</Th>
      <Th>除息日</Th>
      <Th isNumeric>{isHistory ? '除息股價' : ''}</Th>
      <Th isNumeric>{isHistory ? '殖利率' : ''}</Th>
      <Th isNumeric>{isHistory ? '年均價' : ''}</Th>
      <Th isNumeric>{isHistory ? '年低點' : ''}</Th>
      <Th isNumeric>{isHistory ? '年高點' : ''}</Th>
    </Tr>
  );
}
function TableRowTemplate(props) {
  const { data, isHistory, dividend } = props;
  return data.map((d) => {
    let dt = dividend ? dividend.date : d.dDate;
    const { month, day } = formatHelper.getDateFragment(dt);
    let rate = dividend ? (dividend.cashDividen / d.totalEps).toFixed(3) : '--';
    return (
      <Tr key={d.year}>
        <Td>{d.year}</Td>
        <Td isNumeric>{d.q[0]?.eps || '--'}</Td>
        <Td isNumeric>{d.q[1]?.eps || '--'}</Td>
        <Td isNumeric>{d.q[2]?.eps || '--'}</Td>
        <Td isNumeric>{d.q[3]?.eps || '--'}</Td>
        <Td isNumeric>{d.totalEps}</Td>
        <Td isNumeric>
          {isHistory ? (
            d.cashDividend
          ) : (
            <>
              <div>{dividend?.cashDividen || '--'}</div>
              <div>{'(預估)' + d.estimateDividend}</div>
            </>
          )}
        </Td>
        <Td>
          {isHistory ? (
            d.rate
          ) : (
            <>
              <div>{rate}</div>
              <div>{d.rate}</div>
            </>
          )}
        </Td>
        <Td>{`${month}-${day}`}</Td>
        <Td isNumeric>{d.dPrice}</Td>
        <Td isNumeric>{d.yieldRate}</Td>
        <Td isNumeric>{d.yearAvg}</Td>
        <Td isNumeric>
          <HistoryPrice data={d.lowLY} />
        </Td>
        <Td isNumeric>
          <HistoryPrice data={d.HighLY} />
        </Td>
      </Tr>
    );
  });
}
