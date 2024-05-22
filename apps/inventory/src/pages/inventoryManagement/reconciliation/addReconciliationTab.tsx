import React, { useEffect, useState } from 'react';
import DynamicTabs from '../../../../../../libs/common/ui/Tabs/tabs';
import AddReconcilationData from './addReconciliationData';
import AddReconcilationProduct from './addReconciliationProduct';

import { Button } from 'antd';
import {
  useNavigate,
  useSearchParams,
  useParams,
  useLocation,
} from 'react-router-dom';

// import AddProduct from './purchaseOrder/addProduct';

type Props = {};

const PurchaseDetails = (props: Props) => {
  const [doc_id, setDoc_id] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const switchToNextTab = (key: any, i: any) => {
    navigate(`${key}?id=${i || doc_id || id}`);
    setCurrentTab(key);
  };

  const tabsData = [
    {
      key: '/reconciliation-data',
      label: 'Reconciliation',
      children: (
        <AddReconcilationData
          doc_id={doc_id}
          setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
    },
    {
      key: '/add-reconciliation-product',
      label: 'Add Product',
      children: (
        <AddReconcilationProduct
          doc_id={doc_id}
          // setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
      disabled:
        location.pathname === '/reconciliation-data' && !id ? true : false,
    },
  ];

  useEffect(() => {
    if (location.pathname) {
      const tab = tabsData?.find((e: any) => location.pathname.includes(e.key));
      tab && setCurrentTab(tab?.key);
    }
  }, [location.pathname]);
  return (
    <div>
      <DynamicTabs
        items={tabsData}
        currentTab={currentTab}
        onChange={switchToNextTab}
      />
    </div>
  );
};

export default PurchaseDetails;
