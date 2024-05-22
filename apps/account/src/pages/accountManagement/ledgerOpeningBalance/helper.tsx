export const commonfields: any = [
    'financial_year',
    'ledger_name',
   
    // 'account_name',
    'closing_balance',
    'opening_type',
    // 'active',
  ];

  export const replaceClosingBalanceWithOpening=(data:any) =>{
    return data.map((item:any) => {
      if (item.label === 'Closing Balance') {
        return { ...item, label: 'Opening Balance' };
      }
      return item;
    });
  }