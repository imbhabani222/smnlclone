
import { useEffect , useState,useCallback} from "react";
import DynamicTabs from "../../../../../../libs/common/ui/Tabs/tabs";
import CreateNoteVoucher from "../creditNoteVoucher/create";
import AddAccount from "../creditNoteVoucher/AccountDetails";

import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

type Props = {};

const AddDetails = (props: Props) => {
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
        key: '/credit-note-voucher',
        label: 'Credit Note Voucher',
        children: (
          <CreateNoteVoucher
            // url={`?doc=persona-details?id=${doc_id || ""}`}
            doc_id={doc_id}
            setDoc_id={setDoc_id}
            switchToNextTab={switchToNextTab}
          />
        ),
      },
    
      {
        key: '/credit-note-details',
        label: 'Details',
        children: (
          <AddAccount
            // url={`?doc=persona-details?id=${doc_id || ""}`}
            doc_id={doc_id}
            //   setDoc_id={setDoc_id}
            switchToNextTab={switchToNextTab}
          />
        ),
        // disabled: location.pathname === '/create-credit-note-voucher' && !id ? true : false,
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

  // const tabsData = [
  //   {
  //     key: '/credit-note-voucher',
  //     label: 'Credit Note Voucher',
  //     children: (
  //       <CreateNoteVoucher
  //         // url={`?doc=persona-details?id=${doc_id || ""}`}
  //         doc_id={doc_id}
  //         setDoc_id={setDoc_id}
  //         switchToNextTab={switchToNextTab}
  //       />
  //     ),
  //   },

  //   {
  //     key: '/credit-note-details',
  //     label: 'Details',
  //     children: (
  //       <AddAccount
  //         // url={`?doc=persona-details?id=${doc_id || ""}`}
  //         doc_id={doc_id}
  //         //   setDoc_id={setDoc_id}
  //         switchToNextTab={switchToNextTab}
  //       />
  //     ),
  //     disabled:
  //       location.pathname === '/create-credit-note-voucher' && !id
  //         ? true
  //         : false,
  //   },
  // ];

  // useEffect(() => {
  //   if (location.pathname) {
  //     const tab = tabsData?.find((e: any) => location.pathname.includes(e.key));
  //     tab && setCurrentTab(tab?.key);
  //   }
  // }, [location.pathname]);
  // return (
  //   <div>
  //     <DynamicTabs
  //       items={tabsData}
  //       currentTab={currentTab}
  //       onChange={switchToNextTab}
  //     />
  //   </div>
  // );


export default AddDetails;
