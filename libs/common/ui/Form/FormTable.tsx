import React, { useEffect, useState } from 'react';
import SmnlTable from '../Table/SmnlTable';

type Props = { fieldData?: any };

const FormTable = (props: Props) => {
  const { fieldData } = props;
  const [columns, setcolumns] = useState<any>([]);

  useEffect(() => {
    const newData: any = fieldData.column?.filter((item: any) => {
      const reqfields = [
        'prn_no',
        'part',
        'uom',
        'indent_qty',
        'order_qty',
        'rate',
        'amount',
        'discount',
        'tax',
        'net',
        'pending_indent_qty',
        'required_qty',
        'issued_qty',
        'return_qty',
      ];
      if (reqfields.includes(item.dataIndex)) {
        return true;
      } else {
        return false;
      }
    });
    setcolumns(newData);
  }, [fieldData?.column]);

  return (
    <div>
      <SmnlTable
        // @ts-ignore
        dataSource={props?.formValue?.product||props?.formValue?.products}
        column={columns}
        height={100}
        tableSummary={fieldData?.summary || []}
      />
    </div>
  );
};

export default FormTable;
