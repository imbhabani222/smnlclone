import React, { useEffect, useState } from 'react';
//@ts-ignore
import styles from './sidebar.module.scss';
import { MainMenu } from '../MainMenu/mainmenu';

interface MenuItem {
  label: string;
  link?: string;
}

interface SidebarProps {
  handleDrawerOpen?: (menuItems: MenuItem[]) => void;
  handleDrawerClose?: () => void;
  drawerWidth?: string;
  active?: any;
  menus?: any;
  blockmoduleData?: any;
}

export const Sidebar = ({
  handleDrawerOpen = () => {},
  handleDrawerClose = () => {},
  drawerWidth,
  active,
  menus,
  blockmoduleData,
}: SidebarProps) => {
  const [closeClass, setCloseClass] = useState(false);
  useEffect(() => {
    setCloseClass(!closeClass);
  }, [drawerWidth]);

  return (
    <aside className={styles.sidebar_container}>
      <MainMenu
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        blockmodules={blockmoduleData}
        active={active}
        menus={menus}
      ></MainMenu>

      <div
        className={styles.close_secondary_menu}
        onClick={() => handleDrawerClose()}
      >
        <div className={styles.close_image}>
          <span></span>
          <span className={`${closeClass ? styles.shiftRight : ''} `}></span>
          <span></span>
        </div>
      </div>
    </aside>
  );
};
