import { GeneralSetupMenu } from './routes/generalSetup';
import { ProductConfigurationMenu } from './routes/productConfiguration';

import { PurchaseManagementMenu } from './routes/purchaseManagement';
import { InventoryManagementMenu } from './routes/inventoryManagement';

import { FuelManagementMenu } from './routes/fuelManagement';
import { HomeSubMenu } from './routes/home';

const pageSpecific = [
  ...HomeSubMenu,
  ...GeneralSetupMenu,
  ...ProductConfigurationMenu,
  ...PurchaseManagementMenu,
  ...InventoryManagementMenu,
  ...FuelManagementMenu,
];

export default pageSpecific;
