const getVoucherType = (name: any) => {
  if (name.includes('CPVR')) {
    return 'Cash Reciept';
  } else if (name.includes('CPV')) {
    return 'Cash Payment';
  } else if (name.includes('BRV')) {
    return 'Bank Receipt';
  } else if (name.includes('BPV')) {
    return 'Bank Payment';
  } else if (name.includes('JV')) {
    return 'Journal Voucher';
  } else if (name.includes('CV')) {
    return 'Contra  Voucher';
  } else if (name.includes('CNV')) {
    return 'Credit Note Voucher';
  } else if (name.includes('DNV')) {
    return 'Debit Note Voucher';
  } else if (name.includes('CN')) {
    return 'Credit Note(GST)';
  } else if (name.includes('DN')) {
    return 'Debit Note(GST)';
  } else if (name?.includes('SEI')) {
    return 'Service Expense Invoice';
  } else if (name?.includes('PIN')) {
    return 'Purchase Invoice';
  }
};

const getCreditAmt = (item: any, pageTitle: any, details: any) => {
  if (pageTitle == 'Cash Book' || pageTitle === 'Day Book') {
    if (
      item?.name.includes('CPV/') ||
      item?.name.includes('CNV') ||
      item?.name.includes('CN/')
    ) {
      return details?.amount;
    } else if (item?.name.includes('CV')) {
      return details?.credit_ledger_ac?.credit_ledger_ac == 'Cash'
        ? details?.amount
        : 0;
    } else if (item?.name.includes('JV')) {
      return details?.amount || 0;
    }
  } else if (pageTitle == 'Bank Book') {
    if (item?.name.includes('BPV')) {
      return details?.amount;
    } else if (item?.name.includes('CV')) {
      return details?.credit_ledger_ac?.credit_ledger_ac == 'Cash'
        ? details?.amount
        : 0;
    }
  } else if (pageTitle == 'Credit Note Register') {
    return details?.amount || item?.details?.amount;
  } else if (pageTitle == 'Debit Note Register') {
    return details?.amount;
  } else if (pageTitle === 'Ledger Account') {
    if (
      item?.name.includes('CNV') ||
      item?.name.includes('CN/') ||
      item?.name.includes('PIN') ||
      item?.name.includes('SEI') ||
      item?.name.includes('CPVR') ||
      item?.name.includes('BRV')
    ) {
      return details?.amount;
    } else if (item?.name.includes('CV')) {
      return details?.credit_ledger_ac?.credit_ledger_ac == 'Cash'
        ? details?.amount
        : 0;
    }
  }

  if (pageTitle == 'Day Book') {
    if (item?.name.includes('BPV')) {
      return details?.amount;
    }
  }
};

const getDebitAmt = (item: any, pageTitle: any, details: any) => {
  if (pageTitle == 'Cash Book' || pageTitle == 'Day Book') {
    if (item?.name.includes('CPVR')) {
      return details?.amount || 0;
    } else if (item?.name.includes('CV')) {
      return details?.debit_ac_ledger?.debit_ac_ledger == 'Cash'
        ? details?.amount || 0
        : 0;
    } else if (item?.name.includes('DN/')) {
      return details?.amount || 0;
    } else if (item?.name.includes('JV')) {
      return details?.amount || 0;
    }
  }

  if (
    pageTitle == 'Bank Book' ||
    pageTitle == 'Day Book' ||
    pageTitle == 'Credit Note Register'
  ) {
    if (
      item?.name.includes('BRV') ||
      item?.name?.includes('SEI') ||
      item?.name.includes('DNV')
    ) {
      return details?.amount || 0;
    } else if (item?.name.includes('CV')) {
      return details?.debit_ac_ledger?.debit_ac_ledger == 'Cash'
        ? details?.amount || 0
        : 0;
    } else if (item?.name.includes('BPV')) {
      return 0;
    }
  }
  if (pageTitle == 'Credit Note Register') {
    return details?.amount || item?.details?.amount;
  }
  if (pageTitle == 'Debit Note Register') {
    return details?.amount;
  }
  if (pageTitle == 'Ledger Account') {
    if (
      item?.name.includes('DNV') ||
      item?.name.includes('JV') ||
      item?.name.includes('CPV/') ||
      item?.name.includes('BPV') ||
      item?.name.includes('DN/')
    ) {
      return details?.amount;
    } else if (item?.name.includes('CV')) {
      return details?.debit_ac_ledger?.debit_ac_ledger == 'Cash'
        ? details?.amount
        : 0;
    }
  }
};

