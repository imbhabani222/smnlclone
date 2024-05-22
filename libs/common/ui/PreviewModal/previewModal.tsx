import React from 'react'
// @ts-ignore
import style from '../ImageUpload/ImageUpload.module.scss'
import { message, Modal, Upload } from 'antd';
 


function previewModal(props:any) {
    console.log(props?.fileUrl,"propss");
    
  return (
    <div>
         <Modal open={props?.openModal} footer={null} onCancel={props?.closeModal} >
              {/* <div className={style.modalView}> */}
             {
              props?.fileUrl?.includes('.pdf') ? <embed src={props?.fileUrl} width={450} height={700}/> : 
               <img
              // alt="example"
              style={{ width: '90%', height: '50vh' }}
              src={props?.fileUrl}
            />
             }
                 
              {/* </div> */}
            </Modal>
    </div>
  )
}

export default previewModal