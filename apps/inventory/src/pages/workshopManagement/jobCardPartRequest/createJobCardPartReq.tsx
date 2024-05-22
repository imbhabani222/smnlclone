import React, { useEffect, useState } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getProducts,
} from '../../../../../../libs/common/api/doctype';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import {
  datetoFrom,
  dateFormat,
} from '../../../../../../libs/common/utils/common';
import moment from 'moment';
type Props = {};

const Create = (props: any) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({});
  const [msg, setmsg] = useState({
    desc: '',
    isError: false,
    isSuccess: false,
    isWarning: false,
  });
  const [searchParams, _] = useSearchParams();

  const term = searchParams.get('id');

  useEffect(() => {
    getFields('Inventory Job Card Part Request', 'htssuite').then((items) => {
      const newitems = items?.map((e: any) => {
        if (e?.name === 'job_card') {
          return {
            ...e,
            datatype: 'TableSelect',
            options: 'Inventory Job Card Creation',
            colSpan: 2,
            description: {
              ...e.description,
              // "search": 'inventory_product_configuration.doctype.inventory_product_master.api.search_product?search=',
              linkfield: 'name',
              modulename: 'inventory_workshop_management',
              appname: 'htsinventory',

            },
            columns: [
              {
                title: 'Job Card No',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Vehicle No',
                dataIndex: 'vehicle_no',
                key: 'vehicle_no',
              },
           
              {
                title: 'Date',
                dataIndex: 'creation',
                key: 'creation',
              },
            ],
            searchIndexes:[
              'vehicle_no', 'name'
            ]
          };
        } else {
          return e;
        }
      });

      newitems.forEach((item:any)=>{
        if(term){
          item.readonly = true
        }
      })

      setformData(newitems?.filter((e: any) => e?.name !== 'products'));
      // TableSelect
    });
   
  }, [term]);

  useEffect(()=>{
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_job_card_part_request',
        data,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items) => {
        setformValue({
          ...items,
          date: datetoFrom(items?.date),
        });
      });
    } else {
      const currentDate = moment().format('YYYY/MM/DD');

      setformValue({
        date: datetoFrom(currentDate),
      });
    }

  },[formData, term])

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          date: dateFormat(e?.date),
        },
      };

      updateRecord(
        'inventory_job_card_part_request',
        record,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items: any) => {
        {
          if (items?.status === 200) {
            setDoc_id(items?.data?.id);
            isSuccess(items?.message, 'success');
            switchToNextTab('/add-part-product-request', items?.data?.id);
          } else {
            isSuccess(items?.message, 'error');
          }
        }
      });
    } else {
      const record = {
        ...e,
        // active: e?.active ? 1 : 0,
        date: dateFormat(e?.date),
      };

      createRecord(
        'inventory_job_card_part_request',
        record,
        'inventory_workshop_management',
        'htsinventory'
      ).then((items) => {
        if (items?.status === 200) {
          setDoc_id(items?.data?.id);
          isSuccess(items?.message, 'success');
          switchToNextTab('/add-part-product-request', items?.data?.id);
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  return (
    <div>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        appname="htsinventory"
        dynamicLayout
      />
    </div>
  );
};

export default Create;