const getParticular = (
  item: any,
  pageTitle: any,
  details: any,
  selectedLedger: any
) => {
  if (pageTitle == 'Cash Book') {
    if (item?.name.includes('CPVR')) {
      return item?.cash_ac_ledger?.cash_ac_ledger == 'Cash'
        ? details?.ledger_ac?.ledger_ac
        : details?.ledger_ac?.name == 'Cash'
        ? item?.cash_ac_ledger?.cash_ac_ledger
        : '';
    }

    if (item?.name.includes('CPV/')) {
      return item?.cash_ac_ledger_credit?.cash_ac_ledger_credit == 'Cash'
        ? details?.debit_ledger_ac?.debit_ledger_ac
        : details?.debit_ledger_ac?.debit_ledger_ac == 'Cash'
        ? item?.cash_ac_ledger_credit?.cash_ac_ledger_credit
        : '';
    }

    if (item?.name.includes('CV')) {
      return details?.credit_ledger_ac?.credit_ledger_ac == 'Cash'
        ? details?.debit_ac_ledger?.debit_ac_ledger
        : details?.debit_ac_ledger?.debit_ac_ledger == 'Cash'
        ? details?.credit_ledger_ac?.credit_ledger_ac
        : '';
    }
  } else if (pageTitle == 'Bank Book') {
    if (item?.name.includes('CV')) {
      return details?.credit_ledger_ac.name === selectedLedger
        ? details?.debit_ac_ledger?.debit_ac_ledger
        : details?.debit_ac_ledger?.name === selectedLedger
        ? details?.credit_ledger_ac?.credit_ledger_ac
        : '';
    }

    if (item?.name.includes('BPV')) {
      return item?.bank_ac_ledger_credit?.name === selectedLedger
        ? details?.debit_ledger_ac?.debit_ledger_ac
        : details?.debit_ledger_ac?.name === selectedLedger
        ? item?.bank_ac_ledger_credit?.bank_ac_ledger_credit
        : '';
    }

    if (item?.name.includes('BRV')) {
      return item?.bank_ac_ledger?.name === selectedLedger
        ? details?.ledger_ac?.ledger_ac
        : details?.ledger_ac?.name === selectedLedger
        ? item?.bank_ac_ledger?.bank_ac_ledger
        : '';
    }
  } else if (pageTitle == 'Ledger Account') {
    if (item?.name.includes('BRV')) {
      return item?.bank_ac_ledger?.name === selectedLedger
        ? details?.ledger_ac?.ledger_ac
        : details?.ledger_ac?.name === selectedLedger
        ? item?.bank_ac_ledger?.bank_ac_ledger
        : '';
    }

    if (item?.name.includes('BPV')) {
      return item?.bank_ac_ledger_credit?.name === selectedLedger
        ? details?.debit_ledger_ac?.debit_ledger_ac
        : details?.debit_ledger_ac?.name === selectedLedger
        ? item?.bank_ac_ledger_credit?.bank_ac_ledger_credit
        : '';
    }

    if (item?.name.includes('JV')) {
      return details?.credit_ledger_ac?.name === selectedLedger
        ? details?.debit_ac_ledger?.debit_ac_ledger
        : details?.debit_ac_ledger?.name === selectedLedger
        ? details?.credit_ledger_ac?.credit_ledger_ac
        : '';
    }

    if (item?.name.includes('DNV')) {
      return details?.credit_ledger_ac?.name === selectedLedger
        ? item?.party_ac_ledger?.party_ac_ledger
        : item?.party_ac_ledger?.name === selectedLedger
        ? details?.credit_ledger_ac?.credit_ledger_ac
        : '';
    }

    if (item?.name.includes('CPVR')) {
      return item?.cash_ac_ledger?.name === selectedLedger
        ? details?.ledger_ac?.ledger_ac
        : details?.ledger_ac?.name === selectedLedger
        ? item?.cash_ac_ledger?.cash_ac_ledger
        : '';
    }

    if (item?.name.includes('CPV/')) {
      return item?.cash_ac_ledger_credit?.name === selectedLedger
        ? details?.debit_ledger_ac?.debit_ledger_ac
        : details?.debit_ledger_ac?.name === selectedLedger
        ? item?.cash_ac_ledger_credit?.cash_ac_ledger_credit
        : '';
    }

    if (item?.name.includes('PIN')) {
      return item?.ledger_ac?.name === selectedLedger
        ? item?.supplier?.supplier
        : item?.supplier?.name === selectedLedger
        ? item?.ledger_ac?.ledger_ac
        : '';
    }

    if (item?.name.includes('SEI')) {
      return item?.ledger_ac?.name === selectedLedger
        ? item?.ledger?.ledger
        : item?.ledger?.name === selectedLedger
        ? item?.ledger_ac?.ledger_ac
        : '';
    }

    if (item?.name.includes('CN/')) {
      return item?.customersupplier?.name === selectedLedger
        ? item?.ledger_ac?.ledger_ac
        : item?.ledger_ac?.name === selectedLedger
        ? item?.customersupplier?.customersupplier
        : '';
    }
    if (item?.name.includes('CNV')) {
      return details?.debit_ledger_ac?.name === selectedLedger
        ? item?.party_ledger?.party_ledger
        : item?.party_ledger?.name === selectedLedger
        ? details?.debit_ledger_ac?.debit_ledger_ac
        : '';
    }

    if (item?.name.includes('DN/')) {
      return item?.customer_supplier?.name === selectedLedger
        ? item?.ledger_ac?.ledger_ac
        : item?.ledger_ac?.name === selectedLedger
        ? item?.customer_supplier?.customer_supplier
        : '';
    }

    if (item?.name.includes('CV')) {
      return details?.credit_ledger_ac?.name === selectedLedger
        ? details?.debit_ac_ledger?.debit_ac_ledger
        : details?.debit_ac_ledger?.name === selectedLedger
        ? details?.credit_ledger_ac?.credit_ledger_ac
        : '';
    }
  }
};

