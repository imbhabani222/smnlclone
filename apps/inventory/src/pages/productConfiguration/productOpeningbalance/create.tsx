import React, { useEffect, useState } from 'react';
import {
  getTableData
} from '../../../../../../libs/common/api/doctype';
import SmnlFormDynamicLayout from '../../../../../../libs/common/ui/Form/SmnlFormDynaminLayout';
import SmnlTable from '../../../../../../libs/common/ui/Table/SmnlTable';
type Props= {};

const Create = (props: Props) => {
  const [ columnData, setColumnData] = useState<any>([]);
  const [ filter, setFilter] = useState<any>({})
  const filterData: any = [
    {
      label:'Finanical Year',
      name: 'Finanical',
      datatype:'Date',
      picker:'year',


    },
    {
      label:'Godown Name',
      name:'godown_name',
      options:'Inventory Godown',
      datatype:'Link',
      description: JSON.stringify({
        linkfield: 'godown_name',
        modulename: 'inventory_general_setup',
      })
    },
    {
      label:'Part Name',
      name:'part_name',
      options:'Inventory Product Master',
      datatype:'Link',
      description: JSON.stringify({
        linkfield: 'part_name',
        modulename: 'inventory_product_configuration',

      })
      
    },
  ]

  const column = [
    {
      title:'godown',
      dataIndex: 'godown',
      key: 'godown',
    },
    {
      title:'product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'rate',
      dataIndex: 'rate',
      key:'rate',
    }
  ]
  const handleChange=(val:any,name:any)=>{
    setFilter((pre:any)=>{
      return {...pre,[name]:val}
    })
  }
  useEffect(() => {
    getTableData('travel_request', 'travel_requisition', 'htssuite',filter).then(
      (items) => {
        {
          const newItem = items.map((item: any) => {

            return {
              ...item,
             
            };
          });
          setColumnData(newItem);
        }
      }
    );
  }, [filter]);

  return (
    <div>
        <SmnlFormDynamicLayout
          sectionData={filterData}
          onChange={handleChange}
          appname={'htsinventory'}
          
        />
        <SmnlTable column={column} dataSource={columnData}/>
    </div>
  )
}

export default Create;