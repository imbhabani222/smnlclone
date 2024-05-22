import React, { useEffect, useState } from 'react';
import {
  getFields,
  getRecordById,
  updateRecord,
  createRecord,
} from '../../../../../../../libs/common/api/doctype';
import FormTable from '../../../../../../../libs/common/ui/Form_Table/FormTable';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setFormData } from '../../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../../libs/common/ui/Message';
import { ReactComponent as DeleteIcon } from '../../../../../../../libs/common/assets/icons/Delete.svg';
import PreviewModal from '../../../../../../../libs/common/ui/PreviewModal/previewModal';
import SpinLoader from '../../../../../../../libs/common/ui/Loader/spinLoader';


type Props = { doc_id: any; switchToNextTab?: any; url?: string };
const Create = (props: Props) => {
  const { doc_id, switchToNextTab = () => { } } = props;
  const [formData, setformData] = useState([]);
  const [formValues, setFormValues] = useState<any>({});
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [imageData, setimageData] = useState<any>({});
  const [tableData, settableData] = useState<any>({});
  const [openModal, setOpenModal] = useState(false)
  const [fileUrl, setFileUrl] = useState()

  const columns = (onDeleteRecord: any) => [
    {
      title: 'Document Type',
      dataIndex: 'document',
      key: 'document',
    },
    {
      title: 'Upload Document',
      dataIndex: 'upload_document',
      key: 'upload_document',
      render: (text: any, record: any) => {
        return (
          <a onClick={()=>handlePreviewModal(text)}>
            View
          </a>
        )

      }
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      // render: (_, record:any) => <DeleteIcon style={{cursor:"pointer"}}onClick={(e) => onDeleteRecord(e, record)} />,
    },
  ];

  useEffect(() => {
    setLoading(true)
    getFields('Document details', 'htssuite').then((items) => {
      const newitems: any = [
        ...items,
        {
          label: 'Document Type',
          name: 'document_type',
          datatype: 'Data',
          isReq: true,
          description: { type: 'onlychar' },
          options: {},
          hidden: 0,
        },
        {
          label: 'Upload Document',
          name: 'upload_document',
          datatype: 'Attach Image',
          isReq: true,
          description: {
            accept:
              'image/jpeg,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            fileType: 'Only .jpeg',
            type: 'image/jpeg',
          },
          default: 0,
          options: {},
          hidden: 0,
        },
      ];
      setformData(newitems);
      setLoading(false)

      // const data: any = setFormData(newitems);
      // !doc_id && setFormValues(data);
    });

    if (doc_id || id) {
      setLoading(true)
      const data = { doc_id: doc_id || id };
      getRecordById(
        'document_details',
        data,
        'employee_management',
        'htssuite'
      ).then((items) => {
        settableData(items?.[0]);
        setFormValues(items?.[0]);
        setLoading(false)
      });
    }
  }, [doc_id, id]);

  const handleFinish = (values: any) => {
    if ((doc_id || id) && formValues?.name) {
      setLoading(true)
      const record = {
        doc_id: formValues?.name,
        data: {
          emp_code: doc_id || id,
          document: JSON.stringify(values),
        },
      };
      updateRecord(
        'document_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items: any) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/other-details');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    } else {
      setLoading(true)
      const record = {
        document: JSON.stringify(values),
        emp_code: doc_id || id,
      };
      createRecord(
        'document_details',
        record,
        'employee_management',
        'htssuite'
      ).then((items) => {
        if (items?.status === 200) {
          isSuccess(items?.message, 'success');
          switchToNextTab('/other-details');
          setLoading(false)
        } else {
          isSuccess(items?.message, 'error');
          setLoading(false)
        }
      });
    }
  };



  const handleImageUpload = (e: any) => {    
    setimageData({...e,
      originalfile : 'data:image/png;base64,'+e?.file
    });
    setFormValues({
      upload_document: e?.originalfile,
    });
  };



  let formDataFamilyRemoved = formData.filter((item: any) => {
    if (item.label === 'Document') {
      return false;
    }
    return true;
  });
  const onDeleteRecord = (id: any, record: any) => {
    const table = [...tableData];
    const deletedRecord = table.filter(
      (item: any) => item.si_no !== record?.si_no
    );
    settableData(deletedRecord);
  };
  const handleCancel = () => {
    navigate('/view-employee-details');
  };


  const handleFormCancel = () => {

  }

  const handlePreviewModal = (text:any) => {
    setFileUrl(text)
    setOpenModal(true)
  }

  const closeModal = () => {
    setOpenModal(false)
  }

  




  return (
    <div>
      <SpinLoader loading={loading}/>
      <FormTable
        formValue={formValues}
        formData={formDataFamilyRemoved}
        columns={columns(onDeleteRecord)}
        module="employee_management"
        doctype="document_details"
        handleFinish={handleFinish}
        doc_id={doc_id || id}
        handleImageUpload={handleImageUpload}
        imageData={imageData}
        tableData={tableData}
        handleCancel={handleCancel}
        handleFormCancel={handleFormCancel}
        goBack="/view-employee-details"
      // previewModal={handlePreviewModal }
      />
      <PreviewModal openModal={openModal} closeModal={closeModal} fileUrl = {fileUrl} />

    </div>
  );
};

export default Create;
