import React, { useEffect, useState } from "react";
import DynamicTabs from "../../../../../../libs/common/ui/Tabs/tabs";

import CreateNumberEditRights from "./numberEditRights/create"
import CreatePersonalDetailsAndPermissions from "./personalDetailsAndPermissions/create"
import CreateTaxChangePermissions from "./taxChangePermissions/create"

import {
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

type Props = {};

const Tabs = (props: Props) => {
  const [doc_id, setDoc_id] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<any>();
  const [searchParams, _] = useSearchParams();
  
  const id = searchParams.get("id");

  const switchToNextTab = (key: any) => {
    navigate(`${key}?id=${doc_id || id}`);
    setCurrentTab(key);
  };

  const tabsData = [
    {
      key: "/create-personal-details-and-permissions",
      label: "Personal Details & Permissions",
      children: (
        <CreatePersonalDetailsAndPermissions
          doc_id={doc_id}
          setDoc_id={setDoc_id}
          switchToNextTab={switchToNextTab}
        />
      ),
    },
    {
        key: "/create-number-edit-rights",
        label: "Number Edit Rights",
        children: (
          <CreateNumberEditRights
            doc_id={doc_id}
            setDoc_id={setDoc_id}
            switchToNextTab={switchToNextTab}
          />
        ),
      },
    {
        key: "/create-tax-change-permissions",
        label: "Tax Change Permissions",
        children: (
          <CreateTaxChangePermissions
            doc_id={doc_id}
            setDoc_id={setDoc_id}
          />
        ),
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

export default Tabs;