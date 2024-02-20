import { useContext } from 'react';
import { StaticDataContext } from '@app/components/app/static-data-context';

export const useUser = () => {
  const { user } = useContext(StaticDataContext);

  return user;
};
