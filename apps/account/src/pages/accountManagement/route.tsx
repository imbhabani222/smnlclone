import CreateCashReceiptVoucher from './cashReceiptVoucher/create';
import ViewCashReceiptVoucher from './cashReceiptVoucher/view';

import CreateCashPaymentVoucher from './cashPaymentVoucher/create';
import ViewCashPaymentVoucher from './cashPaymentVoucher/view';

import CreateBankReceiptVoucher from './bankReceiptVoucher/create';
import ViewBankReceiptVoucher from './bankReceiptVoucher/view';

import CreateBankPaymentVoucher from './bankPaymentVoucher/create';
import ViewBankPaymentVoucher from './bankPaymentVoucher/view';

import CreateJournalVoucher from './journalVoucher/createJournalVoucher';
import ViewJournalVoucher from './journalVoucher/viewJournalVoucher';

import ViewContraVoucher from './contraVoucher/view';
import CreateContraVoucher from './contraVoucher/create';

import ViewDebitNoteVoucher from './debitNoteVoucher/view';
import DebitNoteVoucher from './debitNoteVoucher/create';

import ViewPurchaseInvoice from './purchaseInvoice/viewPurchaseInvoice';
import AddPurchaseInvoiceTabs from './purchaseInvoice/addPurchaseInvoice';

import CreditNoteVoucher from './creditNoteVoucher/create';
import ViewCreditNoteVoucher from './creditNoteVoucher/view';

import CreateCreditorsAccount from './creditorsAccount/create';
import ViewCreditorsAccount from './creditorsAccount/view';

import AddCreditNoteGST from './creditNoteWithGST/addCreditNote';
import ViewCreditNoteWithGst from './creditNoteWithGST/viewCreaditNote';

import AddDebitNoteGST from './debitNoteWithGST/addDebitNote';
import ViewDebitNoteWithGst from './debitNoteWithGST/viewDebitNote';

import AddServiceExpenseInvoice from './serviceExpenseInvoice/addServiceExpense';
import ViewServiceExpenseInvoice from './serviceExpenseInvoice/viewServiceExpense';

import ViewServiceExpenseInvoiceRegister from './serviceExpenseInvoiceRegister/view';

import CreateDrCrOnACBillAdjustment from './drCrOnAcBillAdjustment/create';
import ViewDrCrOnACBillAdjustment from './drCrOnAcBillAdjustment/view';

import CreatePurchaseBillAdjustment from './purchaseBillAdjustment/create';
import ViewPurchaseBillAdjustment from './purchaseBillAdjustment/view';

import CreateCreditNoteGSTApproval from './creditNoteGstApproval/createCreditNoteApproval';
import ViewCreditNoteGstApproval from './creditNoteGstApproval/viewCreditNoteApproval';

import CreateDebitNoteGstApproval from './debitNoteGstApproval/createDebitNoteGstApproval';
import ViewDebitNoteGstApproval from './debitNoteGstApproval/viewDebitNoteApproval';

import PurchaseReturn from './purchasereturn/index';
import ViewPurchaseReturn from './purchasereturn/viewPurchaseReturn';

import UpdateLedgerOpeningBalance from './ledgerOpeningBalance/create';
import ViewLedgerOpeningBalance from './ledgerOpeningBalance/view';

import MainComponent from './index';
import VocherMainComponent from './vocherindex';

interface MenuItem {
  label: string;
  key: string;
  title?: string;
  component: any;
  path: any;
  subMenu?: any;
  hidden?: boolean;
  mainkey?: string;
  isButton?: any;
  buttonLink?: string;
  isback?: boolean;
  buttonTitle?: string;
  element?: any;
  identity?: string;
}

