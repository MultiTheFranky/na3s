import {useEffect, useState} from 'react';

/**
 *
 * @param width:Screen's width
 * @returns {boolean}
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const width = 768;

  useEffect(() => {
    /**
     * @returns {void}
     */
    const handleResize = () => {
      setIsMobile(window.innerWidth <= width);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return isMobile;
};
