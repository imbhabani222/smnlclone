import React, { useEffect, useState, useCallback } from 'react';
import {
  getFields,
  createRecord,
  getRecordById,
  updateRecord,
  getIssuedToName,
} from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import {
  dateFormat,
  datetoFrom,
} from '../../../../../../libs/common/utils/common';
import moment from 'moment';

type Props = {
  doc_id: string | null;
  setDoc_id: any;
  switchToNextTab?: any;
  url?: string;
};

const Create = (props: Props) => {
  const { doc_id, setDoc_id, switchToNextTab = () => {} } = props;
  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [formValue, setformValue] = useState<any>({
    grade_name: '',
    active: false,
  });
  const [products, setProducts] = useState({});

  let [searchParams, setSearchParams] = useSearchParams();
  const term = searchParams.get('id');

  useEffect(() => {
    const currentDate = moment().format('YYYY-MM-DD');
    getFields('Inventory Part Issue Note', 'htssuite').then((items) =>
      items.forEach((item: any) => {
        if (item.name === 'issue_date') {
          item.options = 'past';
        }

        setformData(
          items?.map(
            (e: any) =>
              e?.name !== 'products' && e?.name !== 'gate_pass' && { ...e }
          )
        );
      })
    );
    if (term) {
      const data = { name: term };
      getRecordById(
        'inventory_part_issue_note',
        data,
        'inventory_management',
        'htsinventory'
      ).then((items) => {
        setformValue({
          ...items,
          issue_date: datetoFrom(items?.issue_date),
          active: items?.active === 1 ? true : false,
        });
      });
    } else {
      setformValue({
        issue_date: datetoFrom(currentDate),
      });
    }
  }, [term]);

  const formChangeHandler = useCallback(
    (e: any, fieldName: any) => {
      if (fieldName === 'request_no') {
        console.log('JKJKJJ');
        getIssuedToName(
          'inventory_job_card_part_request',
          e,
          'inventory_workshop_management',
          'htsinventory'
        ).then((item) => {
          setformValue({
            ...formValue,
            issue_to: item?.issue_to?.id,
          });
        });
      }
    },
    [formData]
  );

  const handleFinish = (e: any) => {
    if (term) {
      const record = {
        name: term,
        data: {
          ...e,
          issue_date: dateFormat(e?.issue_date),
          // active: e?.active ? 1 : 0,
        },
      };

      updateRecord(
        'inventory_part_issue_note',
        record,
        'inventory_management',
        'htsinventory'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/part-issue-product');
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    } else {
      const record = {
        ...e,
        issue_date: dateFormat(e?.issue_date),
        // active: e?.active ? 1 : 0, 
      };

      createRecord(
        'inventory_part_issue_note',
        record,
        'inventory_management',
        'htsinventory'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/part-issue-product', items?.data?.id);
        } else {
          isSuccess(items?.message, 'error');
        }
      });
    }
  };

  const handleAddProducts = () => {
    getFields('Inventory Part Issue Note', 'htssuite').then((items) =>
      setformData(items)
    );
  };

  return (
    <div>
      <FormWrapper
        formValue={formValue}
        formData={formData}
        handleFinish={handleFinish}
        onChange={formChangeHandler}
        appname="htsinventory"
        dynamicLayout
      />
    </div>
  );
};

export default Create;
