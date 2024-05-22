import React, { useEffect, useState, useCallback } from 'react';
import DynamicTabs from '../../../../../../libs/common/ui/Tabs/tabs';
import PurchaseOrder from './purchaseView';
import {
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom';

import AddProduct from './addProduct';

type Props = {};

const PurchaseDetails = (props: Props) => {
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
      key: '/purchase-order',
      label: 'Purchase Order Details',
      children: (
        <PurchaseOrder
          doc_id={doc_id}
          setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
    },
    {
      key: '/order-product',
      label: 'Purchase Order Product',
      children: (
        <AddProduct
          doc_id={doc_id}
          setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
      disabled: location.pathname === '/purchase-order' && !id ? true : false,
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

export default PurchaseDetails;