const getBalance = (
  item: any,
  pageTitle: any,
  details: any,
  selectedLedger: any
) => {
  if (pageTitle == 'Cash Book') {
    if (item?.name.includes('CPVR')) {
      return item?.cash_ac_ledger?.cash_ac_ledger == 'Cash'
        ? item?.closing_balance_a
        : details?.ledger_ac?.ledger_ac == 'Cash'
        ? details?.closing_balance_b
        : '';
    }

    if (item?.name.includes('CPV/')) {
      return item?.cash_ac_ledger_credit?.cash_ac_ledger_credit == 'Cash'
        ? item?.closing_balance_a
        : details?.debit_ledger_ac?.debit_ledger_ac == 'Cash'
        ? details?.closing_balance_b
        : '';
    }

    if (item?.name.includes('CV')) {
      return details?.debit_ac_ledger?.name === selectedLedger
        ? details?.closing_balance_a
        : details?.credit_ledger_ac?.name === selectedLedger
        ? details?.closing_balance_b
        : 0;
    }
  }

  if (pageTitle == 'Bank Book') {
    if (item?.name.includes('BPV')) {
      return item?.bank_ac_ledger_credit?.name === selectedLedger
        ? item?.closing_balance_a
        : details?.debit_ledger_ac?.name === selectedLedger
        ? details?.closing_balance_b
        : '';
    }
    if (item?.name.includes('BRV')) {
      return item?.bank_ac_ledger?.name === selectedLedger
        ? item?.closing_balance_a
        : details?.ledger_ac?.name === selectedLedger
        ? details?.closing_balance_b
        : '';
    }
    if (item?.name.includes('CV')) {
      return details?.debit_ac_ledger?.name === selectedLedger
        ? details?.closing_balance_a
        : details?.credit_ledger_ac?.name === selectedLedger
        ? details?.closing_balance_b
        : 0;
    }
  }

  if (pageTitle == 'Ledger Account') {
    if (item?.name.includes('BRV')) {
      return details?.ledger_ac?.name === selectedLedger
        ? details?.closing_balance_b
        : item?.bank_ac_ledger?.name === selectedLedger
        ? item?.closing_balance_a
        : '';
    }

    if (item?.name.includes('BPV')) {
      return details?.debit_ledger_ac?.name === selectedLedger
        ? details?.closing_balance_b
        : item?.bank_ac_ledger_credit?.name === selectedLedger
        ? item?.closing_balance_a
        : '';
    }
    if (item?.name.includes('JV')) {
      return details?.credit_ledger_ac?.name === selectedLedger
        ? details?.closing_balance_b
        : details?.debit_ac_ledger?.name === selectedLedger
        ? details?.closing_balance_a
        : '';
    }

    if (item?.name.includes('DNV')) {
      return details?.credit_ledger_ac?.name === selectedLedger
        ? details?.closing_balance_b
        : item?.party_ac_ledger?.name === selectedLedger
        ? item?.closing_balance_a
        : '';
    }

    if (item?.name.includes('CPVR')) {
      return details?.ledger_ac?.name === selectedLedger
        ? details?.closing_balance_b
        : item?.cash_ac_ledger?.name === selectedLedger
        ? item?.closing_balance_a
        : '';
    }

    if (item?.name.includes('CPV/')) {
      return details?.debit_ledger_ac?.name === selectedLedger
        ? details?.closing_balance_b
        : item?.cash_ac_ledger_credit?.name === selectedLedger
        ? item?.closing_balance_a
        : '';
    }

    if (item?.name.includes('CNV')) {
      return item?.party_ledger?.name === selectedLedger
        ? item?.closing_balance_a
        : details?.debit_ledger_ac?.name === selectedLedger
        ? details?.closing_balance_b
        : '';
    }

    if (item?.name.includes('CV')) {
      return details?.debit_ac_ledger?.name === selectedLedger
        ? details?.closing_balance_a
        : details?.credit_ledger_ac?.name === selectedLedger
        ? details?.closing_balance_b
        : 0;
    }
  }
};

