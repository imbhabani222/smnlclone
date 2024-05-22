import React, { useCallback, useEffect, useState } from 'react';
import DynamicTabs from '../../../../../../libs/common/ui/Tabs/tabs';
import CreatePurchaseReturn from './createPurchaseReturn';
import PurchaseProductReturn from './productPurchaseReturn';

import { Button } from 'antd';
import {
  useNavigate,
  useSearchParams,
  useParams,
  useLocation,
} from 'react-router-dom';

type Props = {};

const AddDetails = (props: Props) => {
  const [doc_id, setDoc_id] = useState(null);
  const [grn_id, setGrn_id] = useState(null);
  const [supplier_id, setSupplier_id] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const switchToNextTab = useCallback(
    (key: any, _id: any, grn: any, supplierId: any) => {
      
      navigate(
        `${key}?id=${doc_id || id || _id}&grn=${grn || grn_id}&supId=${
          supplierId || supplier_id
        }`
      );
      setCurrentTab(key);
    },
    [doc_id, id, navigate, grn_id]
  );

  const tabsData = [
    {
      key: '/purchase-return',
      label: 'Purchase Return',
      children: (
        <CreatePurchaseReturn
          doc_id={doc_id}
          setDoc_id={setDoc_id}
          setSupplier_id={setSupplier_id}
          setGrn_id={setGrn_id}
          switchToNextTab={switchToNextTab}
        />
      ),
      disabled: location.pathname === '/return-product' ? true : false,
      
    },
    {
      key: '/return-product',
      label: 'Purchase Return Product',
      children: (
        <PurchaseProductReturn
          doc_id={doc_id}
            setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
          setSupplier_id={setSupplier_id}
          setGrn_id={setGrn_id}
        />
      ),
      disabled: location.pathname === '/purchase-return' ? true : false,
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

export default AddDetails;