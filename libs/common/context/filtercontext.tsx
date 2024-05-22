//@ts-nocheck
import React, { useState } from 'react';

export const FilterContext = React.createContext();

const Provider = (props) => {
  const [filter, setFilter] = useState(false);
  // const [openFilter, setopenFilter] = useState(false);

  // const handleexport = (d: any) => {
  //   handleExport(d);
  //   setExport(false);
  // };
  return (
    <FilterContext.Provider
      value={{
        filter,
        // openFilter,
        updateFilter: (e: any) => setFilter(e),
        // exportData: (e) => handleexport(e),
        // updateDisbutton: (e) => setdisButton(e),
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default Provider;