const getDebitLedger = (item: any, pageTitle: any, details: any) => {
  if (pageTitle == 'Credit Note Register') {
    if (item?.name.includes('CNV')) {
      return details?.debit_ledger_ac?.debit_ledger_ac;
    }
  }

  if (pageTitle == 'Debit Note Register') {
    if (item?.name.includes('DNV')) {
      return item?.party_ac_ledger?.party_ac_ledger;
    }
  }
  if (pageTitle == 'Day Book') {
    if (item?.name.includes('CPVR')) {
      return details?.ledger_ac?.ledger_ac;
    } else if (item?.name.includes('CPV/') || item?.name.includes('BPV')) {
      return details?.debit_ledger_ac?.debit_ledger_ac;
    } else if (item?.name.includes('CV')) {
      return details?.debit_ac_ledger?.debit_ac_ledger;
    } else if (
      item?.name.includes('CN/') ||
      item?.name.includes('SEI') ||
      item?.name.includes('DN/')
    ) {
      return item?.ledger_ac?.ledger_ac;
    } else if (item?.name.includes('DNV')) {
      return item?.party_ac_ledger || item?.party_ac_ledger?.party_ac_ledger;
    } else if (item?.name.includes('CNV')) {
      return details?.debit_ledger_ac?.debit_ledger_ac;
    } else if (item?.name.includes('BRV')) {
      return item?.bank_ac_ledger?.bank_ac_ledger;
    }
  }
};

