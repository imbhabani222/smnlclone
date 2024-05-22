import React, { useRef } from 'react';
import { Button } from 'antd';
import ReactToPrint from 'react-to-print';
import styles from "./PrintPreview.module.scss";

interface PrintPreviewProps {
  contentToPrint: React.ReactElement;
  buttonText: string;
  // Allow passing additional Button props
  // buttonProps?: ButtonProps; 
}

const PrintPreview: React.FC<PrintPreviewProps> = ({ contentToPrint,buttonText}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <ReactToPrint
        trigger={() => <Button className={styles.print_btn}>{buttonText}</Button>}
        content={() => componentRef.current}
      />
      <div className={styles.print_preview}>
        <div ref={componentRef}>{contentToPrint}</div>
      </div>
    </div>
  );
};

export default PrintPreview;
