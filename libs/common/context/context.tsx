//@ts-nocheck
import React, { useState } from 'react';
import handleExport from '../ui/ExportToExcel/ExportToExcel';

export const Context = React.createContext();

const Provider = (props) => {
  const [exportXl, setExport] = useState(false);
  const [enButton, setdisButton] = useState(false);

  const handleexport = (d: any) => {
    handleExport(d);
    setExport(false);
  };
  return (
    <Context.Provider
      value={{
        exportXl,
        enButton,
        updateExport: (e) => setExport(e),
        exportData: (e) => handleexport(e),
        updateDisbutton: (e) => setdisButton(e),
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
