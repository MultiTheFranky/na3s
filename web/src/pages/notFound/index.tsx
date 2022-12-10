import { Loading } from '../../components/loading/index';
import * as React from 'react';
/**
 *
 * @returns {JSX.Element}
 */
export const NotFound = () => {

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    loading ? (
      <Loading />
    ) : (
      <div>
        <h1>404</h1>
        <h2>Page not found</h2>
      </div>
    )
  );
};