const getCreditLedger = (item: any, pageTitle: any, details: any) => {
  if (pageTitle == 'Credit Note Register') {
    return item?.party_ledger?.party_ledger;
  }
  if (pageTitle == 'Debit Note Register') {
    return details?.credit_ledger_ac?.credit_ledger_ac;
  }
  // else if (item?.name.includes("CPV/")) {
  //     return item?.cash_ac_ledger_credit?.cash_ac_ledger_credit

  // }else if (item?.name.includes("CV")) {
  //     return details?.credit_ledger_ac?.credit_ledger_ac
  // }else if (item?.name.includes("BPV")) {
  //   return item?.bank_ac_ledger_credit?.bank_ac_ledger_credit
  // }else if (item?.name?.includes("BRV")) {
  //   return item?.bank_ac_ledger?.bank_ac_ledger
  // }
  if (pageTitle == 'Day Book') {
    if (item?.name.includes('DNV')) {
      return details?.credit_ledger_ac?.credit_ledger_ac;
    } else if (item?.name.includes('CPVR')) {
      return item?.cash_ac_ledger?.cash_ac_ledger;
    } else if (item?.name.includes('CN/')) {
      return item?.customersupplier?.customersupplier;
    } else if (item?.name.includes('DN/')) {
      return item?.customer_supplier?.customer_supplier;
    } else if (item?.name.includes('BPV')) {
      return item?.bank_ac_ledger_credit?.bank_ac_ledger_credit;
    } else if (item?.name.includes('CNV')) {
      return item?.party_ledger?.party_ledger;
    } else if (item?.name.includes('CPV')) {
      return item?.cash_ac_ledger_credit?.cash_ac_ledger_credit;
    } else if (item?.name.includes('CV')) {
      return details?.credit_ledger_ac?.credit_ledger_ac;
    } else if (item?.name.includes('BRV')) {
      return details?.ledger_ac?.ledger_ac;
    }
  }
};

export const getModifiedData = (
  items: any,
  pageTitle: any,
  selectedLedger?: any
) => {
  return items.flatMap((item: any) => {
    if (item?.details) {
      if (item?.details && item?.details?.length > 0) {
        const flatDetails = item.details.map((detail: any, index: any) => ({
          ...item,
          narration: detail?.narration || item?.narration,
          voucher_type: getVoucherType(item?.name),
          voucher_no: item?.name,
          particular: getParticular(item, pageTitle, detail, selectedLedger),
          dr_amount: getDebitAmt(item, pageTitle, detail) || 0,
          cr_amount: getCreditAmt(item, pageTitle, detail) | 0,
          debit_ledger: getDebitLedger(item, pageTitle, detail),
          credit_ledger: getCreditLedger(item, pageTitle, detail),
          cheque_no: detail?.cheque_no,
          balance: getBalance(item, pageTitle, detail, selectedLedger),
          voucher_date: item?.inv_date
            ? item?.account_date
            : item?.voucher_date,
          key: `${item.name}-${index}`,
        }));

        return [...flatDetails];
      } else {
        return {
          ...item,
          voucher_no: item?.name,
          voucher_type: getVoucherType(item?.name),
          balance: getBalance(item, pageTitle, item?.details, selectedLedger),
          credit_ledger: getCreditLedger(item, pageTitle, item?.details),
          voucher_date: item?.inv_date
            ? item?.account_date
            : item?.voucher_date,
          particular: getParticular(
            item,
            pageTitle,
            item?.details,
            selectedLedger
          ),
          debit_ledger: getDebitLedger(item, pageTitle, item?.details),
          dr_amount: getDebitAmt(item, pageTitle, item?.details),
          cr_amount: getCreditAmt(item, pageTitle, item?.details),
          narration: item?.narration || item?.details?.narration,
        };
      }
    } else if (item?.products) {
      if (item?.products && item?.products?.length > 0) {
        const flatDetails = item.products.map((detail: any, index: any) => ({
          ...item,
          narration: detail?.narration || item?.narration,
          voucher_type: getVoucherType(item?.name),
          voucher_no: item?.name,
          particular: getParticular(item, pageTitle, detail, ''),
          dr_amount: getDebitAmt(item, pageTitle, detail),
          cr_amount: getCreditAmt(item, pageTitle, detail),
          debit_ledger: detail?.debit_ac_ledger?.debit_ac_ledger,
          credit_ledger: detail?.credit_ledger_ac?.credit_ledger_ac,
          cheque_no: detail?.cheque_no,
          balance: getBalance(item, pageTitle, detail, ''),
          voucher_date: item?.inv_date
            ? item?.account_date
            : item?.voucher_date,
          key: `${item.name}-${index}`,
        }));

        return [...flatDetails];
      } else {
        return {
          ...item,
          voucher_no: item?.name,
          voucher_type: getVoucherType(item?.name),
          balance: getBalance(item, pageTitle, item?.details, ''),
          credit_ledger: getCreditLedger(item, pageTitle, item?.details),
          voucher_date: item?.inv_date
            ? item?.account_date
            : item?.voucher_date,
          particular: getParticular(item, pageTitle, item?.details, ''),
          debit_ledger: getDebitLedger(item, pageTitle, item?.details),
          dr_amount: getDebitAmt(item, pageTitle, item?.details),
          cr_amount: getCreditAmt(item, pageTitle, item?.details),
          narration: item?.narration || item?.details?.narration,
        };
      }
    }
  });
};

