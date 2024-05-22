import React, { useEffect, useState } from 'react';
import DynamicTabs from '../../../../../../libs/common/ui/Tabs/tabs';
import CreatePINDetails from './createList';
import PartIssueProduct from './productPartIssue';
import {
  useNavigate,
  useSearchParams,
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

  const switchToNextTab = (key: any) => {
    navigate(`${key}?id=${doc_id || id}`);
    setCurrentTab(key);
  };

  const tabsData = [
    {
      key: '/create-part-issue-note',
      label: 'Part Issue Note',
      children: (
        <CreatePINDetails
          doc_id={doc_id}
          setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
    },
    {
      key: '/part-issue-product',
      label: 'Part Issue Product',
      children: (
        <PartIssueProduct
          doc_id={doc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
      disabled: location.pathname === '/create-part-issue-note' && !id ? true : false,
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
