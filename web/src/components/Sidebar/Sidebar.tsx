import React, {CSSProperties, useEffect} from 'react';
import {
  Menu,
  MenuItem,
  Sidebar as SidebarPro,
  useProSidebar,
} from 'react-pro-sidebar';
import {Link} from 'react-router-dom';
// Utils
import {MAIN_COLOR} from 'src/utils/colors';
import {useIsMobile} from 'src/utils/hooks/useIsMobile';

/**
 *
 * @returns {React.FC} Sidebar Component
 */
const Sidebar: React.FC = () => {
  const {toggleSidebar} = useProSidebar();

  const mobile = useIsMobile();

  useEffect(() => {
    if (mobile) toggleSidebar();
  }, [mobile]);

  return (
    <SidebarPro
      style={styles.sidebar}
      backgroundColor={MAIN_COLOR}
      breakPoint={'xs'}>
      <Menu style={styles.menu}>
        <MenuItem routerLink={<Link to="/home" />}>Home</MenuItem>
      </Menu>
    </SidebarPro>
  );
};

export default Sidebar;

const styles = {
  sidebar: {
    height: '100%',
  } as CSSProperties,

  menu: {
    padding: '5%',
  } as CSSProperties,
};
