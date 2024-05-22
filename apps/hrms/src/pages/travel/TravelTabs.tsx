import React, { useEffect, useState } from 'react';
import DynamicTabs from '../../../../../libs/common/ui/Tabs/tabs';
import TravelRequest from './travelRequest/create';
import TravelApproval from './travelApproveReject/Create';
import TravelReport from './travelReport/Create';

import { Button } from 'antd';
import {
  useNavigate,
  useSearchParams,
  useParams,
  useLocation,
} from 'react-router-dom';
type Props = {};

const TravelTabs = (props: Props) => {
  const [doc_id, setDoc_id] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const switchToNextTab = (key: any) => {
    navigate(`${key}`);
    setCurrentTab(key);
  };

  const tabsData = [
    {
      key: '/create',
      label: 'Raise Travel Request',
      children: <TravelRequest />,
    },
    {
      key: '/approve-request',
      label: 'Approval',
      children: <TravelApproval />,
    },
    {
      key: '/report',
      label: 'Report',
      children: <TravelReport />,
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

export default TravelTabs;
