import { HeaderNavigation } from '../../../../../libs/common/ui/HeaderNavigation/headerNavigation';
import { Panel } from '../../../../../libs/common/ui/Panel';
import { Home_Sub_Menu } from './route';
import { useLocation } from 'react-router-dom';
type Props = {};

const View = (props: Props) => {
  const location = useLocation();

  const compt = () => {
    const comp: any = Home_Sub_Menu.find(
      (e: any) => e.path === location.pathname
    );
    return <comp.component />;
  };

  return (
    <div>
      {/* <HeaderNavigation menus={Home_Sub_Menu} />
      <Panel> */}
      <div style={{ margin: '15px 20px' }}>{compt()}</div>
      {/* </Panel> */}
    </div>
  );
};

export default View;
