import React, { useEffect, useState } from 'react';
import DynamicTabs from '../../../../../../../libs/common/ui/Tabs/tabs';
import CreatePersonalDetails from '../personalDetails/Create';
import CreateOfficialDetails from '../officeDetails/Create';
import CreateAddressDetails from '../addressDetails/create';
import CreateOtherDetails from '../EmployeeOtherDetails/create';
import CreateFamilyDetails from '../familyDetails/create';
import CreateDocumentDetails from '../documentDetails/DocumentDetails';
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

  const switchToNextTab = (key: any) => {
    navigate(`${key}?id=${doc_id || id}`);
    setCurrentTab(key);
  };

  const tabsData = [
    {
      key: '/personal-details',
      label: 'Personal Details',
      children: (
        <CreatePersonalDetails
          // url={`?doc=persona-details?id=${doc_id || ""}`}
          doc_id={doc_id}
          setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
    },
    {
      key: '/official-details',
      label: 'Official Details',
      children: (
        <CreateOfficialDetails
          // url={`?doc=official-details?id=${doc_id || id}`}
          doc_id={doc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
      disabled:
        location.pathname === '/add-employee-details' && !id ? true : false,
    },
    {
      key: '/address-details',
      label: 'Address Details',
      children: (
        <CreateAddressDetails
          // url={`?doc=address-details?id=${doc_id}`}
          doc_id={doc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
      disabled:
        location.pathname === '/add-employee-details' && !id ? true : false,
    },
    {
      key: '/document-details',
      label: 'Document Details',
      children: (
        <CreateDocumentDetails
          url={`?doc=documnet-details?id=${doc_id}`}
          doc_id={doc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
      disabled:
        location.pathname === '/add-employee-details' && !id ? true : false,
    },
    {
      key: '/other-details',
      label: 'Other Details',
      children: (
        <CreateOtherDetails
          url={`?doc=other-details?id=${doc_id}`}
          doc_id={doc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
      disabled:
        location.pathname === '/add-employee-details' && !id ? true : false,
    },
    {
      key: '/family-details',
      label: 'Family Details',
      children: (
        <CreateFamilyDetails
          url={`?doc=family-details?id=${doc_id}`}
          doc_id={doc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
      disabled:
        location.pathname === '/add-employee-details' && !id ? true : false,
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

export default AddDetails;
