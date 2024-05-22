import React, { useEffect, useState } from 'react';
import {
  onCloseActivity
} from '../../../../../../libs/common/api/doctype';
import { useNavigate } from 'react-router-dom';
import { setFormData } from '../../../../../../libs/common/utils/common';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import { useSearchParams } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import TwoFormWrapper from '../../../../../../libs/common/ui/TwoForm_Table/TwoFormWrapper';
import { disableAllFieldsHandler } from '../../../../../../libs/common/ui/Form/FormHelper';
import styles from '../taskprogress.module.scss';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import {formDataInitial,formDataFinal,taskProgressColumns} from "../helper";
import { Button } from 'antd';


interface ResultItem {
  name: any;
  day: any;
  quantity_lifted: any;
  quantity_left: number;
  total_qty: any;
  [key: string]: number; // Allow any string key with a number value
}

const Create = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  //   const [formDataInitail, setFormDataInitial] = useState([]);
  //   const [formDataFinal, setFormDataFinal] = useState([]);
  const [taskNo, setTaskNo] = useState<string>('');
  const [taskDetails, setTaskDetails] = useState<any>([]);
  const [formValueInitial, setFormValueInitial] = useState<any>({
    active: false,
  });
  const [formValueFinal, setFormValueFinal] = useState<any>({
    active: false,
  });
 const [tableData, setTableData] = useState<any>([])
 const [columnsData, setColumsData] = useState<any>([])
  const [searchParams] = useSearchParams();
  const term = searchParams.get('id');

 


  const handleFinishFinal = (e: any) => {
    console.log(e, 'prnt');
  };

  const handleFinishInitial = (e: any) => {
    console.log(e, 'print');
    setloading(true)
    const endPoint = `api.get_task_progress?task_id=${e.task_no}`
    onCloseActivity(endPoint).then((response) =>{
      setFormValueFinal({...formValueFinal, taskNo: e.task_no, commodity:response?.commodity, quantity:response?.quantityin_mt})
      
      const vehicleTypes = Array.from(
        new Set(
          response.data
            .flatMap((item: any) => item.vehicles.map((items: any) => items.vehicle_type))
        )
      );
      
      const data:any = []
      
      response.data.forEach((item: any, index: number) => {
        const total_qty = index === 0
          ? response.quantityin_mt
          : (data?.[index - 1]?.quantity_left || 0);
      
        const quantity_left = total_qty - item.quantity_lifted;
      
        const result:ResultItem = {
          name:item?.name,
          day: item.sub_task_starting_time,
          quantity_lifted: item.quantity_lifted,
          quantity_left: quantity_left >= 0 ? quantity_left : 0,
          total_qty: total_qty,
        };
      
        vehicleTypes.forEach((key: any) => {
          const vehicle = item.vehicles?.find((data: any) => data.vehicle_type === key);
          result[key] = vehicle ? vehicle.total_no_of_vehicles : 0;
        });
      
         data.push(result);
      });
      
      const customColums = vehicleTypes?.map((item:any)=>({
        title: item,
        dataIndex: item,
        key: item
      }))
      const columns = [ ...taskProgressColumns.slice(0,2), ...customColums, ...taskProgressColumns.slice(2)];
      setColumsData([...columns])
      setloading(false)
      setTableData(data)

    })
    navigate(`/view-task-progress?id=${e.task_no}`);
  };

  console.log(tableData,"abc")

  const backButtonHandler=()=>{
    navigate(-1)
  }
  

  return (
    <div className={styles.task_progress}>
      {term ? (
        <div>
          <Spin loading={loading} />
          <TwoFormWrapper
            formValue={formValueFinal}
            dynamicLayout={true}
            formData={disableAllFieldsHandler(formDataFinal)}
          />
          <div className={styles.progressTable}>
             <Table dataSource={tableData} column={columnsData} />
          </div>
          <div className={styles.backButton}>
            <Button type='primary' className={styles.bckbtn} onClick={backButtonHandler}>Back</Button>
          </div>
        </div>
      ) : (
        <FormWrapper
          formValue={formValueInitial}
          dynamicLayout={true}
          formData={formDataInitial}
          handleFinish={handleFinishInitial}
          onhideCancelButton={true}
          submitButtonLabel="Show Report"
        />
      )}
    </div>
  );
};

export default Create;
