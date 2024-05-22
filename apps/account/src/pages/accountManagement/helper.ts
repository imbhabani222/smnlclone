import { isSuccess } from '../../../../../libs/common/ui/Message';
import {
  getRecordById,
  getTableData,
} from '../../../../../libs/common/api/doctype';

export const ledgerColumn: any = [
  {
    title: 'Ledger  Code',
    dataIndex: 'ledger_code',
    key: 'ledger_code',
  },
  {
    title: 'Ledger Name',
    dataIndex: 'ledger_name',
    key: 'ledger_name',
  },
  {
    title: 'Group Name',
    dataIndex: 'group_name',
    key: 'group_name',
  },
  {
    title: 'Address',
    dataIndex: 'address1',
    key: 'address1',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
  },
];
export const ledgerColumntype1: any = [
  {
    title: 'Ledger  Code',
    dataIndex: 'ledger_code',
    key: 'ledger_code',
  },
  {
    title: 'Ledger Name',
    dataIndex: 'ledger_name',
    key: 'ledger_name',
  },
  {
    title: 'Group Name',
    dataIndex: 'group_name',
    key: 'group_name',
  },
];
export const ledgerSearchIndexex = ['ledger_code', 'ledger_name', 'group_name'];
export const supplierColumn: any = [
  {
    title: 'Supplier Name',
    dataIndex: 'supplier_name',
    key: 'supplier_name',
  },
  {
    title: 'Ledger Group Name',
    dataIndex: 'ledger_group_name',
    key: 'ledger_group_name',
  },
  {
    title: 'Firm Type',
    dataIndex: 'firm_type',
    key: 'firm_type',
  },
];
export const supplierSearchIndex = [
  'supplier_name',
  'ledger_group_name',
  'firm_type',
];
export const getTotalAmountfromProductsAdded = (products: any = []) => {
  const totalAmount = products.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + parseFloat(currentValue?.net || 0),
    0
  );
  return totalAmount;
};
export const getTotalAmount = (products: any) => {
  //product=[]
  const productAmounts = products?.map((item: any) => item.products);

  const totalAmount = productAmounts.reduce(
    (accumulator: any, currentAmount: any) => {
      if (Array.isArray(currentAmount)) {
        const productAmount = currentAmount.reduce(
          (productAccumulator, product) => {
            const amountValue = parseFloat(product.net);

            if (!isNaN(amountValue)) {
              return productAccumulator + amountValue;
            }

            return productAccumulator;
          },
          0
        );
        return accumulator + productAmount;
      }

      const amountValue = parseFloat(currentAmount?.net);

      if (!isNaN(amountValue)) {
        return accumulator + amountValue;
      }

      return accumulator;
    },
    0
  );
  return totalAmount;
};

export const getNetCalculation = async (
  gross: any = 0,
  tdsid: any = 0,
  tcs: any = 0,
  addition: any = 0
) => {
  let tds: any = 0;
  if (tdsid) {
    tds = await getRecordById(
      'inventory_tds_master',
      { name: tdsid },
      'inventory_account_configuration',
      'htsaccount'
    ).then((res: any) => {
      return res?.tds_value;
    });
  }
  let netValue = gross,
    roundOffValue: any = '0.0',
    tdsValue = (parseFloat(gross || 0) * parseFloat(tds || 0)) / 100,
    tcsValue = (parseFloat(gross || 0) * parseFloat(tcs || 0)) / 100;
  netValue = (parseFloat(gross || 0) + tcsValue - tdsValue).toFixed(2);
  if (addition) {
    netValue = parseFloat(netValue) + parseFloat(addition);
  }
  const val = netValue.toString().split('.');
  if (val[1]) {
    roundOffValue = `0.${val[1]}`;
  }
  return { netValue: Math.round(netValue), roundOffValue };
};
export const CheckDuplicateData = (item: any, data: any) => {
  const found = data.find((element: any) => {
    if (
      element?.products === item?.products ||
      element?.products?.name === item?.name ||
      element?.products?.products === item?.products?.products ||
      element?.products?.products === item?.products
    ) {
      if (element?.products?.name === item?.products?.name) {
        return true;
      }
      return false;
    }
  });
  if (found) {
    isSuccess('Duplicate Data Not Allowed', 'error');
    return null;
  }
  return item;
};

export const CheckProductQuantity = (item: any) => {
  if (item?.qty == 0) {
    isSuccess('Quantity must be greater than 0', 'error');
    return null;
  }
  return item;
};

