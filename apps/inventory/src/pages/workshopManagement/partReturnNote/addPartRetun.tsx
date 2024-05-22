import React, { useEffect, useState, useCallback } from 'react';
import DynamicTabs from '../../../../../../libs/common/ui/Tabs/tabs';
import CreatePartReturn from './createPartReturn';
import AddPartReturnProduct from './addProductReturn'

import { Button } from 'antd';
import {
  useNavigate,
  useSearchParams,
  useParams,
  useLocation,
} from 'react-router-dom';


type Props = {};

const ReturnDetails = (props: Props) => {
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
      key: '/create-part-return-note',
      label: 'Part Retun Note',
      children: (
        <CreatePartReturn
          doc_id={doc_id}
          setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
    },
    {
      key: '/add-part-return-product',
      label: 'Add Part Return Product',
      children: (
        <AddPartReturnProduct
          doc_id={doc_id}
          setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
      disabled: location.pathname === '/create-part-return-note' && !id ? true : false,
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

export default ReturnDetails;
