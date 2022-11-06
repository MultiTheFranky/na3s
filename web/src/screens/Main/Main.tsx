import React, {CSSProperties, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import Sidebar from 'src/components/Sidebar';
import {ROUTES} from 'src/utils/enums';

import Dashboard from '../Dashboard';

interface IComponents {
  [key: string]: React.FC;
}

/**
 *
 * @returns {React.FC}
 */
const Main: React.FC = () => {
  const components: IComponents = {
    [ROUTES.home]: Dashboard,
    [ROUTES.root]: Dashboard,
  };

  const {pathname} = useLocation();

  const Content = useMemo(() => {
    const basePathname = `/${pathname.split('/')[1]}`;
    return components[basePathname];
  }, [pathname]);

  return (
    <Container style={styles.root}>
      <Sidebar />
      <Container style={styles.body}>{Content ? <Content /> : null}</Container>
    </Container>
  );
};

export default Main;

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'center',
    width: '100%',
    height: '100vh',
    maxWidth: 'none',
  } as CSSProperties,
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 'calc(100% - 208px)',
    maxWidth: '2200px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '37px',
    paddingBottom: '37px',
  } as CSSProperties,
};
