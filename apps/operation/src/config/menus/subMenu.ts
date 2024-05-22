interface MenuItem {
    label: string;
    link?: string;
    key: string;
  }
  
  export const Account_Config_Sub_Menu: MenuItem[] = [
    {
      label: 'TDS Master',
      link: '/view-tds-master',
      key: '/view-tds-master',
    },
    { label: 'Bank Master', link: '/view-bank-master', key: '/view-bank-master' },
    { label: 'Bank Account Master', link: '/view-bank-account-master', key: '/view-bank-account-master' },
    { label: 'Firm Types', link: '/', key: '/' },
    { label: 'Cost Center', link: '/', key: '/' },
    { label: 'Commodity', link: '/', key: '/' },
    { label: 'Ledger Category', link: '/', key: '/' },
    { label: 'Ledger Group', link: '/', key: '/' },
    {
      label: 'General Ledger',
      link: '/',
      key: '/',
    },
    {
      label: 'Recovery Components',
      link: '/',
      key: '/',
    },
  ];
  
  export const Account_Management_Sub_Menu: MenuItem[] = [
  
    {
      label: 'View Cash Receipt Voucher',
      link: '/view-cash-receipt-voucher',
      key: '/view-cash-receipt-voucher',
    },
    {
      label: 'Create Cash Receipt Voucher',
      link: '/create-cash-receipt-voucher',
      key: '/create-cash-receipt-voucher',
    },
    {
      label: 'Edit Cash Receipt Voucher',
      link: '/edit-cash-receipt-voucher',
      key: '/edit-cash-receipt-voucher',
    },
    {
      label: 'View Cash Payment Voucher',
      link: '/view-cash-payment-voucher',
      key: '/view-cash-payment-voucher',
    },
    {
      label: 'Create Cash Payment Voucher',
      link: '/create-cash-payment-voucher',
      key: '/create-cash-payment-voucher',
    },
    {
      label: 'Edit Cash Payment Voucher',
      link: '/edit-cash-payment-voucher',
      key: '/edit-cash-payment-voucher',
    },
    {
      label: 'View Bank Receipt Voucher',
      link: '/view-bank-receipt-voucher',
      key: '/view-bank-receipt-voucher',
    },
    {
      label: 'Create Bank Receipt Voucher',
      link: '/create-bank-receipt-voucher',
      key: '/create-bank-receipt-voucher',
    },
    {
      label: 'Edit Bank Receipt Voucher',
      link: '/edit-bank-receipt-voucher',
      key: '/edit-bank-receipt-voucher',
    },
    {
      label: 'View Bank Payment Voucher',
      link: '/view-bank-payment-voucher',
      key: '/view-bank-payment-voucher',
    },
    {
      label: 'Create Bank Payment Voucher',
      link: '/create-bank-payment-voucher',
      key: '/create-bank-payment-voucher',
    },
    {
      label: 'Edit Bank Payment Voucher',
      link: '/edit-bank-payment-voucher',
      key: '/edit-bank-payment-voucher',
    },


    {
      label: 'View Journal Voucher',
      link: '/view-journal-voucher',
      key: '/view-journal-voucher',
    },
    {
      label: 'Create Journal Voucher',
      link: '/create-journal-voucher',
      key: '/create-journal-voucher',
    },
    {
      label: 'Edit Journal Voucher',
      link: '/edit-journal-voucher',
      key: '/edit-journal-voucher',
    },

    {
      label: 'View Contra Voucher',
      link: '/view-contra-voucher',
      key: '/view-contra-voucher',
    },
    {
      label: 'Create Contra Voucher',
      link: '/create-contra-voucher',
      key: '/create-contra-voucher',
    },
    {
      label: 'Edit Contra Voucher',
      link: '/edit-contra-voucher',
      key: '/edit-contra-voucher',
    },


    {
      label: 'View Debit Note Voucher',
      link: '/view-debit-note-voucher',
      key: '/view-debit-note-voucher',
    },
    {
      label: 'Create Debit Note Voucher',
      link: '/create-debit-note-voucher',
      key: '/create-debit-note-voucher',
    },
    {
      label: 'Edit Debit Note Voucher',
      link: '/edit-debit-note-voucher',
      key: '/edit-debit-note-voucher',
    },

    {
      label: 'View Credit Note Voucher',
      link: '/view-credit-note-voucher',
      key: '/view-credit-note-voucher',
    },
    {
      label: 'Create Credit Note Voucher',
      link: '/create-credit-note-voucher',
      key: '/create-credit-note-voucher',
    },
    {
      label: 'Edit Credit Note Voucher',
      link: '/edit-credit-note-voucher',
      key: '/edit-credit-note-voucher',
    },

    {
      label: 'View Creditors Account',
      link: '/view-creditors-account',
      key: '/view-creditors-account',
    },
    {
      label: 'Create Creditors Account',
      link: '/create-creditors-account',
      key: '/create-creditors-account',
    },
    {
      label: 'Edit Creditors Account',
      link: '/edit-creditors-account',
      key: '/edit-creditors-account',
    },

    {
      label: 'View Credit Note With Gst',
      link: '/view-credit-note-with-gst',
      key: '/view-credit-note-with-gst',
    },
    {
      label: 'Create Credit Note With Gst',
      link: '/create-credit-note-with-gst',
      key: '/create-credit-note-with-gst',
    },
    {
      label: 'Edit Credit Note With Gst',
      link: '/edit-credit-note-with-gst',
      key: '/edit-credit-note-with-gst',
    },

    {
      label: 'View Debit Note With Gst',
      link: '/view-debit-note-with-gst',
      key: '/view-debit-note-with-gst',
    },
    {
      label: 'Create Debit Note With Gst',
      link: '/create-debit-note-with-gst',
      key: '/create-debit-note-with-gst',
    },
    {
      label: 'Edit Debit Note With Gst',
      link: '/edit-debit-note-with-gst',
      key: '/edit-debit-note-with-gst',
    },

    {
      label: 'View DN/CN (With Gst) Approval',
      link: '/view-dn-cn-with-gst-approval',
      key: '/view-dn-cn-with-gst-approval',
    },
    {
      label: 'Create DN/CN (With Gst) Approval',
      link: '/create-dn-cn-with-gst-approval',
      key: '/create-dn-cn-with-gst-approval',
    },
    {
      label: 'Edit DN/CN (With Gst) Approval',
      link: '/edit-dn-cn-with-gst-approval',
      key: '/edit-dn-cn-with-gst-approval',
    },

    {
      label: 'View Service/Expense Invoice',
      link: '/view-service-expense-invoice',
      key: '/view-service-expense-invoice',
    },
    {
      label: 'Create Service/Expense Invoice',
      link: '/create-service-expense-invoice',
      key: '/create-service-expense-invoice',
    },
    {
      label: 'Edit Service/Expense Invoice',
      link: '/edit-service-expense-invoice',
      key: '/edit-service-expense-invoice',
    },

    {
      label: 'View Service/Expense Invoice Register',
      link: '/view-service-expense-invoice-register',
      key: '/view-service-expense-invoice-register',
    },
    {
      label: 'Create Service/Expense Invoice Register',
      link: '/create-service-expense-invoice-register',
      key: '/create-service-expense-invoice-register',
    },
    {
      label: 'Edit Service/Expense Invoice Register',
      link: '/edit-service-expense-invoice-register',
      key: '/edit-service-expense-invoice-register',
    },

    {
      label: 'View Dr/Cr On A/c Bill Adjustment',
      link: '/view-dr-cr-on-ac-bill-adjustment',
      key: '/view-dr-cr-on-ac-bill-adjustment',
    },
    {
      label: 'Create Dr/Cr On A/c Bill Adjustment',
      link: '/create-dr-cr-on-ac-bill-adjustment',
      key: '/create-dr-cr-on-ac-bill-adjustment',
    },
    {
      label: 'Edit Dr/Cr On A/c Bill Adjustment',
      link: '/edit-dr-cr-on-ac-bill-adjustment',
      key: '/edit-dr-cr-on-ac-bill-adjustment',
    },

    {
      label: 'View Purchase Bill Adjustment',
      link: '/view-purchase-bill-adjustment',
      key: '/view-purchase-bill-adjustment',
    },
    {
      label: 'Create Purchase Bill Adjustment',
      link: '/create-purchase-bill-adjustment',
      key: '/create-purchase-bill-adjustment',
    },
    {
      label: 'Edit Purchase Bill Adjustment',
      link: '/edit-purchase-bill-adjustment',
      key: '/edit-purchase-bill-adjustment',
    },

  ];