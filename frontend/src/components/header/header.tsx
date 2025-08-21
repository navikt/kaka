import { User } from '@app/components/user-menu/user-menu';
import { InternalHeader, Spacer } from '@navikt/ds-react';
import { NavLink } from 'react-router-dom';

export const NavHeader = () => (
  <InternalHeader className="z-1">
    <InternalHeader.Title as={NavLink} to="/">
      Kaka
    </InternalHeader.Title>
    <Spacer />
    <User />
  </InternalHeader>
);