export const Account_Management_Sub_Menu: MenuItem[] = [
  {
    label: 'Purchase Invoice',
    key: '/view-purchase-invoice',
    path: '/view-purchase-invoice',
    mainkey: '/view-purchase-invoice',
    element: <MainComponent />,
    component: ViewPurchaseInvoice,
    buttonLink: '/create-purchase-invoice',
    buttonTitle: 'Add Purchase Invoice',
    identity: 'accountmanagement',
  },
  {
    label: 'Add Purchase Invoice',
    key: '/create-purchase-invoice',
    path: '/create-purchase-invoice',
    mainkey: '/view-purchase-invoice',
    element: <MainComponent />,
    component: AddPurchaseInvoiceTabs,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },
  {
    label: 'Add Purchase Invoice Product',
    key: '/add-purchase-invoice-product',
    path: '/add-purchase-invoice-product',
    mainkey: '/view-purchase-invoice',
    element: <MainComponent />,
    component: AddPurchaseInvoiceTabs,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },
  {
    label: 'Add Purchase Invoice Gate Pass',
    key: '/add-invoice-gate-pass',
    path: '/add-invoice-gate-pass',
    mainkey: '/view-purchase-invoice',
    element: <MainComponent />,
    component: AddPurchaseInvoiceTabs,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },
  {
    label: 'Purchase Return ',
    key: '/view-purchase-return-register',
    mainkey: '/view-purchase-return-register',
    path: '/view-purchase-return-register',
    buttonLink: '/purchase-return',
    buttonTitle: 'Purchase Return',
    component: ViewPurchaseReturn,
    element: <MainComponent />,
    identity: 'accountmanagement',
  },
  {
    label: 'Add Purchase Return ',
    key: '/purchase-return',
    path: '/purchase-return',
    mainkey: '/view-purchase-return-register',
    element: <MainComponent />,
    component: PurchaseReturn,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },

  {
    label: 'Purchase Return Product',
    key: '/return-product',
    path: '/return-product',
    mainkey: '/view-purchase-return-register',
    element: <MainComponent />,
    component: PurchaseReturn,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },
  
  // {
  //   label: 'Debit Note Voucher',
  //   key: '/view-debit-note-voucher',
  //   path: '/view-debit-note-voucher',
  //   mainkey: '/view-debit-note-voucher',
  //   title: 'View Debit Note Voucher',
  //   element: <MainComponent />,
  //   component: ViewDebitNoteVoucher,
  //   buttonLink: '/create-debit-note-voucher',
  //   buttonTitle: 'Add Debit Note Voucher',
  //   identity: 'accountmanagement',
  // },
  // {
  //   label: 'Debit Note Voucher',
  //   key: '/create-debit-note-voucher',
  //   path: '/create-debit-note-voucher',
  //   mainkey: '/view-debit-note-voucher',
  //   title: 'Add Debit Note Voucher',
  //   element: <MainComponent />,
  //   component: CreateDebitNoteVoucher,
  //   isback: true,
  //   hidden: true,
  //   identity: 'accountmanagement',
  // },
  // {
  //   label: 'Debit Note Voucher',
  //   key: '/create-debit-note-voucher',
  //   path: '/create-debit-note-voucher',
  //   mainkey: '/view-debit-note-voucher',
  //   title: 'Add Debit Note Voucher',
  //   element: <MainComponent />,
  //   component: CreateDebitNoteVoucher,
  //   isback: true,
  //   hidden: true,
  //   identity: 'accountmanagement',
  // },
  // {
  //   label: 'Debit Note Voucher',
  //   key: '/edit-debit-note-voucher',
  //   path: '/edit-debit-note-voucher',
  //   mainkey: '/view-debit-note-voucher',
  //   title: 'Edit Debit Note Voucher',
  //   element: <MainComponent />,
  //   component: CreateDebitNoteVoucher,
  //   isback: true,
  //   hidden: true,
  //   identity: 'accountmanagement',
  // },

  // {
  //   label: 'Creditors Account',
  //   key: '/view-creditors-account',
  //   path: '/view-creditors-account',
  //   mainkey: '/view-creditors-account',
  //   title: 'View Creditors Account',
  //   element: <MainComponent />,
  //   component: ViewCreditorsAccount,
  //   buttonLink: '/create-creditors-account',
  //   buttonTitle: 'Add Creditors Account',
  //   identity: 'accountmanagement',
  // },
  // {
  //   label: 'Creditors Account',
  //   key: '/create-creditors-account',
  //   path: '/create-creditors-account',
  //   mainkey: '/view-creditors-account',
  //   title: 'Add Creditors Account',
  //   element: <MainComponent />,
  //   component: CreateCreditorsAccount,
  //   isback: true,
  //   hidden: true,
  //   identity: 'accountmanagement',
  // },
  // {
  //   label: 'Creditors Account',
  //   key: '/edit-creditors-account',
  //   path: '/edit-creditors-account',
  //   mainkey: '/view-creditors-account',
  //   title: 'Edit Creditors Account',
  //   element: <MainComponent />,
  //   component: CreateCreditorsAccount,
  //   isback: true,
  //   hidden: true,
  //   identity: 'accountmanagement',
  // },

  {
    label: 'Credit Note With GST',
    key: '/view-credit-note-with-gst',
    path: '/view-credit-note-with-gst',
    mainkey: '/view-credit-note-with-gst',
    title: 'View Credit Note With GST',
    element: <MainComponent />,
    component: ViewCreditNoteWithGst,
    buttonLink: '/create-credit-note-with-gst',
    buttonTitle: 'Add Credit Note',
    identity: 'accountmanagement',
  },
  {
    label: 'Add Credit Note With GST',
    key: '/create-credit-note-with-gst',
    path: '/create-credit-note-with-gst',
    mainkey: '/view-credit-note-with-gst',
    title: 'Add Credit Note With GST',
    element: <MainComponent />,
    component: AddCreditNoteGST,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },
  {
    label: 'Add Credit Note With GST Product',
    key: '/add-credit-note-product',
    path: '/add-credit-note-product',
    mainkey: '/view-credit-note-with-gst',
    // title: '',
    element: <MainComponent />,
    component: AddCreditNoteGST,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },

  {
    label: 'Credit Note With GST Approval',
    key: '/view-credit-note-with-gst-approval',
    path: '/view-credit-note-with-gst-approval',
    mainkey: '/view-credit-note-with-gst-approval',
    element: <MainComponent />,
    component: ViewCreditNoteGstApproval,
    identity: 'accountmanagement',
  },
  {
    label: 'Add Credit Note With GST -Approval',
    key: '/create-credit-note-with-gst-approval',
    path: '/create-credit-note-with-gst-approval',
    mainkey: '/view-credit-note-with-gst-approval',
    // title: '',
    element: <MainComponent />,
    component: CreateCreditNoteGSTApproval,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },

  {
    label: 'Debit Note With GST',
    key: '/view-debit-note-with-gst',
    path: '/view-debit-note-with-gst',
    mainkey: '/view-debit-note-with-gst',
    title: 'View Debit Note With GST',
    element: <MainComponent />,
    component: ViewDebitNoteWithGst,
    buttonLink: '/create-debit-note-with-gst',
    buttonTitle: 'Add Debit Note With GST',
    identity: 'accountmanagement',
  },
  {
    label: 'Add Debit Note With GST',
    key: '/create-debit-note-with-gst',
    path: '/create-debit-note-with-gst',
    mainkey: '/view-debit-note-with-gst',
    title: 'Add Debit Note With GST',
    element: <MainComponent />,
    component: AddDebitNoteGST,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },
  {
    label: 'Add Debit Note With GST Product',
    key: '/add-debit-note-product',
    path: '/add-debit-note-product',
    mainkey: '/view-debit-note-with-gst',
    // title: 'Edit Debit Note With GST',
    element: <MainComponent />,
    component: AddDebitNoteGST,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },

  // {
  //   label: 'DN/CN (With GST) Approval',
  //   key: '/view-dn-cn-with-gst-approval',
  //   path: '/view-dn-cn-with-gst-approval',
  //   mainkey: '/view-dn-cn-with-gst-approval',
  //   title: 'View DN/CN (With GST) Approval',
  //   element: <MainComponent />,
  //   component: ViewDNCNWithGstApproval,
  //   buttonLink: '/create-dn-cn-with-gst-approval',
  //   buttonTitle: 'Add DN/CN (With GST) Approval',
  //   identity: 'accountmanagement',
  // },

  {
    label: 'Debit Note With GST Approval',
    key: '/view-debit-note-with-gst-approval',
    path: '/view-debit-note-with-gst-approval',
    mainkey: '/view-debit-note-with-gst-approval',
    element: <MainComponent />,
    component: ViewDebitNoteGstApproval,
    identity: 'accountmanagement',
  },
  {
    label: 'Add Debit Note With GST -Approval',
    key: '/create-debit-note-with-gst-approval',
    path: '/create-debit-note-with-gst-approval',
    mainkey: '/view-debit-note-with-gst-approval',
    // title: '',
    element: <MainComponent />,
    component: CreateDebitNoteGstApproval,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },

  {
    label: 'Service/Expense Invoice',
    key: '/view-service-expense-invoice',
    path: '/view-service-expense-invoice',
    mainkey: '/view-service-expense-invoice',
    element: <MainComponent />,
    component: ViewServiceExpenseInvoice,
    buttonLink: '/create-service-expense-invoice',
    buttonTitle: 'Add Service/Expense Invoice',
    identity: 'accountmanagement',
  },
  {
    label: 'Add Service/Expense Invoice',
    key: '/create-service-expense-invoice',
    path: '/create-service-expense-invoice',
    mainkey: '/view-service-expense-invoice',
    element: <MainComponent />,
    component: AddServiceExpenseInvoice,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },
  {
    label: 'Add Service/Expense Invoice Product',
    key: '/add-service-expense-invoice-product',
    path: '/add-service-expense-invoice-product',
    mainkey: '/view-service-expense-invoice',
    element: <MainComponent />,
    component: AddServiceExpenseInvoice,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },

  {
    label: 'Ledger Opening Balance',
    key: '/view-ledger-opening-balance',
    path: '/view-ledger-opening-balance',
    mainkey: '/view-ledger-opening-balance',
    element: <MainComponent />,
    
    component: ViewLedgerOpeningBalance,
    buttonLink: '/add-ledger-opening-balance',
    buttonTitle: 'Add Ledger Opening Balance',
    identity: 'accountmanagement',
  },
  {
    label: 'Add Ledger Opening Balance',
    key: '/add-ledger-opening-balance',
    path: '/add-ledger-opening-balance',
    mainkey: '/view-ledger-opening-balance',
    element: <MainComponent />,
    component: UpdateLedgerOpeningBalance,
    isback: true,
    hidden: true,
    identity: 'accountmanagement',
  },
  // {
  //   label: 'Service/Expense Invoice Register',
  //   key: '/view-service-expense-invoice-register',
  //   path: '/view-service-expense-invoice-register',
  //   mainkey: '/view-service-expense-invoice-register',
  //   element: <MainComponent />,
  //   component: ViewServiceExpenseInvoiceRegister,
  //   identity: 'accountmanagement',
  // },

  // {
  //   label: 'Dr/Cr On A/c Bill Adjustment',
  //   key: '/view-dr-cr-on-ac-bill-adjustment',
  //   path: '/view-dr-cr-on-ac-bill-adjustment',
  //   mainkey: '/view-dr-cr-on-ac-bill-adjustment',
  //   title: 'View Dr/Cr On A/c Bill Adjustment',
  //   element: <MainComponent />,
  //   component: ViewDrCrOnACBillAdjustment,
  //   buttonLink: '/create-dr-cr-on-ac-bill-adjustment',
  //   buttonTitle: 'Add Dr/Cr On A/c Bill Adjustment',
  //   identity: 'accountmanagement',
  // },
  // {
  //   label: 'Dr/Cr On A/c Bill Adjustment',
  //   key: '/create-dr-cr-on-ac-bill-adjustment',
  //   path: '/create-dr-cr-on-ac-bill-adjustment',
  //   mainkey: '/view-dr-cr-on-ac-bill-adjustment',
  //   title: 'Add Dr/Cr On A/c Bill Adjustment',
  //   element: <MainComponent />,
  //   component: CreateDrCrOnACBillAdjustment,
  //   isback: true,
  //   hidden: true,
  //   identity: 'accountmanagement',
  // },
  // {
  //   label: 'Dr/Cr On A/c Bill Adjustment',
  //   key: '/edit-dr-cr-on-ac-bill-adjustment',
  //   path: '/edit-dr-cr-on-ac-bill-adjustment',
  //   mainkey: '/view-dr-cr-on-ac-bill-adjustment',
  //   title: 'Edit Dr/Cr On A/c Bill Adjustment',
  //   element: <MainComponent />,
  //   component: CreateDrCrOnACBillAdjustment,
  //   isback: true,
  //   hidden: true,
  //   identity: 'accountmanagement',
  // },

  // {
  //   label: 'Purchase Bill Adjustment',
  //   key: '/view-purchase-bill-adjustment',
  //   path: '/view-purchase-bill-adjustment',
  //   mainkey: '/view-purchase-bill-adjustment',
  //   title: 'View Purchase Bill Adjustment',
  //   element: <MainComponent />,
  //   component: ViewPurchaseBillAdjustment,
  //   buttonLink: '/create-purchase-bill-adjustment',
  //   buttonTitle: 'Add Purchase Bill Adjustment',
  //   identity: 'accountmanagement',
  // },
  // {
  //   label: 'Purchase Bill Adjustment',
  //   key: '/create-purchase-bill-adjustment',
  //   path: '/create-purchase-bill-adjustment',
  //   mainkey: '/view-purchase-bill-adjustment',
  //   title: 'Add Purchase Bill Adjustment',
  //   element: <MainComponent />,
  //   component: CreatePurchaseBillAdjustment,
  //   isback: true,
  //   hidden: true,
  //   identity: 'accountmanagement',
  // },
  // {
  //   label: 'Purchase Bill Adjustment',
  //   key: '/edit-purchase-bill-adjustment',
  //   path: '/edit-purchase-bill-adjustment',
  //   mainkey: '/view-purchase-bill-adjustment',
  //   title: 'Edit Purchase Bill Adjustment',
  //   element: <MainComponent />,
  //   component: CreatePurchaseBillAdjustment,
  //   isback: true,
  //   hidden: true,
  //   identity: 'accountmanagement',
  // },
];

