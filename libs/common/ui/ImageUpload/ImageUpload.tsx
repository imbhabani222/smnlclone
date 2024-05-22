import React, { useEffect, useState } from 'react';
import { DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Modal, Upload } from 'antd';
import { getBase64 } from '../../../common/utils/common';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { ReactComponent as PdfIcon } from '../../assets/icons/pdf.svg';
import { ReactComponent as ExcelIcon } from "../../assets/icons/excel.svg"
//@ts-ignore
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
// @ts-ignore
import style from './ImageUpload.module.scss';
/**
 * @method
 * important props
 * @param {Number} maxCount -> Limit the number of uploaded files. Will replace current one when maxCount is 1
 *
 */

const ImageUpload = (props: any) => {
  const { name = 'Image upload' } = props;

  const [imageurl, setimageurl] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileType, setfileType] = useState('');
  const [fileData, setfileData] = useState<any>();
  const handleChange = async (info: any) => {
    const { status, type } = info.file;
    let fileTypeValidation = false;
    if (props?.fieldData?.description?.type) {
      if (type !== props?.fieldData?.description?.type) {
        fileTypeValidation = true;
      }
    }
    if (name && !fileTypeValidation) {
      const data: any = await getBase64(info.file.originFileObj);
      setimageurl(data);
      const fieldData = {
        filename: name,
        file: data.split(',')[1],
        originalfile: data,
      };
      const exs = info.file.name.split('.');
      console.log(exs[exs.length - 1]);

      setfileType(exs[exs.length - 1]);
      setfileData(fieldData);
      props?.handleImageUpload(fieldData, exs[exs.length - 1], props?.fieldData?.name);
    }
  };

  const handleBeforeUpload = (file: any) => {
    const { type, name } = file;
    if (props?.fieldData?.description?.type) {
      if (type !== props?.fieldData?.description?.type) {
        message.error(`${name} incorrect file type`);
      }
    }
  };
  const handleDrop = () => {};

  useEffect(() => {
    if (props?.value) {
      setimageurl(props.value);
    }
  }, [props?.value]);

  const handleClick = () => {
    setimageurl('');
    props?.handleImageUpload(null, null, props?.fieldData?.name);
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: any) => {
    setPreviewOpen(true);
    // setPreviewTitle(
    //   file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)

    // );

    let src = file.url as string;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file?.originFileObj as RcFile);
        reader.onload = () => resolve(reader?.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);

    //@ts-ignore
    imgWindow?.document.write(image.src);
  };

  return (
    <div>
      {imageurl  ? (
       ( props?.fieldData?.disabled && !imageurl.includes("/pdf") && !imageurl.includes(".pdf") ) ? (
          <div className={style.uploadimage}>
            <div className={style.imagearea}>
              <img src={imageurl} style={{ width: '100%',cursor:"not-allowed" }} />
              {/* <div className={style.removearea} /> */}
            </div>
          </div>
        ) : (
          <div className={style.uploadimage}>
            <div className={style.imagearea}>
              {fileType === 'pdf' || imageurl.includes('.pdf') || imageurl.includes("/pdf") ? (
                <div className={style.pdfimg}>
                  <PdfIcon />
                </div>
              ) :
              fileType === "xlsx" ?
              <div className={style.pdfimg}>
                  <ExcelIcon />
                </div> :
              (
                <img src={imageurl} alt="avatar" style={{ width: '100%' }} />
              )}
              <div className={style.removearea} />
            </div>

            <div className={style.removeIcon}>
              <div className={style.disPlayFlex}>
                {fileType !== "xlsx" &&
                <div onClick={handlePreview}>
                  <EyeOutlined style={{ fontSize: '16px', color: '#ffffff' }} />
                </div>}
                <div onClick={handleClick}>
                  <DeleteOutlined
                    style={{ fontSize: '16px', color: '#ffffff' }}
                  />
                </div>
              </div>
            </div>
            <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
              <div className={style.modalView}>
                {fileType === 'pdf' || imageurl.includes('.pdf') || imageurl.includes("/pdf") ? (
                  <embed
                    src={`${imageurl || fileData?.originalfile}`}
                    style={{ width: '90%', height: '70vh' }}
                  />
                ) : (
                  <img
                    alt="example"
                    style={{ width: '90%', height: '70vh' }}
                    src={fileData?.originalfile || imageurl}
                  />
                )}
              </div>
            </Modal>
          </div>
        )
      ) : (
        <>
          <Upload.Dragger
            style={{ width: '100%' }}
            onChange={handleChange}
            onDrop={handleDrop}
            beforeUpload={handleBeforeUpload}
            onPreview={handlePreview}
            showUploadList={false}
            listType="picture-circle"
            accept={
              props?.fieldData?.description?.accept ||
              'image/jpeg, image/png, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            }
            // {...props}
            disabled={props?.fieldData?.disabled || false}
          >
            <div className={style.imageUpload__content}>
              {/* <PlusOutlined style={{ fontWeight: 600 }} /> */}
              <span style={{ color: '#1C1C1D', fontWeight: 600 }}>
                Drag & Drop
              </span>
              <span style={{ color: '#1C1C1D', fontWeight: 600 }}>or</span>
              <span style={{ color: '#322C73', fontWeight: 600 }}>
                Click to upload
              </span>
            </div>
            <div className={style.acceptedValues}>
              <span> {props?.fieldData?.description?.fileType} </span>
            </div>
          </Upload.Dragger>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