export const checkLedgerTableDataValidations = (
  mainValues: any,
  detailsValues: any,
  tableData: any,
  closingBalanceKey: any,
  ledgerKeys: any,
  closingBalanceKey2?: any,
  ledgerGroups?: any
) => {
  const twoFormsValue = { ...mainValues, ...detailsValues };
  if (closingBalanceKey) {
    if (twoFormsValue?.amount > twoFormsValue?.[closingBalanceKey]) {
      isSuccess(
        `Amount should not be greater than ${ledgerKeys?.name2} closing balance `,
        'error'
      );
      return false;
    }
  }
  if (closingBalanceKey2) {
    if (twoFormsValue?.amount > twoFormsValue?.[closingBalanceKey2]) {
      isSuccess(
        `Amount should not be greater than ${ledgerKeys?.name1} closing balance `,
        'error'
      );
      return false;
    }
  }
  if (
    twoFormsValue[`${ledgerKeys?.key1}`] &&
    twoFormsValue[`${ledgerKeys?.key2}`] &&
    twoFormsValue[`${ledgerKeys?.key1}`]?.name ===
      twoFormsValue[`${ledgerKeys?.key2}`]?.name
  ) {
    isSuccess(
      `${ledgerKeys?.name1} and ${ledgerKeys?.name2} should not be same`,
      'error'
    );
    return false;
  }

  if (ledgerGroups?.group1 && ledgerGroups?.group2) {
    if (ledgerGroups?.group1?.name === ledgerGroups?.group2?.name) {
      isSuccess(
        `${ledgerKeys?.name1} and ${ledgerKeys?.name2} belongs to same ledger group - ${ledgerGroups?.group2?.group_name}`,
        'error'
      );
      return false;
    }
  }

  return true;
};

export const checkLedgerTableDataValidationsVoucher = (
  mainValues: any,
  detailsValues: any,
  tableData: any,
  closingBalanceKey: any,
  ledgerKeys: any,
  closingBalanceKey2?: any,
  ledgerGroups?: any
) => {
  const twoFormsValue = { ...mainValues, ...detailsValues };
  console.log(ledgerGroups,"abcc")
  if (
    twoFormsValue[`${ledgerKeys?.key1}`] &&
    twoFormsValue[`${ledgerKeys?.key2}`] &&
    twoFormsValue[`${ledgerKeys?.key1}`]?.name ===
      twoFormsValue[`${ledgerKeys?.key2}`]?.name
  ) {
    isSuccess(
      `${ledgerKeys?.name1} and ${ledgerKeys?.name2} should not be same`,
      'error'
    );
    return false;
  }

  if (ledgerGroups?.group1 && ledgerGroups?.group2) {
    if(ledgerGroups?.group1?.name && ledgerGroups?.group2?.name){
      if (ledgerGroups?.group1?.name === ledgerGroups?.group2?.name) {
        isSuccess(
          `${ledgerKeys?.name1} and ${ledgerKeys?.name2} belongs to same ledger group - ${ledgerGroups?.group1}`,
          'error'
        );
        return false;
      }
    }else{
      if (ledgerGroups?.group1 === ledgerGroups?.group2) {
        isSuccess(
          `${ledgerKeys?.name1} and ${ledgerKeys?.name2} belongs to same ledger group - ${ledgerGroups?.group1}`,
          'error'
        );
        return false;
      }
    }
    
  }

  return true;
};

export const checkLedgerTableDataValidationsOne = (
  mainValues: any,
  detailsValues: any,
  tableData: any,
  closingBalanceKey: any,
  ledgerKeys: any,
  closingBalanceKey2?: any,
  ledgerGroups?: any
) => {
  const twoFormsValue = { ...mainValues, ...detailsValues };
  
  if (
    twoFormsValue[`${ledgerKeys?.key1}`] &&
    twoFormsValue[`${ledgerKeys?.key2}`] &&
    twoFormsValue[`${ledgerKeys?.key1}`]?.name ===
      twoFormsValue[`${ledgerKeys?.key2}`]?.name
  ) {
    isSuccess(
      `${ledgerKeys?.name1} and ${ledgerKeys?.name2} should not be same`,
      'error'
    );
    return false;
  }

  

  return true;
};

export const colsing_balance_remove_dr_cr = (amount:any) => {
  if(amount && amount.includes){
    if(amount.includes(' cr')){
      return `-${amount.replace(' cr', '')}`
     }
     else{
      return amount.replace(' dr', '')
     }
  }

}

export const colsing_balance_add_dr_cr = (amount:any) => {
  if(Number(amount) <= 0) {
    return `${Math.abs(amount)} cr`
  }
  else {
    return `${amount} dr`
  }
 }
 