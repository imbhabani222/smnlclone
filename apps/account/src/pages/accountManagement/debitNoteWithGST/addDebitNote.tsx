import React, { useEffect, useState, useCallback } from 'react';
import DynamicTabs from '../../../../../../libs/common/ui/Tabs/tabs';
import CreateDebitNote from './createDebitNote';
import AddDebitProduct from './addDebitNoteProduct'
import { Button } from 'antd';
import {
  useNavigate,
  useSearchParams,
  useParams,
  useLocation,
} from 'react-router-dom';


type Props = {};

const AddCreditNote = (props: Props) => {
  const [doc_id, setDoc_id] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const switchToNextTab = useCallback(
    (key: any, _id: any) => {
      navigate(`${key}?id=${doc_id || id || _id}`);
      setCurrentTab(key);
    },
    [doc_id, id, navigate]
  );

  const tabsData = [
    {
      key: '/create-debit-note-with-gst',
      label: 'Debit Note with GST',
      children: (
        <CreateDebitNote
          doc_id={doc_id}
          setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
    },
    {
      key: '/add-debit-note-product',
      label: 'Add Product',
      children: (
        <AddDebitProduct
          doc_id={doc_id}
          setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
      disabled: location.pathname === '/create-debit-note-with-gst' && !id ? true : false,
    },
  ];

  useEffect(() => {
    if (location.pathname) {
      const tab = tabsData?.find((e: any) => location.pathname.includes(e.key));
      tab && setCurrentTab(tab?.key);
    }
  }, [location.pathname]);
  return (
    <>
      <DynamicTabs
        items={tabsData}
        currentTab={currentTab}
        onChange={switchToNextTab}
      />
    </>
  );
};

export default AddCreditNote;
