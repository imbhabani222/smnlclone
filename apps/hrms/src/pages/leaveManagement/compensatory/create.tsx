import React, { useEffect, useState } from 'react';
import { Row, Col, Modal } from 'antd';
import dayjs from 'dayjs';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import { Panel } from '../../../../../../libs/common/ui/Panel/Panel';
import styles from '../leave.module.scss';
import FormWrapper from '../../../../../../libs/common/ui/Form/FormWrapper';
import { fromDBFields, easyTimeProFields } from '../helper/helper';
import { uploadExcel, getFields, createRecord, getRecordsById, updateRecord, getAgainstDate } from '../../../../../../libs/common/api/doctype';
import { isSuccess } from '../../../../../../libs/common/ui/Message';
import moment from 'moment';
import { dateFormat, datetoFrom, employeeSelectDropDown, } from '../../../../../../libs/common/utils/common';
import handleExport from "../../../../../../libs/common/ui/ExportToExcel/ExportToExcel"



const CreateCompensatory = () => {
    const [formDatas, setFormData] = useState<any>([]);
    const [formValue, setformValues] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [base64Data, setBase64Data] = useState<any>();
    const [seconds, setSeconds] = useState<any>();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');


    const navigate = useNavigate();
    const { confirm } = Modal;

    

    useEffect(() => {
        setLoading(true)
        getFields('Compensatory Off', 'htssuite').then((items: any) => {
            const fields: any = [...items]
            const updatedFields = fields?.map((item: any) => {
                if (item.name === 'employee_name') {
                    return employeeSelectDropDown(item)
                }
                if (item.name === "application_date") {
                    return {
                        ...item,
                        disabled: true
                    }
                }
                
                return item
            })            
            setFormData(updatedFields)
            setLoading(false)
            if (id) {
                const updatedFileds = fields?.map((item: any) => {
                    if (item?.name === 'employee_name') {
                        return {
                            ...item,
                            disabled: true

                        }

                    }
                    return { ...item }
                })
                setFormData(updatedFileds)

            }
        })
        if (id) {
            setLoading(true)
            const data = {
                name: id
            }
            getRecordsById(
                'compensatory_off',
                data,
                'leave_management',
                'htssuite'
            ).then((items: any) => {
                const data = {
                    ...items,
                    against_date: datetoFrom(items?.against_date),
                    application_date: datetoFrom(items?.application_date)
                }
                setformValues(data)
                setLoading(false)
            })
        }
    }, []);


   
 


  

    const handleFinish = (values: any) => {
        setLoading(true)
        if (id) {
            const payload = {
                name: id,
                data: {
                    ...values,
                    against_date: dateFormat(values?.against_date),
                    application_date: dateFormat(values?.application_date)
                }
            }
            updateRecord('compensatory_off', payload, 'leave_management', 'htssuite')
                .then((items: any) => {
                    if (items?.status === 200) {
                        isSuccess(items?.message, 'success')
                        setLoading(false)
                        navigate('/view-compensatory-off')
                    } else {
                        isSuccess(items?.message, 'error')
                        setLoading(false)
                    }
                })
        } else {
            const payload = {
                ...values,
                against_date: dateFormat(values?.against_date),
                application_date: dateFormat(values?.application_date)
            }

            createRecord('compensatory_off', payload, 'leave_management', 'htssuite')
                .then((items: any) => {
                    if (items?.status === 200) {
                        isSuccess(items?.message, 'success')
                        setLoading(false)
                        navigate('/view-compensatory-off')
                    } else {
                        isSuccess(items?.message, 'error')
                        setLoading(false)
                    }
                })
        }
    };




    const handleFormChange = (val: any, key: any) => {
        setformValues({ ...formValue, [key]: val });
        console.log(key,val,"baldhdh");
        
        if (key === "employee_name" && val) {
            const data = {emp_code : val}
            getAgainstDate('compensatory_off',data,'leave_management',"htssuite")
            .then((items:any)=>{
            const againstDate = items?.data?.message?.data 
            if (againstDate && againstDate?.length > 0) {
                let newAgainstDate =  againstDate?.map((date:any)=>({label:date,value:date}))             
            const newFields :any = [...formDatas]
    const newformDatas = newFields.map((item:any)=>{
        if (item.name === "against_date") {
          item.options = newAgainstDate
        } 
        return item           
      });
      setFormData(newformDatas);  
            }else{
                isSuccess("not able to apply compensatory off","error")
            }
                   
            })    
        }
        if (key === 'against_date') {
            setFormData((pre: any) => {
                return pre?.map((item: any) => {
                    if (val) {
                        if (item?.name === 'application_date') {
                            const currentDate = new Date().getDate();
                            if (currentDate >= 25) {
                                return {
                                    ...item,
                                    disabled: false,
                                    options: {
                                        type: 'enable_only_two_custom_date',
                                        startDate: moment().date(26).format('YYYY-MM-DD'),
                                        endDate: moment().add(1,'months').date(25).format('YYYY-MM-DD')
    
                                    }
                                }
                            } else {
                                return {
                                    ...item,
                                    disabled: false,
                                    options: {
                                        type: 'enable_only_two_custom_date',
                                        startDate: moment().subtract(1, 'months').date(26).format('YYYY-MM-DD'),
                                        endDate: moment().date(25).format('YYYY-MM-DD')
    
                                    }
                                }
                            }
                           
                        } else {
                            return item
                        }
                    } else if (item?.name === 'application_date') {
                        return {
                            ...item,
                            disabled: true,
                        }
                    } else {
                        return item
                    }

                })
            })
            if (!val) {
                setformValues({
                    ...val,
                    application_date: null
                })
            }
        }
    };
    

    const onHandleImageUpload = (file: any) => {
        setBase64Data(file?.file);
    };





    return (
        <React.Fragment>
            <Row className={styles.subHeader_row}>
                <Col xs={24} sm={24} md={24} lg={16} xl={16} className={styles.title}>
                    Create Compensatory Off
                </Col>
            </Row>
            <Spin loading={loading} />
            <Panel>
                <div className={styles.panel_container}>
                    <FormWrapper
                        formData={formDatas}
                        formValue={formValue}
                        handleFinish={handleFinish}
                        dynamicLayout
                        onChange={handleFormChange}
                        // handleImageUpload={onHandleImageUpload}
                        appname='htssuite'
                    // markasComplete={formValue?.attendanceThrough === "easyTimePro"}
                    // markasCompleteButtonLabel={"Download Excel"}
                    />
                </div>

            </Panel>
        </React.Fragment>
    );
};
export default CreateCompensatory;
