import React from 'react';
import { HeaderNavigation } from '../../../../../libs/common/ui/HeaderNavigation/headerNavigation';
import { Panel } from '../../../../../libs/common/ui/Panel';
import '../stylesOverride.scss';
import { driverallocation_routes } from './route';
import { useLocation } from 'react-router-dom';
type Props = {};

const View = (props: Props) => {

  const location = useLocation();

  const compt = () => {
    const comp: any = driverallocation_routes?.find(
      (e: any) => e?.path === location.pathname
    );

    return <comp.component props ={comp}/>;
  };

  return (
    <div style={{ height: '100%' }}>
      <HeaderNavigation menus={driverallocation_routes} />
      <Panel>
        <div
          className="contentHeight"
          style={{ margin: '15px 20PX 15px 20px' }}
        >
          {compt()}
        </div>
      </Panel>
    </div>
  );
};

export default View;
