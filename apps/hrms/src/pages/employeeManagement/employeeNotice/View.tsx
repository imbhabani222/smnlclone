import React, { useEffect, useState } from 'react';
import {
  getDocTypes,
  getTableData,
  updateRecord,
  createRecord,
} from '../../../../../../libs/common/api/doctype';
import Table from '../../../../../../libs/common/ui/Table/SmnlTable';
import Spin from '../../../../../../libs/common/ui/Loader/spinLoader';
import EmployeeNoticeForm from '../../payrollProcessing/helper/payrollForm';
import moment from 'moment';
import { columns } from './employee_notice_helper';
import jsPDF from 'jspdf';
import Styles from './notice-letter.module.scss';
import { useNavigate } from 'react-router-dom';

type Props = {};
const formData = [
  {
    label: 'Employee Code',
    name: 'employee_code',
    datatype: 'TableSelect',
    isReq: true,
    description: {
      showActive: 'true',
      linkfield: 'full_name',
      modulename: 'employee_management',
      colSpan: '12',
      appname: 'htssuite',
      search: 'employee_management.doctype.personal_details.api.search_personal_details?search='
    },
    searchIndexes: [
    ],
    columns: [
      {
        title: 'Employee Code',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Employee Name',
        dataIndex: 'full_name',
        key: 'full_name',
      },
    ],
    options: 'Personal Details',
    hidden: 0,
       
  },
  {
    label: 'Absent Date',
    name: 'absent_date',
    datatype: 'Date',
    isReq: false,
    description: {},
    options: 'past',
    hidden: 0,
    readonly: false,
  },
];
const View = (props: Props) => {
  const navigate = useNavigate();
  const [data, setdata] = useState<any>([]);
  const [loading, setloading] = useState(false);
  const [formValues, setformValues] = useState<any>({});
  const [selectedRecord, setselectedRecord] = useState<any>({});
  const [selectedLetter, setSelectedLetter] = useState<any>(null);
  // useEffect(() => {
  //   setloading(true);
  //   getDocTypes('Employee Notice Letter', false, 'htssuite').then((items) => {
  //     setcolumns(items);
  //   });

  // }, []);

  const onHandleChange = (val: any, name: any) => {
    setformValues({ ...formValues, [name]: val });
  };
  const onSubmit = (values: any) => {
    setloading(true)
    const payload = {
      ...values,
      absent_date: moment(values?.absent_date?.$d).format('YYYY-MM-DD'),
    };
    getTableData(
      'employee_notice_letter',
      'employee_management',
      'htssuite',
      JSON.stringify(payload)
    ).then((items) => {
      setdata(items);
      setloading(false);

      // setdata(items);
    });
  };

  const onTableChange = (value: any, rowName: any) => {
    let id: any = undefined;
    if (rowName === 'first_letter') {
      id = '#first_letter';
    } else if (rowName === 'second_letter') {
      id = '#second_letter';
    } else {
      id = '#third_letter';
    }

    const rep = new jsPDF('p', 'pt', 'a4');
    rep.html(document.querySelector(id), {
      callback: function (pdf) {
        pdf.save('Notice Letter.pdf');
      },
    });

    if (rowName !== 'first_letter') {
      const updatePayload = {
        doc_id: data?.[0]?.name,
        data: {
          second_letter_date: moment().format('YYYY-MM-DD'),
        },
      };
      updateRecord(
        'employee_notice_letter',
        updatePayload,
        'employee_management',
        'htssuite'
      ).then((items: any) => {
        onSubmit(formValues);

      });
    } else {
      const payload = {
        ...data?.[0],
        first_letter_date: moment().format('YYYY-MM-DD'),
      };
      createRecord(
        'employee_notice_letter',
        payload,
        'employee_management',
        'htssuite'
      ).then((items: any) => {
        onSubmit(formValues);
      });
    }
  };
  return (
    <div>
      <Spin loading={loading} />
      <EmployeeNoticeForm 
        handleSubmit={onSubmit}
        payrollFormData={formData}
        handleChange={onHandleChange}
        formvalue={formValues}
        btnname="Process Now"
        disabled={formValues?.employee_code?formValues?.absent_date?false:true:true}
      />
      <Table 
      column={columns(onTableChange)} 
      dataSource={data}
      editUrl  = "/edit-notice-letter"
       />
      <div id="firs" style={{ visibility: 'hidden', height: 0 }}>
        <div className={Styles.notice_letter} id="first_letter">
          <p className={Styles.date}>
            <strong>Date:</strong> {moment().format('DD/MM/YYYY')}
          </p>
          <p className={Styles.address}>
            <strong>To :</strong>
          </p>
          <p className={Styles.address}>{data?.[0]?.employee_name}</p>
          <p className={Styles.address}>{data?.[0]?.village}</p>
          <p className={Styles.address}>{data?.[0]?.post_office}</p>
          <p className={Styles.address}>{data?.[0]?.district}</p>
          <p className={Styles.address}>
            {data?.[0]?.state}, Pin- {data?.[0]?.pin}.
          </p>
          <p className={Styles.address}>Call:{data?.[0]?.mobile} </p>
          <br />
          <br />
          <p className={Styles.subject}>
            <strong className={Styles.highlight}>Sub :</strong>
            Un-authorized absence Show cause notice – reg.
          </p>

          <p className={Styles.address}>Dear Mr. {data?.[0]?.employee_name},</p>
          <p className={Styles.content}>
            Upon verification of your attendance records, it is found that have
            absented yourself from <br />
            {moment(data?.[0]?.absent_date).format('DD/MM/YYYY')} to till today.
            You have neither obtained prior permission nor sent any intimation.
          </p>
          <p className={Styles.content}>
            Please note that as per the general terms and conditions of your
            employment, your service is
            <br /> liable to be terminated on remaining absent from work for
            more than
            <br />
            seven consecutive days without intimation.
          </p>
          <p className={Styles.content}>
            You are hereby instructed to immediately report to the undersigned
            within 24 hours
            <br />
            of receipt of this letter with a suitable reply in writing as to why
            no disciplinary proceedings
            <br />
            may be conducted against you, otherwise the management would be
            forced to think that
            <br />
            you are not interested in continuing your services with the company
            and would be free to take
            <br />
            necessary disciplinary action against you.
          </p>
          <br />
          <br />
          <p className={Styles.content}>
            For Shree Marutinandan Logistics Pvt Ltd,
          </p>
          <br />
          <br />
          <p className={Styles.content}>Authorized Signatory</p>
        </div>
      </div>
      <div style={{ visibility: 'hidden', height: 0 }}>
        <div id="second_letter" className={Styles.notice_letter}>
          <p className={Styles.date}>
            <strong>Date :</strong> {moment().format('DD/MM/YYYY')}
          </p>
          <p className={Styles.address}>
            <strong>To :</strong>
          </p>
          <p className={Styles.address}>{data?.[0]?.employee_name}</p>
          <p className={Styles.address}>{data?.[0]?.village}</p>
          <p className={Styles.address}>{data?.[0]?.post_office}</p>
          <p className={Styles.address}>{data?.[0]?.district}</p>
          <p className={Styles.address}>
            {data?.[0]?.state}, Pin- {data?.[0]?.pin}.
          </p>
          <p className={Styles.address}>Call:{data?.[0]?.mobile} </p>
          <br />
          <p className={Styles.subject}>
            <strong className={Styles.highlight}>Sub :</strong> Un-authorized
            absence – 2nd Show Cause notice - Reg.
          </p>
          <p className={Styles.subject}>
            <strong className={Styles.highlight}>Ref :</strong> Our Letter dated{' '}
            {moment(data?.[0]?.first_letter_date || new Date()).format(
              'Do MMM, YYYY'
            )}
          </p>

          <br />
          <p className={Styles.content}>Dear Mr. {data?.[0]?.employee_name},</p>
          <p className={Styles.content}>
            With reference to our letter dated{' '}
            {moment(data?.[0]?.first_letter_date || new Date()).format(
              'DD/MM/YYYY'
            )}
            , you have not reported for duty nor submitted <br />
            any explanation in writing and as such your act of absenting without
            intimation is a serious
            <br />
            misconduct which attracts appropriate disciplinary action including
            termination of service.
          </p>
          <p className={Styles.content}>
            Therefore, you are hereby given one more opportunity and accordingly
            you are advised to <br /> report immediately or reply to this letter
            in writing to the undersigned within 24 hrs. <br />
            of receipt of this letter as to why not any disciplinary proceedings
            may be initiated against you, <br />
            otherwise the management would finally conclude that you have no
            explanation to offer <br />
            and you are not interested to work and stopped coming for duty at
            your own volition and <br /> accordingly your services are liable to
            be terminated herewith.
          </p>
          <br />
          <br />
          <p className={Styles.content}>
            For Shree Marutinandan Logistics Pvt Ltd,
          </p>
          <br />
          <br />
          <p className={Styles.content}>Authorized Signatory</p>
        </div>
      </div>
      <div id="third" style={{ visibility: 'hidden', height: 0 }}>
        <div id="third_letter" className={Styles.notice_letter}>
          <p className={Styles.date}>Date: {moment().format('DD/MM/YYYY')}</p>

          <p className={Styles.address}>To</p>
          <p className={Styles.address}>Mr. {data?.[0]?.employee_name} </p>
          <p className={Styles.address}>{data?.[0]?.village}</p>
          <p className={Styles.address}>{data?.[0]?.post_office}</p>
          <p className={Styles.address}>{data?.[0]?.district}</p>
          <p className={Styles.address}>
            {data?.[0]?.state}, Pin- {data?.[0]?.pin}.
          </p>
          <p className={Styles.address}>Call:{data?.[0]?.mobile} </p>
          <br />
          <p className={Styles.subject}>Sub : Termination of your services.</p>
          <p className={Styles.subject}>
            Ref : 1) Our Letter dated {moment(data?.[0]?.first_letter_date).format("Do MMM, YYYY")}
          </p>
          <p className={Styles.subject} style={{ marginLeft: '40px' }}>
            {' '}
            2) Our Letter dated {moment(data?.[0]?.second_letter_date).format('Do MMM, YYYY')}
          </p>
          <br />
          <p className={Styles.content}>Dear Mr. {data?.[0]?.employee_name},</p>

          <p className={Styles.content}>
            It has been observed from your attendance records that you have been
            absenting yourself <br />
            from duties from{' '}
            {moment(data?.[0]?.absent_date).format('DD/MM/YYYY')} to{' '}
            {moment().format('DD/MM/YYYY')}. As per the general conditions of
            your <br /> employment, your service is liable to be terminated on
            remaining absent from work for <br /> more than seven consecutive
            days without information.
          </p>

          <p className={Styles.content}>
            We regret to inform you that despite repeated issuance of show-cause
            notices and reminders
            <br />
            to attend the job, you have failed to reply or attend the job.
          </p>

          <p className={Styles.content}>
            Hence, your services are terminated forthwith, and you are advised
            to meet <br /> the HR department for full and final settlement.
          </p>
          <br />
          <br />
          <p className={Styles.content}>
            For Shree Marutinandan Logistics Pvt Ltd,
          </p>
          <br />
          <br />
          <p className={Styles.content}>Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
};

export default View;
