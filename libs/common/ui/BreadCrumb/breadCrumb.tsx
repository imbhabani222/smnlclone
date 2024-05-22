import React ,{FC} from 'react';
import { Breadcrumb } from 'antd';
import styles from './breadcrumb.module.scss';

interface BreadCrumbProps {
  items: string[];
}

const BreadCrumbField: FC<BreadCrumbProps> = ({ items }: BreadCrumbProps) => (
  
  <>
 

  <Breadcrumb>
 {
  items?.map((item,index) => (
    <Breadcrumb.Item 
    key={index}><span className='breadcrumb_items'>{item}</span>
    </Breadcrumb.Item>
  ))
 }
 
  
  </Breadcrumb>
 
  </>
);

BreadCrumbField.defaultProps = {
  items:[]
}

export default BreadCrumbField;