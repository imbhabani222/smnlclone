/* eslint-disable no-lone-blocks */
import React, { useEffect, useState, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import styles from './masterlayout.module.scss';
import { Topbar } from './Topbar/topbar';
import { Footer } from './Footer/footer';
// import { Sidebar } from './Sidebar/sidebar';
// import { Panel } from '../ui/Panel/Panel';
import Cookies from 'universal-cookie';
// import { Button, Drawer } from 'antd';
// import { HeaderNavigation } from '../ui/HeaderNavigation/headerNavigation';
import { ReactComponent as MoreIcon } from '../assets/More.svg';
import { ReactComponent as SidebarLogo } from '../assets/SidebarLogo.svg';
// import { HeaderPageButton } from '../ui/Header_Page_Button/headerPageButton';
import { getBlockedModulesFormUser, getRecordById } from '../api/doctype';

// import {
//   AppstoreOutlined,
//   MailOutlined,
//   SettingOutlined,
// } from '@ant-design/icons';
// import { ReactComponent as PlusIcon } from "../../assets/Plus.svg";
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
interface MenuItem {
  label: string;
  link?: string;
  subMenu?: any;
}

interface PageState {
  url: string;
  title: string;
  isBreadcrumb?: boolean;
  buttonTitle?: string;
  createUrl?: string;
  viewtitle?: string;
  backUrl: string;
  tabs?: Array<Object>;
  currentTab: Number;
  multipleButtons: Array<any>;
  mainmodule?: string;
  isexport?: boolean;
  isviewBreadcrumb?: boolean;
  isFilter?: boolean;
}

interface MasterLayoutProps {
  component: ReactNode;
  menus: any;
  pageSpecific?: any;
  allRoutes?: any;
  handlePermissions?: any;
  appName?: any;
}
function checkActiveSubmenu(e: string) {
  return false;
}

const MasterLayout = ({
  component,
  menus,
  pageSpecific,
  allRoutes,
  handlePermissions,
  appName,
}: MasterLayoutProps) => {
  const cookies = new Cookies();
  const userid = cookies.get('useremail');
  const roleid = cookies.get('role');
  const navigate = useNavigate();
  const location = useLocation();
  const [openDrawer, setopenDrawer] = useState<any>({
    key: '',
    open: false,
    subMenu: {},
  });
  const [drawerWidth, setDrawerWidth] = useState<string>('0px');
  const [mainmenus, setmainmenus] = useState<any>({
    mainMenu: menus,
    moreMenu: menus.slice(5),
  });

  const [identity, setidentity] = useState(null);
  const [subidentity, setsubidentity] = useState(null);
  const [page, setpage] = useState<PageState>({
    url: '',
    title: '',
    isBreadcrumb: false,
    buttonTitle: '',
    multipleButtons: [{}],
    createUrl: '',
    viewtitle: '',
    backUrl: '',
    tabs: [{}],
    currentTab: 0,
    mainmodule: '',
    isexport: false,
    isviewBreadcrumb: false,
    isFilter: false,
  });

  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [blockmoduleData, setblockmoduleData] = useState([]);

  const rootSubmenuKeys = ['8', '9', '10', '11', '12'];

  useEffect(() => {
    if (roleid) {
      const datar = { roleid: roleid };
      const datarols = { role_name: roleid };

      getRecordById('modules', datar, 'master_data', 'htssuite').then(
        (item) => {
          // const allowmodules: any = {};
          // item.modules?.[0]?.hrms?.map((e: any) => {
          //   allowmodules[e] = true;
          // });
          // console.log(allowmodules, item);
          const allowmodules: any = [];
          item.modules?.[0]?.hrms &&
            item.modules?.[0]?.hrms?.length > 0 &&
            allowmodules.push(...item.modules?.[0]?.hrms);
          item.modules?.[0]?.inventory &&
            item.modules?.[0]?.inventory?.length > 0 &&
            allowmodules.push(...item.modules?.[0]?.inventory);
          item.modules?.[0]?.operation &&
            item.modules?.[0]?.operation?.length > 0 &&
            allowmodules.push(...item.modules?.[0]?.operation);
          item.modules?.[0]?.account &&
            item.modules?.[0]?.account?.length > 0 &&
            allowmodules.push(...item.modules?.[0]?.account);

          setblockmoduleData(allowmodules);
          // setformValue({
          //   role_name: items?.role_name,
          //   ...allowmodules,
          // });
        }
      );
      // getBlockedModulesFormUser(roleid, 'htssuite').then((e: any) =>
      //   setblockmoduleData(e)
      // );
    }
  }, [roleid]);
  // findPage();
  useEffect(() => {
    if (allRoutes && allRoutes?.length > 0) {
      const identity = allRoutes.find((e: any) => e.path === location.pathname);

      if (identity?.identity) {
        setidentity(identity?.identity);
      } else {
        setidentity(null);
      }
      if (identity?.subidentity) {
        setsubidentity(identity?.subidentity);
      } else {
        setsubidentity(null);
      }
    } else {
      // @ts-ignore
      setidentity('/not-set');
    }
  }, [location?.pathname]);

  const CheckBlock = (e: { type: string; identity: string }) => {
    if (e && e?.type !== 'home') {
      const cb = Array.isArray(blockmoduleData)
        ? blockmoduleData?.find(
            (i: string) =>
              e?.identity?.toLowerCase() ===
                i?.toLowerCase()?.replace('hrms', '') ||
              e?.identity?.toLowerCase() ===
                i?.toLowerCase()?.replace('inventory', '') ||
              e?.identity?.toLowerCase() ===
                i?.toLowerCase()?.replace('account', '') ||
              e?.identity?.toLowerCase() ===
                i?.toLowerCase()?.replace('operation', '')
          )
        : undefined;

      if (cb) {
        return true;
      }
      // return false;
      return true;
    }
    return true;
  };

  useEffect(() => {
    const data = menus.filter((i: any) => CheckBlock(i));

    const sidebarHeight = document.querySelector('#sidebar')?.clientHeight;
    const logoHeight = document.querySelector('#topHeader')?.clientHeight;
    const elementHeight: any = document.querySelector('.module')?.clientHeight;

    const d = elementHeight ? elementHeight + 10 : 10;
    let displayNumber = 0;

    if (sidebarHeight && logoHeight && d) {
      const no = (sidebarHeight - logoHeight) / d;
      displayNumber = Math.floor(no || 6) - 1;
    }

    if (data && data.length && displayNumber) {
      setmainmenus({
        mainMenu: data.slice(0, displayNumber),
        moreMenu: data?.length > displayNumber ? data.slice(displayNumber) : [],
      });
    } else {
      setmainmenus({
        mainMenu: [],
        moreMenu: [],
      });
    }
  }, [blockmoduleData, menus]);

  const handleSubMenu = (e: any) => {
    if (
      e === 'more' &&
      mainmenus?.moreMenu &&
      mainmenus?.moreMenu?.length > 0
    ) {
      setopenDrawer((pre: any) => ({
        ...pre,
        key: e,
        open: !pre?.open,
        subMenu: mainmenus?.moreMenu,
      }));
    }
  };

  const handleSubmenus = (e: any) => {
    {
      e && navigate(e?.link);
    }
    setopenDrawer({
      ...openDrawer,
      open: false,
      headermenu: e && e?.submenu,
    });
  };

  const hanldeAllSubMenu = (e: any) => {
    // handlePermissions(e);
    if (e?.subMenu && e?.subMenu?.length > 0) {
      setopenDrawer({
        key: e?.identity,
        open: true,
        subMenu: e?.subMenu,
      });
    } else {
      navigate(e?.link);
      setopenDrawer({
        ...openDrawer,
        open: false,
      });
    }
  };
  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };
  const subitemVariants = {
    closed: {
      x: '-100vw',
    },
    open: { x: 0, transition: { type: 'tween' } },
  };
  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  return (
    <div className={styles.master_layout_container}>
      <div className={styles.panel}>
        <div id="sidebar" className={styles.sidebar}>
          <div id="topHeader" className={styles.topHeader}>
            <SidebarLogo />
          </div>
          <motion.ul
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants}
          >
            {mainmenus?.mainMenu?.map((i: any) => (
              <motion.li
                onClick={() => hanldeAllSubMenu(i)}
                className={
                  identity == i?.identity
                    ? `${styles.activemenu} module`
                    : 'module'
                }
                variants={itemVariants}
              >
                <motion.div
                  style={{ height: '100%' }}
                  whileHover={{ scale: 1.3 }}
                >
                  {<i.icon />}
                </motion.div>
                {i.label}
              </motion.li>
            ))}
            {mainmenus?.moreMenu && mainmenus?.moreMenu?.length > 0 ? (
              <motion.li
                onClick={() => handleSubMenu('more')}
                className={styles.more}
                //  whileHover={{ scale: 1.1, originX: 1.1 }}
                variants={itemVariants}
              >
                <motion.div
                  style={{ height: '100%' }}
                  whileHover={{ scale: 1.3 }}
                >
                  <MoreIcon />
                </motion.div>
                More
              </motion.li>
            ) : null}
          </motion.ul>
          <div
            className={
              openDrawer?.open
                ? styles.sidedrawer
                : styles.sideadrawerwithoutwidth
            }
          >
            {openDrawer?.open ? (
              <motion.div
                // initial={{ width: 0 }}
                // animate={{
                //   width: '220px',
                // }}
                // exit={{
                //   width: 0,
                //   transition: { delay: 0.5, duration: 0.1 },
                // }}
                className={styles.submenuDrawer}
              >
                <motion.ul
                  initial="closed"
                  animate="open"
                  // exit="closed"
                  // variants={sideVariants}
                >
                  <AnimatePresence>
                    {openDrawer?.subMenu?.map((i: any) => (
                      <motion.li
                        onClick={() => handleSubmenus(i)}
                        whileHover={{ scale: 1.1 }}
                        variants={subitemVariants}
                        className={
                          identity == i?.identity || subidentity === i?.identity
                            ? styles.activemenu
                            : ''
                        }
                      >
                        {i?.icon ? <i.icon /> : null}
                        {i?.label}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              </motion.div>
            ) : null}
          </div>
        </div>
        <div>
          <Topbar appName={appName} />

          <div
            className={styles.content}
            onClick={() =>
              setopenDrawer({
                open: false,
              })
            }
          >
            {component}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default MasterLayout;
