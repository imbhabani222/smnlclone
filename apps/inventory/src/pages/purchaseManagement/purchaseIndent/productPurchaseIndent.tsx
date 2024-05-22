import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  getDocTypes,
  updateRecord,
  createRecord,
  getProductById,
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import Message from '../../../../../../libs/common/ui/Message/message';
/* @ts-ignore  */
import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { useSearchParams } from 'react-router-dom';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
type Props = { doc_id: any; url?: string; switchToNextTab?: any };
const Create = (props: Props) => {
  const { switchToNextTab = () => {}, doc_id } = props;
  const [searchParams] = useSearchParams();
  const mainId = searchParams.get('id') || '';
  const [formData, setformData] = useState([]);
  const [columns, setcolumns] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [selectedId, setSelectedId] = useState<any>({});
  const [formValue, setformValue] = useState<any>([]);
  const [subid, setsubid] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (mainId) {
      getFields('Inventory Indent Entries', 'htssuite').then((items) => {
        const formDatas = items.map((item: any) => {
          if (item.name === 'part') {
            return {
              ...item,
              datatype: 'TableSelect',
              columns: [
                {
                  title: 'Part',
                  dataIndex: 'part',
                  key: 'part',
                },
                {
                  title: 'Part Name',
                  dataIndex: 'part_name',
                  key: 'part_name',
                },
              ],
            };
          }

          return item;
        });

        setformData(formDatas);
      });

      getDocTypes('Inventory Indent Entries', false, 'htssuite').then(
        (items) => {
          // setcolumns(items)
          const newData:any = items.filter((item: any) => {
            const reqfields = [
              // 'part',
              'uom',
              'available_qty',
              'make',
              'reorder_level',
              'indent_qty',
              'rate',
              'pending_indent_qty',
              // 'action',
            ];

            if (reqfields.includes(item.dataIndex)) {
              return true;
            } else {
              return false;
            }
          });
        const addNewColumns = [
          {
            title: "Amount",
            dataIndex: 'amount',
            key: 'amount',
            render:(_:any, record:any) => Number(record?.rate) * Number(record?.indent_qty)
          },{
            title: "Action",
            dataIndex: 'action',
            key: 'action',
          }
        ]
        const firstColumnsName = [
          {
            title: "Part",
            dataIndex: 'part',
            key: 'part',
            render:(_:any, record:any) => record?.part_name || record?.part?.part_name || record?.part
          }
        ]
      
          setcolumns([...firstColumnsName, ...newData, ...addNewColumns]);
        }
      );

      const data = { name: mainId };
      getRecordById(
        'inventory_purchase_indent',
        data,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items) => {
        console.log(items, 'itemmm');

        // setsubid(items?.[0]?.name || null);
        setformValue({
          ...formValue?.data,
          // data: items?.products,
          tabledata: items?.products,
        });
      });
    }
  }, [mainId]);

  // useEffect(()=>{

  //   if(formValue?.tabledata?.length > 0) {

  //     console.log(formValue?.tabledata, '***')
  //   }

  // },[formValue?.tabledata])

  const handleFinish = (values: any) => {
    let newData = [...values];
    if (selectedProduct) {
      newData = values?.map((product: any) => ({
        ...product,
        pending_indent_qty: undefined,
        product: undefined,
        part: product?.product?.id || product?.part?.part_id || product.part || product?.id 
      }));
    }
    const record = {
      name: mainId,
      data: {
        products: newData,
      },
    };
    updateRecord(
      'inventory_purchase_indent',
      record,
      'inventory_purchase_management',
      'htsinventory'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/view-purchase-indent-register');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  // @ts-ignore
  //   let formDataValuesAdded = formDataFamilyRemoved.push(...values);

  const formChangeHandler = (val: any, fieldName: any) => {
    // const data = {name : val}
    if (fieldName === 'part') {
      if (val) {
        getProductById(
          'inventory_purchase_indent',
          val,
          'inventory_purchase_management',
          'htsinventory'
        ).then((items) => {
          // reorder_level
          setSelectedProduct(items);
          setSelectedId(items);

          setformValue({
            ...formValue,
            data: {
              ...items,
              rate: items?.mrp_price || Number(items?.rate)?.toFixed(2),
              part: items?.product?.name,
              // part : items?.name
            },
          });
        });
      } else {
        if (formValue?.data && formValue?.tableData) {
          setSelectedProduct({});
          setSelectedId({});
          setformValue((prev: any) => ({
            ...prev,
            data: {
              uom: '',
              make: '',
              reorder_level: '',
              rate: '',
              available_qty: '',
              pending_indent_qty: '',
              product: {
                id: '',
                name: '',
              },
            },
            tabledata: [{ ...prev.data }, ...prev.tabledata],
          }));
        } else {
          setSelectedProduct({});
          setSelectedId({});
          setformValue((prev: any) => ({
            ...prev,
            data: {
              uom: '',
              make: '',
              reorder_level: '',
              rate: '',
              available_qty: '',
              pending_indent_qty: '',
              product: {
                id: '',
                name: '',
              },
            },
            tabledata: [],
          }));
        }
      }
    } else {
      setformValue({
        ...formValue,
      });
      // }
    }
  };

  const formTableEditRow = (items: any) => {
    const tData = formValue?.tabledata?.filter(
      (e: any) => e?.part !== items?.part
    );
    setSelectedId(items);
    if (!formValue?.data?.part) {
      setformValue({
        ...formValue,
        data: { ...items, rate: items?.mrp_price || items?.rate },
        tabledata: tData,
      });
    }
  };

  const handleSet = (e: any, data: any, value: any) => {
    // e.igst = value?.igst;
    // e.cgst = value?.cgst;
    // e.sgst = value?.sgst;
    // console.log(e, data, value);

    setformValue({
      ...formValue,
      data: {},
      tabledata: [{ ...e, total: Number(e?.indent_qty) * Number(e?.rate), product: value?.product }, ...data],
    });
  };

  const handleFormCancel = () => {
    
    // const forms = formValue;
    // if (forms?.data?.part === selectedId?.part) {
    //   setformValue({
    //     ...forms,
    //     data: null,
    //     tabledata: [{ ...forms.data }, ...forms.tabledata],
    //   });
    // }
  };
  const onGettableSummaryData = (datas:any) => {
  
      
    if(datas?.length > 0){
      
      const summaryDatas = [
        {
          data: "",
          index: 0
        },
        {
          data: "",
          index: 1
        },
        {
          data: "Total",
          index: 2
        },
        {
          data: "",
          index: 3
        },
        {
          data: Number(datas?.reduce((acc:any, val:any) => acc + Number(val?.indent_qty ||0) ,0)),
          index: 4
        },
        {
          data: "",
          index: 5
        },
        {
          data: '',
          index: 6
        },
        {
          data: '',
          index: 7
        },
        {
          data: '',
          index: 8
        },
        {
          data: datas.reduce((acc: any, item: any) => {
            const subtotal = parseFloat(item.indent_qty) * parseFloat(item.rate);
            return acc + subtotal;
          }, 0).toFixed(2),
          index: 9
        }
        
      ]
      return summaryDatas;

    }
    return []
  }
  return (
    <div>
      {/* @ts-ignore  */}
      <FormTable
        formValue={formValue?.data}
        formData={formData}
        columns={columns}
        module="inventory_purchase_management"
        doctype="Inventory Invoice Entries"
        doc_id={mainId}
        handleFinish={handleFinish}
        tableData={formValue?.tabledata}
        appname="htsinventory"
        submitButtonLabel="Submit"
        onchangehandler={formChangeHandler}
        formTableEditRow={formTableEditRow}
        isSetNew={true}
        handleSet={handleSet}
        handleFormCancel={handleFormCancel}
        hideSelectData={formValue?.tabledata}
        tableSummary ={
          onGettableSummaryData(formValue?.tabledata)
        }
        // cancelButtonLabel="Clear"
        // selectedProduct={selectedProduct}

        // productId={selectedId}
      />
    </div>
  );
};

export default Create;
