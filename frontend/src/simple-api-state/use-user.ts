import { StaticDataContext } from '@app/components/app/static-data-context';
import { useContext } from 'react';

export const useUser = () => {
  const { user } = useContext(StaticDataContext);

  return user;
};
