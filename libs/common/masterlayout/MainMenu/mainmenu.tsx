import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './mainmenu.module.scss';
// import More from  "/libs/common/assets/More.svg";
import { ReactComponent as More } from '../../../../libs/common/assets/More.svg';

interface MenuItem {
  label: string;
  link?: string;
}

interface MainMenuProps {
  handleDrawerOpen?: (menuItems: MenuItem[]) => void;
  blockmodules?: any;
  active?: any;
  menus?: any;
  handleDrawerClose?: any;
}

export const MainMenu = (MainMenuProps: any) => {
  const navigate = useNavigate();
  const { handleDrawerOpen, blockmodules, active, menus, handleDrawerClose } =
    MainMenuProps;
  const CheckBlock = (e: string) => {
    const cb = Array.isArray(blockmodules)
      ? blockmodules?.find((i: string) => e.toLowerCase() === i.toLowerCase())
      : undefined;
    if (cb) {
      return false;
    }
    return true;
  };

  let isMore = false;

  menus.every((menu: any) => {
    if (menu.label === 'More') {
      isMore = true;
      return false;
    }
    return true;
  });

  const handleHome = () => {
    navigate('/');
    handleDrawerClose();
  };
  return (
    <div className={styles.main_nav_items}>
      {menus?.slice(0, 6).map((menu: any) => {
        if (menu.label === 'Home') {
          return CheckBlock(menu.label) ? (
            <a
              className={`${styles.main_nav_item} ${
                active === menu.identity ? styles.active : null
              }`}
              onClick={() => handleHome()}
              key={menu.key}
            >
              {<menu.icon className={styles.main_nav_image} />}

              <p className={styles.main_nav_name}>Home</p>
            </a>
          ) : null;
        } else {
          return CheckBlock(menu.type) ? (
            <a
              className={`${styles.main_nav_item} ${
                active === menu.identity ? styles.active : null
              }`}
              onClick={() => handleDrawerOpen(menu.subMenu)}
              key={menu.key}
            >
              {<menu.icon className={styles.main_nav_image} />}
              {/* <SettingsIcon className={styles.main_nav_image} /> */}
              <p className={styles.main_nav_name}>{menu.label}</p>
            </a>
          ) : null;
        }
      })}

      {isMore ? (
        <a
          className={`${styles.main_nav_item} `}
          onClick={() => handleDrawerOpen(menus?.slice(6))}
        >
          {<More className={styles.main_nav_image} />}
          {/* <SettingsIcon className={styles.main_nav_image} /> */}
          <p className={styles.main_nav_name}>More</p>
        </a>
      ) : (
        <></>
      )}
    </div>
  );
};
