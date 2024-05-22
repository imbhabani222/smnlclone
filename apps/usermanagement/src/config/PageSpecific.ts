import { TravelMenu } from './routes/travel';
import { MasterDataMenu } from './routes/masterData';
import { LeaveMenu } from './routes/leaveManagement';
import { AssetMenu } from './routes/assetManagement';
import { EmployeeManagementMenu } from './routes/employeeManagement';
import { ExpenseMenu } from './routes/expenses';
import { LoanMenu } from './routes/loanAdvance';
import { PayrollConfigMenu } from './routes/payrollConfiguration';
import { UtilitiesMenu } from './routes/utility';
import { HomeSubMenu } from './routes/home';

const pageSpecific = [
  ...TravelMenu,
  ...MasterDataMenu,
  ...LeaveMenu,
  ...AssetMenu,
  ...EmployeeManagementMenu,
  ...ExpenseMenu,
  ...PayrollConfigMenu,
  ...LoanMenu,
  ...UtilitiesMenu,
  ...HomeSubMenu,
];

export default pageSpecific;
