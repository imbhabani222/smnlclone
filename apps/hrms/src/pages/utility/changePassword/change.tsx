import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import {
  ChangePassword
} from '../../../../../../libs/common/api/doctype';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { changePasswordFields} from "./changePasswordFields"
type Props = {};

const Create = (props: Props) => {
  const [formValue, setFormValues] = useState({});

 
  const handleFinish = (e: any) => {
    const cookies = new Cookies();
  const userid = cookies.get('userid');
   const payload = {
    user_id : userid,
    data: {
      old_password: e?.old_password,
      new_password: e?.new_password
    }
   }
   ChangePassword('htssuite',payload).then((item:any) => {
  if (item?.status === 200) {
    isSuccess(item?.message, 'success');
  } else {
    isSuccess(item?.message, 'error');
  }
 })
    
  };
  return (
    <div>
      <FormWrapper
        formValue={formValue}
        formData={changePasswordFields}
        dynamicLayout={true}
        handleFinish={handleFinish}
      />
    </div>
  );
};

export default Create;
