import React, { useEffect, useState } from 'react';
import DynamicTabs from '../../../../../../libs/common/ui/Tabs/tabs';
import CreateIndentDetails from './createPurchaseIndent';
import PurchaseIndentProduct from './productPurchaseIndent';
// import CreateOfficialDetails from '../officeDetails/Create';
// import CreateAddressDetails from '../addressDetails/create';
// import CreateOtherDetails from '../EmployeeOtherDetails/create';
// import CreateFamilyDetails from '../familyDetails/create';
// import CreateDocumentDetails from '../documentDetails/DocumentDetails';
// import Create
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
      key: '/purchase-indent',
      label: 'Purchase Indent',
      children: (
        <CreateIndentDetails
          // url={`?doc=persona-details?id=${doc_id || ""}`}
          doc_id={doc_id}
          setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
    },
    {
      key: '/indent-product',
      label: 'Purchase Indent Product',
      children: (
        <PurchaseIndentProduct
          // url={`?doc=persona-details?id=${doc_id || ""}`}
          doc_id={doc_id}
          //   setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
      disabled: location.pathname === '/purchase-indent' && !id ? true : false,
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
