import { useState, useEffect } from 'react';

import { useGetWindowWidth } from './useGetWindowWidth';

/**
 * Change number of grid's columns based on window's width
 @returns {number} number of columns
 */

export const useColumnsNumber = () => {
  const dimensions = useGetWindowWidth(); // window's width
  const [columns, setColumns] = useState(3); // nbr of columns wanted

  const setResponsiveColumns = () => {
    if (dimensions <= 760) {
      setColumns(1);
    } else if (dimensions >= 761 && dimensions < 980) {
      setColumns(2);
    } else {
      setColumns(3);
    }
  };

  useEffect(() => {
    setResponsiveColumns();
  }, [dimensions]);

  return columns;
};
