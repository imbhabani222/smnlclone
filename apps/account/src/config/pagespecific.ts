import { AccountConfigMenu } from './routes/accountConfig';
import { AccountManagementMenu } from './routes/accountManagement';
// import { ProductConfigurationMenu } from './routes/productConfiguration';

const pageSpecific = [...AccountConfigMenu,...AccountManagementMenu,{
    url: '/',
    title: 'Home',
    isBreadcrumb: true,
    buttonTitle: 'Home',
    backUrl: '',
    mainmodule: '',
  },];

export default pageSpecific;
