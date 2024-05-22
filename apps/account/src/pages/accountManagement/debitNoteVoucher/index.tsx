import { useEffect, useState } from 'react';
import DynamicTabs from '../../../../../../libs/common/ui/Tabs/tabs';
import CreateDebitVoucher from '../debitNoteVoucher/create';
import AddAccount from '../debitNoteVoucher/AccountDetails';

import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

type Props = {};

const AddDetails = (props: Props) => {
    const [doc_id, setDoc_id] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState<any>();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
  
    const switchToNextTab = (key: any, i: any) => {
      navigate(`${key}?id=${doc_id || id || i}`);
      setCurrentTab(key);
    };
  
    const tabsData = [
      {
        key: '/create-debit-note-voucher',
        label: 'Debit Note Voucher',
        children: (
          <CreateDebitVoucher
            // url={`?doc=persona-details?id=${doc_id || ""}`}
            doc_id={doc_id}
            setDoc_id={setDoc_id}
            switchToNextTab={switchToNextTab}
          />
        ),
      },
    
      {
        key: '/debit-note-details',
        label: 'Details',
        children: (
          <AddAccount
            // url={`?doc=persona-details?id=${doc_id || ""}`}
            doc_id={doc_id}
            //   setDoc_id={setDoc_id}
            switchToNextTab={switchToNextTab}
          />
        ),
        // disabled: location.pathname === '/create-debit-note-voucher' && !id ? true : false,
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

  //   const tabsData = [
  //     {
  //       key: '/create-debit-note-voucher',
  //       label: 'Debit Note Voucher',
  //       children: (
  //         <CreateDebitVoucher
  //           // url={`?doc=persona-details?id=${doc_id || ""}`}
  //           doc_id={doc_id}
  //           setDoc_id={setDoc_id}
  //           switchToNextTab={switchToNextTab}
  //         />
  //       ),
  //     },

  //     {
  //       key: '/debit-note-details',
  //       label: 'Details',
  //       children: (
  //         <AddAccount
  //           // url={`?doc=persona-details?id=${doc_id || ""}`}
  //           doc_id={doc_id}
  //           //   setDoc_id={setDoc_id}
  //           switchToNextTab={switchToNextTab}
  //         />
  //       ),
  //       disabled:
  //         location.pathname === '/create-debit-note-voucher' && !id
  //           ? true
  //           : false,
  //     },
  //   ];

  //   useEffect(() => {
  //     if (location.pathname) {
  //       const tab = tabsData?.find((e: any) => location.pathname.includes(e.key));
  //       tab && setCurrentTab(tab?.key);
  //     }
  //   }, [location.pathname]);
  //   return (
  //     <div>
  //       <DynamicTabs
  //         items={tabsData}
  //         currentTab={currentTab}
  //         onChange={switchToNextTab}
  //       />
  //     </div>
  //   );
  // };

export default AddDetails;