// }

export const getModifiedData1 = (
  items: any,
  pageTitle: any,
  selectedLedger: any
) => {
  return items.flatMap((item: any) => {
    if (item?.products) {
      if (item?.products && item?.products?.length > 0) {
        const flatDetails = item.products.map((detail: any, index: any) => ({
          ...item,
          voucher_no: item?.name,
          voucher_date: item?.date || item?.inv_date,
          voucher_type: getVoucherType(item?.name),
          particular: getParticular(item, pageTitle, detail, selectedLedger),
          document_no: item?.document_no,
          narration: item?.narration,
          debit_ledger: detail?.debit_ac_ledger?.debit_ac_ledger,
          credit_ledger: detail?.credit_ledger_ac?.credit_ledger_ac,
          dr_amount: getDebitAmt(item, pageTitle, detail) || 0,
          cr_amount: getCreditAmt(item, pageTitle, detail) || 0,
          balance: getBalance(item, pageTitle, detail, selectedLedger),
          key: `${item.name}-${index}`,
        }));

        return [...flatDetails];
      } else {
        return {
          ...item,
          voucher_no: item?.name,
          document_no: item?.document_no,
          particular: getParticular(item, pageTitle, '', selectedLedger),
          narration: item?.narration,
          balance: getBalance(item, pageTitle, '', selectedLedger),
          voucher_date: item?.date || item?.inv_date,
          voucher_type: getVoucherType(item?.name),
        };
      }
    } else if (item?.product) {
      if (item?.product && item?.product?.length > 0) {
        const flatDetails = item.product.map((detail: any, index: any) => ({
          ...item,
          voucher_no: item?.name,
          voucher_type: getVoucherType(item?.name),
          particular: getParticular(item, pageTitle, detail, selectedLedger),
          narration: detail?.narration || item?.narration,
          debit_ledger: detail?.debit_ac_ledger?.debit_ac_ledger,
          credit_ledger: detail?.credit_ledger_ac?.credit_ledger_ac,
          document_no: item?.document_no,
          dr_amount: getDebitAmt(item, pageTitle, detail) || 0,
          cr_amount: getCreditAmt(item, pageTitle, detail) || 0,
          balance: getBalance(item, pageTitle, detail, selectedLedger),

          key: `${item.name}-${index}`,
        }));

        return [...flatDetails];
      } else {
        return {
          ...item,
          voucher_no: item?.name,
          document_no: item?.document_no,
          particular: getParticular(item, pageTitle, '', selectedLedger),
          narration: item?.narration,
          balance: getBalance(item, pageTitle, '', selectedLedger),
          voucher_type: getVoucherType(item?.name),
        };
      }
    } else if (item?.details) {
      if (item?.details && item?.details?.length > 0) {
        const flatDetails = item.details.map((detail: any, index: any) => ({
          ...item,
          voucher_no: item?.name,
          voucher_type: getVoucherType(item?.name),
          particular: getParticular(item, pageTitle, detail, selectedLedger),
          document_no: item?.document_no,
          // particular: 'asdbc',
          narration: detail?.narration || item?.narration,
          dr_amount: getDebitAmt(item, pageTitle, detail) || 0,
          cr_amount: getCreditAmt(item, pageTitle, detail) || 0,
          key: `${item.name}-${index}`,
          balance: getBalance(item, pageTitle, detail, selectedLedger),
        }));

        return [...flatDetails];
      } else {
        return {
          ...item,
          voucher_no: item?.name,
          document_no: item?.document_no,
          particular: getParticular(item, pageTitle, '', selectedLedger),
          narration: item?.narration,
          balance: getBalance(item, pageTitle, '', selectedLedger),
          voucher_type: getVoucherType(item?.name),
        };
      }
    }
  });
};
