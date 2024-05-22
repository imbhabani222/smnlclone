// import React, { useEffect, useState } from 'react';
// import {
//   getFields,
//   createRecord,
//   getRecordById,
//   updateRecord,
// } from '../../../../../../libs/common/api/doctype';
// import Message from '../../../../../../libs/common/ui/Message/message';
// import { useSearchParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
// import { addExtraFields } from '../../../../../../libs/common/ui/Form/FormHelper';
// type Props = {};

// const Create = (props: Props) => {
//   const navigate = useNavigate();
//   const [formData, setformData] = useState([]);
//   const [formValue, setformValue] = useState({ grade_name: '', active: false });
//   const [msg, setmsg] = useState({
//     desc: '',
//     isError: false,
//     isSuccess: false,
//     isWarning: false,
//   });
//   let [searchParams, _] = useSearchParams();
//   const term = searchParams.get('id');
//   useEffect(() => {
//     getFields('User Role').then((items) => {
//       let newItems: any = addExtraFields(items, [
//         { name: 'email', module: 'general_setup' },
//       ]);
//       setformData(newItems);
//     });
//     if (term) {
//       const data = { name: term };
//       getRecordById('user_role', data).then((items) => {
//         if (items?.notice_date) {
//           const da = {
//             ...items,
//             grade_name: items?.grade_name,
//             active: items?.active === 1 ? true : false,
//           };
//           setformValue(da);
//         }
//       });
//     }
//   }, [term]);

//   const handleFinish = (e: any) => {
//     if (term) {
//       const record = {
//         doc_id: term,
//         data: {
//           ...e,
//           active: e?.active ? 1 : 0,
//         },
//       };

//       updateRecord('user_role', record, 'general_setup').then((items: any) => {
//         setmsg((pre) => {
//           const message =
//             items?.status !== 'error' ? { isSuccess: true } : { isError: true };
//           return {
//             ...pre,
//             ...message,
//             desc: items?.message,
//           };
//         });
//       });
//     } else {
//       const record = {
//         ...e,
//         active: e?.active ? 1 : 0,
//       };

//       createRecord('user_role', record, 'general_setup').then((items) =>
//         setmsg((pre) => {
//           const message =
//             items?.status !== 'error' ? { isSuccess: true } : { isError: true };
//           return {
//             ...pre,
//             ...message,
//             desc: items?.message,
//           };
//         })
//       );
//     }
//   };

//   const handleQuit = () => {
//     setTimeout(() => {
//       navigate('/view-user-role');
//     }, 1000);
//   };

//   return (
//     <div>
//       <Message
//         msg={msg?.desc}
//         isSuccess={msg.isSuccess}
//         isError={msg.isError}
//         isWarning={msg.isWarning}
//       />
//       <FormWrapper
//         formValue={formValue}
//         formData={formData}
//         handleFinish={handleFinish}
//       />
//     </div>
//   );
// };

// export default Create;
