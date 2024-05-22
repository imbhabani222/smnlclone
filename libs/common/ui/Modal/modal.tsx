import React, { Children, FC } from 'react';
import { Modal } from 'antd';
import styles from './modal.module.scss';

import { createPortal } from 'react-dom';

interface ModalFieldProps {
  isModalOpen?: boolean;
  showModal?: () => void;
  handleOk?: () => void;
  handleCancel: () => void;
  children?: any;
  title?: String;
  width?: any;
  footer?: any;
}

const ModalField: FC<ModalFieldProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  title,
  width,
  footer,
}: ModalFieldProps) => {
  const modalCheckElement: any = document.querySelector('#modalcheck');
  return (
    <>
      {createPortal(
        <Modal
          title={title}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={width || 'auto'}
          footer
        >
          {children}
        </Modal>,
        modalCheckElement
      )}
    </>
  );
};

export default ModalField;
