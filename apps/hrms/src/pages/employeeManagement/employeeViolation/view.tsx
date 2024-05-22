import React, { useEffect, useState } from "react";
import { getDocTypes, getTableData } from "../../../../../../libs/common/api/doctype";
import Table from "../../../../../../libs/common/ui/Table/SmnlTable";
import PreviewModal from "../../../../../../libs/common/ui/PreviewModal/previewModal";
import SpinLoader from "../../../../../../libs/common/ui/Loader/spinLoader";


type Props = {};

const View = (props: Props) => {
    const [loading, setLoading] = useState(false)
    const [columns, setcolumns] = useState<any>([]);
    const [tableData, setTableData] = useState<any>([]);
    const [openModal, setOpenModal] = useState(false)
    const [fileUrl, setFileUrl] = useState()



    useEffect(() => {
      setLoading(true)
      getDocTypes('Employee Violations', false, 'htssuite').then((items: any) =>{
        const modifiedColumns = items?.map((item:any)=>{
          if (item?.dataIndex === 'upload_pdf' ) {
            return {
               ...item,
               render : (text:string,record:any)=>{
                if (text) {
                  return(
                    <a onClick={()=>handlePreviewModal(text)}>view</a>
                  )
               
               }else{
                return (
                  <p>-</p>
                )
               }} 
            }
            
          }
          return item
        })
        setcolumns(modifiedColumns)
        setLoading(false)

      }
      );
      getTableData(
        'employee_violations',
        'employee_management',
        'htssuite'
      ).then((items: any) => {
        const table = items;
         table.forEach((item:any) => {
          item.employee_name = item.employee_name.value
         })
        setTableData(table)
        setLoading(false)
      }
      
      
      );
    }, []);

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
        <Table
          dataSource={tableData}
          column={columns}
          editUrl={'/create-violation'}
        />
        <PreviewModal openModal={openModal} closeModal={closeModal} fileUrl = {fileUrl}/>
      </div>
    );

}

export default View