export const Accounts_Vocher_SubMenu = [
  {
    label: 'Cash Receipt Voucher',
    key: '/view-cash-receipt-voucher',
    path: '/view-cash-receipt-voucher',
    mainkey: '/view-cash-receipt-voucher',
    title: 'View Cash Receipt Voucher',
    element: <VocherMainComponent />,
    component: ViewCashReceiptVoucher,
    buttonLink: '/create-cash-receipt-voucher',
    buttonTitle: 'Add Cash Receipt Voucher',
    identity: 'accountvocher',
  },

  {
    label: 'Add Cash Receipt Voucher',
    key: '/create-cash-receipt-voucher',
    path: '/create-cash-receipt-voucher',
    mainkey: '/view-cash-receipt-voucher',
    title: 'Add Cash Receipt Voucher',
    element: <VocherMainComponent />,
    component: CreateCashReceiptVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },

  {
    label: 'Edit Cash Receipt Voucher',
    key: '/edit-cash-receipt-voucher',
    path: '/edit-cash-receipt-voucher',
    mainkey: '/view-cash-receipt-voucher',
    title: 'Edit Cash Receipt Voucher',
    element: <VocherMainComponent />,
    component: CreateCashReceiptVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },

  {
    label: 'Cash Payment Voucher',
    key: '/view-cash-payment-voucher',
    path: '/view-cash-payment-voucher',
    mainkey: '/view-cash-payment-voucher',
    title: 'View Cash Payment Voucher',
    element: <VocherMainComponent />,
    component: ViewCashPaymentVoucher,
    buttonLink: '/create-cash-payment-voucher',
    buttonTitle: 'Add Cash Payment Voucher',
    identity: 'accountvocher',
  },

  {
    label: 'Add Cash Payment Voucher',
    key: '/create-cash-payment-voucher',
    path: '/create-cash-payment-voucher',
    mainkey: '/view-cash-payment-voucher',
    title: 'Add Cash Payment Voucher',
    element: <VocherMainComponent />,
    component: CreateCashPaymentVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },

  {
    label: 'Edit Cash Payment Voucher',
    key: '/edit-cash-payment-voucher',
    path: '/edit-cash-payment-voucher',
    mainkey: '/view-cash-payment-voucher',
    title: 'Edit Cash Payment Voucher',
    element: <VocherMainComponent />,
    component: CreateCashPaymentVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },

  {
    label: 'Bank Receipt Voucher',
    key: '/view-bank-receipt-voucher',
    path: '/view-bank-receipt-voucher',
    mainkey: '/view-bank-receipt-voucher',
    title: 'View Bank Receipt Voucher',
    element: <VocherMainComponent />,
    component: ViewBankReceiptVoucher,
    buttonLink: '/create-bank-receipt-voucher',
    buttonTitle: 'Add Bank Receipt Voucher',
    identity: 'accountvocher',
  },

  {
    label: 'Add Bank Receipt Voucher',
    key: '/create-bank-receipt-voucher',
    path: '/create-bank-receipt-voucher',
    mainkey: '/view-bank-receipt-voucher',
    title: 'Add Bank Receipt Voucher',
    element: <VocherMainComponent />,
    component: CreateBankReceiptVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },
  {
    label: 'Edit Bank Receipt Voucher',
    key: '/edit-bank-receipt-voucher',
    path: '/edit-bank-receipt-voucher',
    mainkey: '/view-bank-receipt-voucher',
    title: 'Edit Bank Receipt Voucher',
    element: <VocherMainComponent />,
    component: CreateBankReceiptVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },

  {
    label: 'Bank Payment Voucher',
    key: '/view-bank-payment-voucher',
    path: '/view-bank-payment-voucher',
    mainkey: '/view-bank-payment-voucher',
    title: 'View Bank Payment Voucher',
    element: <VocherMainComponent />,
    component: ViewBankPaymentVoucher,
    buttonLink: '/create-bank-payment-voucher',
    buttonTitle: 'Add Bank Payment Voucher',
    identity: 'accountvocher',
  },

  {
    label: 'Add Bank Payment Voucher',
    key: '/create-bank-payment-voucher',
    path: '/create-bank-payment-voucher',
    mainkey: '/view-bank-payment-voucher',
    title: 'Add Bank Payment Voucher',
    element: <VocherMainComponent />,
    component: CreateBankPaymentVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },

  {
    label: 'Edit Bank Payment Voucher',
    key: '/edit-bank-payment-voucher',
    path: '/edit-bank-payment-voucher',
    mainkey: '/view-bank-payment-voucher',
    title: 'Edit Bank Payment Voucher',
    element: <VocherMainComponent />,
    component: CreateBankPaymentVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },

  {
    label: 'Journal Voucher',
    key: '/view-journal-voucher',
    path: '/view-journal-voucher',
    mainkey: '/view-journal-voucher',
    element: <VocherMainComponent />,
    component: ViewJournalVoucher,
    buttonLink: '/create-journal-voucher',
    buttonTitle: 'Add Journal Voucher',
    identity: 'accountvocher',
  },
  {
    label: 'Add Journal Voucher',
    key: '/create-journal-voucher',
    path: '/create-journal-voucher',
    mainkey: '/view-journal-voucher',
    element: <VocherMainComponent />,
    component: CreateJournalVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },
  {
    label: 'Edit Journal Voucher',
    key: '/edit-journal-voucher',
    path: '/edit-journal-voucher-details',
    mainkey: '/view-journal-voucher',
    element: <VocherMainComponent />,
    component: CreateJournalVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },
  {
    label: 'Contra Voucher',
    key: '/view-contra-voucher',
    path: '/view-contra-voucher',
    mainkey: '/view-contra-voucher',
    title: 'View Contra Voucher',
    element: <VocherMainComponent />,
    component: ViewContraVoucher,
    buttonLink: '/create-contra-voucher',
    buttonTitle: 'Add Contra Voucher',
    identity: 'accountvocher',
  },
  {
    label: 'Add Contra Voucher',
    key: '/create-contra-voucher',
    path: '/create-contra-voucher',
    mainkey: '/view-contra-voucher',
    title: 'Add Contra Voucher',
    element: <VocherMainComponent />,
    component: CreateContraVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },
  {
    label: 'Edit Contra Voucher',
    key: '/edit-contra-voucher',
    path: '/edit-contra-voucher',
    mainkey: '/view-contra-voucher',
    title: 'Edit Contra Voucher',
    element: <VocherMainComponent />,
    component: CreateContraVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },
  {
    label: 'Credit Note Voucher',
    key: '/view-credit-note-voucher',
    path: '/view-credit-note-voucher',
    mainkey: '/view-credit-note-voucher',
    title: 'View Credit Note Voucher',
    element: <VocherMainComponent />,
    component: ViewCreditNoteVoucher,
    buttonLink: '/create-credit-note-voucher',
    buttonTitle: 'Add Credit Note Voucher',
    identity: 'accountvocher',
  },
  {
    label: 'Add Credit Note Voucher',
    key: '/create-credit-note-voucher',
    path: '/create-credit-note-voucher',
    mainkey: '/view-credit-note-voucher',
    title: 'Add Credit Note Voucher',
    element: <VocherMainComponent />,
    component: CreditNoteVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },
  {
    label: 'Credit Note Voucher Details',
    key: '/credit-note-details',
    path: '/credit-note-details',
    mainkey: '/view-credit-note-voucher',
    // title: 'Add Credit Note Voucher',
    element: <VocherMainComponent />,
    component: CreditNoteVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },

  {
    label: 'Edit Credit Note Voucher',
    key: '/edit-credit-note-voucher',
    path: '/edit-credit-note-voucher',
    mainkey: '/view-credit-note-voucher',
    // title: 'Edit Credit Note Voucher',
    element: <VocherMainComponent />,
    component: CreditNoteVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },
  {
    label: 'Debit Note Voucher',
    key: '/view-debit-note-voucher',
    path: '/view-debit-note-voucher',
    mainkey: '/view-debit-note-voucher',
    // title: 'View Credit Note Voucher',
    element: <VocherMainComponent />,
    component: ViewDebitNoteVoucher,
    buttonLink: '/create-debit-note-voucher',
    buttonTitle: 'Add Debit Note Voucher',
    identity: 'accountvocher',
  },
  {
    label: 'Add Debit Note Voucher',
    key: '/create-debit-note-voucher',
    path: '/create-debit-note-voucher',
    mainkey: '/view-debit-note-voucher',
    title: 'Add Credit Note Voucher',
    element: <VocherMainComponent />,
    component: DebitNoteVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },
  // {
  //   label: 'Debit Note Voucher Details',
  //   key: '/debit-note-details',
  //   path: '/debit-note-details',
  //   mainkey: '/view-debit-note-voucher',
  //   // title: 'Add Credit Note Voucher',
  //   element: <VocherMainComponent />,
  //   component: DebitNoteVoucher,
  //   isback: true,
  //   hidden: true,
  //   identity: 'accountvocher',
  //   backTittle: 'Back',
  // },

  {
    label: 'Edit Debit Note Voucher',
    key: '/edit-debit-note-voucher',
    path: '/edit-debit-note-voucher',
    mainkey: '/view-debit-note-voucher',
    // title: 'Edit Credit Note Voucher',
    element: <VocherMainComponent />,
    component: DebitNoteVoucher,
    isback: true,
    hidden: true,
    identity: 'accountvocher',
    backTittle: 'Back',
  },
];
