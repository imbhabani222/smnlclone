import React, { useState, useEffect } from 'react';

import {
  getDocTypes,
  getRecordById,
  updateRecord,
  getProducts,
  getProductsByList,
  getTableData
} from '../../../../../../libs/common/api/doctype';
import { Row, Col  } from 'antd'
import FormTable from '../../../../../../libs/common/ui/Form_Table/FormTable';
import { getFields } from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams, useNavigate } from 'react-router-dom';



const AddProduct = (props: any) => {
  const [formData, setformData] = useState<any>([]);
  const [formValue, setformValue] = useState<any>([]);
  const [selectedId, setSelectedId] = useState<any>({});
  const [columns, setcolumns] = useState<any>([]);
  const [Errors, setErrors] = useState<any>({
    isError: false,
    errors: {},
  });
  const [proList, setproList] = useState<any>([]);
  const [companyDetails, setCompanyDetails] = useState <any>({})
  const [IsSameSate, setIsSameSate] = useState<boolean>(false);
  // const [productId, setProductId] = useState<any>([])
  const [searchParams] = useSearchParams();
  const mainId = searchParams.get('id') || '';
  const navigate = useNavigate();

  useEffect(() => {
    if (mainId) {
      let formItems: any = [];
      getTableData('inventory_company_details', 'inventory_general_setup', 'htsinventory').then((items:any) => {
        setCompanyDetails(items?.[0])
      })
      getFields('Inventory Order Entries', 'htssuite').then((_items) => {
        const datas = _items;

        datas.forEach((record: any) => {
          if (record.name === 'order_qty') {
            record.description = {
              type: 'compare_two_values',
              depends: 'indent_qty',
              label: 'Indent Qty'
            };
          }
          if(record.name === 'part') {
            record.datatype = 'TableSelect'
            record.description = {
              // ...record?.description,
              linkfield: 'part_name',
              colSpan: '2',
              // appname:'htsinventory',
              // search: 'inventory_product_configuration.doctype.inventory_product_master.api.search_product?search='
            }

            record.columns =  [
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
            ]
            record.searchIndexes = ['part', 'part_name']
          }
    
        });
        setformData(datas);
        formItems = _items;

        getDocTypes('Inventory Order Entries', false, 'htssuite').then(
          (items) => {
            const newData: any = items.filter((item: any) => {
              const reqfields = [
                'part',
                'indent_qty',
                'order_qty',
                'rate',
                'amount',
                'dicount',
                'tax',
                'net',
                'action',
              ];
              if (reqfields.includes(item.dataIndex)) {
                return item;
              } else {
                return false;
              }
            });
           
            setcolumns(newData);
          }
        );
        const data = { name: mainId };

        getRecordById(
          'inventory_purchase_order',
          data,
          'inventory_purchase_management',
          'htsinventory'
        ).then((items) => {
          const { indent_no = null } = items;

          setformValue({
            ...formValue,
            products: items?.products?.map((item: any) => ({
              ...item,
              products: item?.part?.id,
              uom: item?.uom?.id,
            })),
            tabledata: items?.products.map((item: any) => ({
              ...item,
            })),
          });          
          const data = { name: mainId };

          getProductsByList(
            'inventory_purchase_order',
            data,
            'inventory_purchase_management',
            'htsinventory'
          ).then((prods: any) => {
            if (prods && prods?.length > 0) {
              setproList(prods);
              const locationsOptions = prods.map((item: any) => ({
                name: item?.id,
                part_name: item.name,
                part: item.part
              }));



              const locationFieldIndex: any = formItems.findIndex(
                (item: any) => item.name === 'part'
              );
              const locationField: any = formItems.find(
                (item: any) => item.name === 'part'
              );

              const newLocationData = {
                ...locationField,
                datatype: 'TableSelect',
                options: locationsOptions,
              };
              const updatedFormData: any = [...formItems];
              updatedFormData[locationFieldIndex] = newLocationData;
              setformData(updatedFormData);

              //  console.log(formData, "formdata");
              //           setformData({

              //           });
            }
          });
        });
      });
    }
  }, [mainId]);

  const onchangeHandler = (val: any, fieldName: any) => {
    // alert(JSON.stringify(formValue));
    const data = { order_id: mainId, product_id: val };
    if (fieldName === 'part' && val) {
      getProducts(
        'inventory_purchase_order',
        data,
        'inventory_purchase_management',
        'htsinventory'
      ).then((items) => {
        let cols = formData?.map((item: any) => {
          if (item?.name === 'order_qty') {
            return {
              ...item,
              max: items?.indent_qty,
            };
          }
          return item;
        });
        setformData(cols);
        if(items.state === companyDetails?.state_name?.id){
          cols = cols?.filter((item:any)=> item.name !== 'igst')
          setformData(cols);
          setIsSameSate(true)
        }
        else{
          cols = cols?.filter((item:any)=> item.name !== 'cgst' &&  item.name !== 'sgst')
          setformData(cols);
          setIsSameSate(false)
        }
        setSelectedId(items?.part?.id);

        const amount: any = parseFloat(items?.indent_qty) * parseFloat(items?.rate);
        const gross = parseFloat(amount) - 0;
        const tax_value = (gross * items?.tax) / 100;
        const net = gross + tax_value;

        setformValue({
          ...formValue,
          data: {
            ...items,
            rate: Number(items?.rate).toFixed(2),
            tax_value: tax_value,
            igst: items.state === companyDetails?.state_name?.id ? 0 : items?.igst,
            sgst: items.state !== companyDetails?.state_name?.id ? 0 : items?.sgst,
            cgst: items.state !== companyDetails?.state_name?.id ? 0 : items?.cgst,
            net: net,
            discount: 0,
            discount_value: 0,
            order_qty: items?.indent_qty,
            part: items?.part?.name,
            uom: items?.uom,
            make: items?.make,
            amount: Number(amount).toFixed(2),
          },
        });

        

  
      });
    } else if (fieldName === 'order_qty') {
      if (val) {
        const amount: any = parseFloat(val) * parseFloat(formValue?.data?.rate);
        const discount_value: any =
          (parseFloat(amount) * parseFloat(formValue?.data?.discount || 0)) / 100;
        const gross = parseFloat(amount) - parseFloat(discount_value);
        const tax_value = (gross * formValue?.data?.tax) / 100;
        const net = gross + tax_value;

        setformValue({
          data: {
            ...formValue?.data,
            amount: Number(amount).toFixed(2),
            discount_value,
            net,
            order_qty: val,
            tax_value,
          },
        });
      }
    } else if (fieldName === 'discount') {
      // val = +formValue?.data?.discount === 0 ? +val : val;
      val = val || 0;
      const disc: any =
        (parseFloat(formValue?.data?.amount || 0) * parseFloat(val || 0)) / 100;
      const gross = parseFloat(formValue?.data?.amount || 0) - parseFloat(disc);
      const tex_value = (gross * +formValue?.data?.tax || 0) / 100;
      const net = gross + tex_value || 0;

      setformValue({
        data: {
          ...formValue?.data,
          discount_value: disc.toFixed(2) || 0,
          net: Number(net).toFixed(2),
          discount: val || '',
          tax_value: tex_value.toFixed(2) || 0,
        },
      });
    } else if (fieldName === 'rate') {
      const amount: any =
        parseFloat(formValue?.data?.order_qty) * parseFloat(val);
      const discount_value: any =
        (parseFloat(amount) * parseFloat(formValue?.data?.discount || 0)) / 100;
      const gross = parseFloat(amount) - parseFloat(discount_value);
      const tax_value = (gross * formValue?.data?.tax) / 100;
      const net = gross + tax_value;

      setformValue({
        data: {
          ...formValue?.data,
          rate: val,
          amount,
          tax_value: tax_value.toFixed(2),
          discount_value: discount_value.toFixed(2),
          net: Number(net).toFixed(2),
        },
      });
    } else if (fieldName === 'tax') {
      const amount: any = formValue?.data?.amount;
      const discount_value: any = formValue?.data?.discount_value;
      const gross = parseFloat(amount) - parseFloat(discount_value);
      const tax_value = (gross * +val) / 100;
      const net = gross + tax_value;

      setformValue({
        data: {
          ...formValue?.data,
          tax_value: tax_value.toFixed(2),
          net: Number(net).toFixed(2),
          tax: val,
          discount_value,
          sgst: IsSameSate ? val /2 : 0,
          cgst: IsSameSate ? val /2 : 0,
          igst: IsSameSate ? 0 : val,
        },
      });
    }
  };

  const handleFinish = (values: any) => {
    const record = {
      name: mainId,
      data: {
        products: values.map((item: any) => ({
          ...item,
          part: item?.product?.id ?? item?.part?.id,
          product: item?.part?.id,
          uom: item?.uom?.id,
          make: item?.make?.id || item?.make,
          // igst: IsSameSate ? 0 : item?.igst,
        })),
      },
    };
    console.log(record, "payload")
    updateRecord(
      'inventory_purchase_order',
      record,
      'inventory_purchase_management',
      'htsinventory'
    ).then((items: any) => {
      if (items?.status === 200) {
        isSuccess(items?.message, 'success');
        navigate('/view-purchase-order-register');
      } else {
        isSuccess(items?.message, 'error');
      }
    });
  };

  const formTableEditRow = (items: any) => {
    const tData = formValue?.tabledata?.filter(
      (e: any) => e?.part !== items?.part
    );

    setSelectedId(items?.product?.id);
    setformValue({
      ...formValue,
      data: {
        ...items,
        part: items?.part,
        uom: items?.uom,
      },
      tabledata: tData,
    });
  };

  const handleSet = (e: any, data: any, value: any) => {
    e.igst = value?.igst;
    e.cgst = value?.cgst;
    e.sgst = value?.sgst;
    console.log(e, "e", "***")
    setformValue({
      ...formValue,
      data: {},
      tabledata: [{ ...e, product: { id: selectedId } }, ...data],
    });
  };

  const handleFormCancel = () => {
    const forms = formValue;

    // if (forms?.data?.product?.id === selectedId) {
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
          data: "Total",
          index: 1
        },
        {
          data: "",
          index: 3
        },
        {
          data: datas?.reduce((acc:any, val:any) => acc + Number(val?.order_qty ||0) ,0),
          index: 4
        },
        {
          data: "",
          index: 5
        },
        {
          data: "",
          index: 6
        },
        {
          data: Number(datas?.reduce((acc:any, val:any) => acc + Number(val?.amount ||0) ,0)).toFixed(2),
          index: 7
        },
        {
          data: Number(datas?.reduce((acc:any, val:any) => acc + Number(val?.net ||0) ,0)).toFixed(2),
          index: 8
        }
      ]
      return summaryDatas;

    }
    return []
  }

  return (
    <FormTable
      formValue={formValue?.data}
      formData={formData}
      columns={columns}
      module="inventory_purchase_management"
      doctype="Inventory Invoice Entries"
      doc_id={mainId}
      handleFinish={handleFinish}
      appname="htsinventory"
      submitButtonLabel="Submit"
      onchangehandler={onchangeHandler}
      tableData={formValue?.tabledata}
      formTableEditRow={formTableEditRow}
      // isTax={true}
      isError={Errors}
      hideSelectData={formValue?.tabledata}
      productId={selectedId}
      isSetNew={true}
      handleSet={handleSet}
      // cancelButtonLabel="Cancel"
      handleFormCancel={handleFormCancel}
      tableSummary ={
        onGettableSummaryData(formValue?.tabledata)
      }
    />
  );
};

export default AddProduct;
