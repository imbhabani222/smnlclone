import React, { useState, useEffect, useCallback } from 'react';
import { getFields,getDocTypes, updateRecord,getProductById,  getTableData } from '../../../../../../libs/common/api/doctype';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';


type Props = {
    doc_id: any;
    url?: string;
    switchToNextTab?: any;
    dataOfForm?: any;
  };

const Create = (props: Props) => {
  const { switchToNextTab = () => {}, doc_id } = props;
  const navigate = useNavigate();


  const [searchParams] = useSearchParams();
  const mainId = searchParams.get('id') || '';
  const [formData, setformData] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [formValue, setformValue] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
   getFields('Reconciliation Products', 'htssuite').then((items:any)=>{
    const formDatas = items.map((item: any) => {
        if (item.name === 'part') {
          return {
            ...item,
            datatype: 'TableSelect',
            description: {
                ...item.description,
                colSpan: '2',
                appname:'htsinventory',
                search: 'inventory_product_configuration.doctype.inventory_product_master.api.search_product?search='
            },
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
      })
      setformData(formDatas)

   })
   getDocTypes('Reconciliation Products', false, 'htssuite').then(
    (items) => {
      const nData = [
        {
          title: 'Product',
          key: 'Product',
          dataIndex: 'Product',
        },
      ];
      const newData: any = items.filter((item: any) => {
        const reqfields = [
          'uom',
          'available_qty',
          'required_qty',
          'price',
          'gst',
          'net_amount',
          'action',
        ];
        if (reqfields.includes(item.dataIndex)) {
          return true;
        } else {
          return false;
        }
      });
      const ndata: any = [...nData, ...newData];
      setcolumns(ndata);
    }
  );
  },[mainId])



  const formChangeHandler = (val:any, key:any) => {
    console.log(val, 'key')
    if(key === 'part'){
      setLoading(true);
      getProductById(
        'inventory_reconciliation',
        val,
        'inventory_management',
        'htsinventory'
      ).then((items: any) => {
        const gst =
          Number(items?.c_gst) + Number(items?.s_gst) || Number(items?.i_gst);
        setformValue({
          ...formValue,
          data: {
            ...items,
            gst: gst,
            required_qty: undefined,
            net_amount: 0,
            part: val,
            price: parseFloat(items.price).toFixed(2),
          },
        });
        setLoading(false);
      });
    }
    if(key === 'required_qty') {
        const prevformData = formValue?.data?.[0]
        ? formValue?.data?.[0]
        : formValue?.data;
        let amt: any = parseFloat(val) * parseFloat(prevformData?.price);
        amt = amt || 0;
        // const discountvalue =
        //   parseFloat(prevformData?.discount) > 0
        //     ? (parseFloat(amt) * parseFloat(prevformData?.discount)) / 100
        //     : 0;
        // const net: any = amt - discountvalue;
        const taxvalue: any =
          parseFloat(prevformData?.gst) > 0
            ? (parseFloat(amt) * parseFloat(prevformData?.gst)) / 100
            : 0;
        const netValue = taxvalue > 0 ? taxvalue + amt : amt;
  
        setformValue({
          data: {
            ...prevformData,
            net_amount: netValue.toFixed(2),
            required_qty: +val,
            
          },
        }); 
    }
  }

  const handleFormCancel = () => {
    const forms = formValue;

    if (forms?.data?.product?.id === "selectedId") {
      setformValue({
        ...forms,
        data: null,
        tabledata: [{ ...forms.data }, ...forms.tabledata],
      });
    }
  };

  const handleSet = (e: any, data: any, value: any) => {
   setformValue({
     ...value,
     tabledata: [
       {
         part: value?.product?.id || value?.product || value?.part,
         Product: value?.product?.name || value?.product,
         uom: value?.uom,
         available_qty: value?.available_qty,
         required_qty: value?.required_qty,
         price: value?.price,
         net_amount: value?.net_amount,
         gst: value?.gst
       },
       ...data
     ],
   });
  }
  const formTableEditRow = (items: any) => {
    setformValue({ ...formValue, data: { ...items } });
  };

  const handleFinish = (values:any) => {
    setLoading(true)
    const payload = {
      name: mainId,
      data: {
        products: values?.map((item: any) => ({
          part: item?.part,
          uom: item?.uom?.id,
          available_qty: String(item?.available_qty),
          required_qty: String(item?.required_qty),
          price: item?.price,
          net_amount: item?.net_amount,
          gst: String(item?.gst)
        })),
      },
    };
    updateRecord('inventory_reconciliation', payload, 'inventory_management', 'htsinventory').then((items:any)=>{
        if(items?.status === 200) {
            isSuccess(items?.message, 'success')
            navigate('/view-reconciliation')
            setLoading(false)
        }
        else{
            isSuccess(items?.message, 'error')
            setLoading(false)
        }
    })
  }
    return (
      <React.Fragment>
       <Spin loading = {loading} />
        <FormTable
         formValue={formValue?.data}
        formData={formData}
        tableData={formValue.tabledata}
        columns={columns}
        module="inventory_management"
        // doctype="Inventory Invoice Entries"
        doc_id={mainId}
        handleFinish={handleFinish}
        appname="htsinventory"
        submitButtonLabel="Submit"
        onchangehandler={formChangeHandler}
        formTableEditRow={formTableEditRow}
        isSetNew={true}
        handleSet={handleSet}
        hideSelectData={formValue?.tabledata}
        cancelButtonLabel="Cancel"
        handleFormCancel={handleFormCancel}
      />
              </React.Fragment>

    )
}

export default Create;