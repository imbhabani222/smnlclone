import React, { useEffect, useState } from "react";
import {
    getFields,
    createRecord,
    getRecordById,
    updateRecord,
  } from '../../../../../../../libs/common/api/doctype';
import FormWrapper from '../../../../../../../libs/common/ui/Form/FormWrapper';
import Message from '../../../../../../../libs/common/ui/Message/message';
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    CustomiseData,
    addExtraFields,
  } from "../../../../../../../libs/common/ui/Form/FormHelper";


type Props = {
    doc_id: string | null;
    setDoc_id?: any; //only for first
    url?: string;
    switchToNextTab:any
  };

const Create = (props: Props) => {
    const { doc_id, setDoc_id } = props;
    const [formData, setFormData] = useState<any>([]);
    const [formValues, setFormValues] = useState<any>({});
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const navigate = useNavigate();
    const [msg, setmsg] = useState({
        desc: "",
        isError: false,
        isSuccess: false,
        isWarning: false,
      });

  useEffect(() => {
    getFields('Inventory Number Edit Rights').then((items: any) => {
      const newData = CustomiseData(items, { addCheckboxColSpan: true });
      let newItems: any = addExtraFields(newData, [
        {
          name: "first_name",
          module: "general_setup",
        },
        {
          name: "first_name_duplicate",
          module: "general_setup",
        },
      ]);
      setFormData(newItems);
    });

    if (doc_id || id) {
      const data = { doc_id: doc_id || id };
      getRecordById('inventory_number_edit_rights', data, "general_setup").then(
        (items) => {
          if (items?.name) {
            const da = {
              ...items,
            };
            setFormValues(da);
          }
        }
      );
    }
  }, [doc_id, id]);

  const handleFinish = (values: any) => {
    if ((doc_id || id) && formValues?.name) {
      const record = {
        doc_id: formValues?.name,
        data: {
          empcode: doc_id || id,
          ...values,
        },
      };

      updateRecord('inventory_number_edit_rights', record, "general_setup").then(
        (items: any) => {
          setmsg((pre) => {
            const message =
              items?.status !== "error"
                ? { isSuccess: true }
                : { isError: true };
            return {
              ...pre,
              ...message,
              desc: items?.message,
            };
          });
        }
      );
    }
    else {
        const record = {
          ...values,
        };
        createRecord('inventory_number_edit_rights', record, "general_setup").then(
          (items) => {
            setDoc_id(items?.id);
            setmsg((pre) => {
              const message =
                items?.status !== "error"
                  ? { isSuccess: true }
                  : { isError: true };
              return {
                ...pre,
                ...message,
                desc: items?.message,
              };
            });
          }
        );
        }
      };

      const handleQuit = () => {
        setTimeout(() => {
            navigate('/view-user-master');
        }, 1000);
      };

      return (
        <div>
          <Message
            msg={msg?.desc}
            isSuccess={msg.isSuccess}
            isError={msg.isError}
            isWarning={msg.isWarning}
            handleQuit={handleQuit}
          />
          <FormWrapper
            formData={formData}
            formValue={formValues}
            handleFinish={handleFinish}
            submitButtonLabel="Save & Continue"
          />
        </div>
      );
};
export default Create;
