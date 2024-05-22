import ViewDayBook from './dayBook/view';
import ViewCashBook from './cashBook/view';
import ViewBankBook from './bankBook/view';
import ViewJournalRegister from './journalRegister/view'
import ViewLedgerAccount from './ledgerAccount/ledgerAccount'
import ViewCreditNote from './creditNoteRegister/creditNote'
import ViewCreditNoteGst from './creditNoteRegister/creditNoteWithGST'
import ViewDebitNote from './debitNoteRegister/debitNote'
import ViewDebitNoteGst from './debitNoteRegister/debitNoteWithGST'
import ViewPurchaseInvoice from './purchaseInvoiceReturn/purchaseInvoice'
import ViewPurchaseReturn from './purchaseInvoiceReturn/purchaseReturn'
import ViewServiceExpense from './ServiceExpense/view';
import ViewTrialBalance from './trialBalance/trialBalance'
import BankPaymentAdvice from './bankPaymentAdvice/view';

import MainComponent from './index';

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

export const Account_Reports_Sub_Menu: MenuItem[] = [
  {
    label: 'Day Book',
    key: '/view-day-book',
    path: '/view-day-book',
    mainkey: '/view-day-book',
    element: <MainComponent />,
    component: ViewDayBook,
    identity: 'accountreports',
  },
  {
    label: 'Cash Book',
    key: '/view-cash-book',
    path: '/view-cash-book',
    mainkey: '/view-cash-book',
    element: <MainComponent />,
    component: ViewCashBook,
    identity: 'accountreports',
  },
  {
    label: 'Bank Book',
    key: '/view-bank-book',
    path: '/view-bank-book',
    mainkey: '/view-bank-book',
    element: <MainComponent />,
    component: ViewBankBook,
    identity: 'accountreports',
  },
  {
    label: 'Journal Register',
    key: '/view-journal-register',
    path: '/view-journal-register',
    mainkey: '/view-journal-register',
    element: <MainComponent />,
    component: ViewJournalRegister,
    identity: 'accountreports',
  },
  {
    label: 'Ledger Account',
    key: '/view-ledger-account',
    path: '/view-ledger-account',
    mainkey: '/view-ledger-account',
    element: <MainComponent />,
    component: ViewLedgerAccount,
    identity: 'accountreports',
  },
  {
    label: 'Purchase Invoice Register',
    key: '/view-purchase-invoice-reg',
    path: '/view-purchase-invoice-reg',
    mainkey: '/view-purchase-invoice-reg',
    element: <MainComponent />,
    component: ViewPurchaseInvoice,
    identity: 'accountreports',
  },
  {
    label: 'Purchase Return Register',
    key: '/view-purchase-return-reg',
    path: '/view-purchase-return-reg',
    mainkey: '/view-purchase-return-reg',
    element: <MainComponent />,
    component: ViewPurchaseReturn,
    identity: 'accountreports',
  },
 
  {
    label: 'Credit Note Register',
    key: '/view-credit-note-report',
    path: '/view-credit-note-report',
    mainkey: '/view-credit-note-report',
    element: <MainComponent />,
    component: ViewCreditNote,
    identity: 'accountreports',
  },
  {
    label: 'Debit Note Register',
    key: '/view-debit-note-report',
    path: '/view-debit-note-report',
    mainkey: '/view-debit-note-report',
    element: <MainComponent />,
    component: ViewDebitNote,
    identity: 'accountreports',
  },
  {
    label: 'Credit Note(with GST) Register',
    key: '/view-credit-note-gst-report',
    path: '/view-credit-note-gst-report',
    mainkey: '/view-credit-note-gst-report',
    element: <MainComponent />,
    component: ViewCreditNoteGst,
    identity: 'accountreports',
  },
  {
    label: 'Debit Note(with GST) Register',
    key: '/view-debit-note-gst-report',
    path: '/view-debit-note-gst-report',
    mainkey: '/view-debit-note-gst-report',
    element: <MainComponent />,
    component: ViewDebitNoteGst,
    identity: 'accountreports',
  },
  {
    label: 'Service Expense Register',
    key: '/view-service-expense-report',
    path: '/view-service-expense-report',
    mainkey: '/view-service-expense-report',
    element: <MainComponent />,
    component: ViewServiceExpense ,
    identity: 'accountreports',
  },
  {
    label: 'Trial Balance',
    key: '/view-trial-balance',
    path: '/view-trial-balance',
    mainkey: '/view-trial-balance',
    element: <MainComponent />,
    component: ViewTrialBalance ,
    identity: 'accountreports',
  },
  {
    label: 'Payment Advice',
    key: '/view-payment-advice',
    path: '/view-payment-advice',
    mainkey: '/view-payment-advice',
    element: <MainComponent />,
    component: BankPaymentAdvice ,
    identity: 'accountreports',
  },


 
  
];
