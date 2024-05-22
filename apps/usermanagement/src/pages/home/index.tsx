import { DatePicker } from 'antd';

import { Home_sub_menu } from './route';

import { useLocation } from 'react-router-dom';
import styles from './home.module.scss';

type Props = {};

const View = (props: Props) => {
  const { RangePicker } = DatePicker;

  const location = useLocation();

  const compt = () => {
    const comp: any = Home_sub_menu.find(
      (e: any) => e.path === location.pathname
    );
    //klj

    return <comp.component />;
  };

  return (
    <div>
      {/* <Filter /> */}

      {/* <div>

          {/* <Filter /> */}
      <div className={styles.content}>{compt()}</div>
      {/*} </div> */}
    </div>
  );
};

export default View;
