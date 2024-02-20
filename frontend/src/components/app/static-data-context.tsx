import React, { createContext, useEffect, useState } from 'react';
import { AppLoader } from '@app/components/app/loader';
import { user } from '@app/static-data/static-data';
import { IUser } from '@app/types/user';

interface Props {
  children: React.ReactNode;
}

interface StaticData {
  user: IUser;
}

export const StaticDataContext = createContext<StaticData>({
  user: {
    ident: '',
    navn: {
      fornavn: '',
      etternavn: '',
      sammensattNavn: '',
    },
    roller: [],
    ansattEnhet: { id: '', navn: '' },
  },
});

export const StaticDataLoader = ({ children }: Props) => {
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    user.then(setUserData);
  }, []);

  if (userData === null) {
    return <AppLoader text="Laster bruker..." />;
  }

  return <StaticDataContext.Provider value={{ user: userData }}>{children}</StaticDataContext.Provider>;
};
