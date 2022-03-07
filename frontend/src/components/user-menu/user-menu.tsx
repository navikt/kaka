import { AutomaticSystem, Collapse, Expand, Logout, People } from '@navikt/ds-icons';
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { CopyButton } from '../copy-button/copy-button';

export const UserMenu = () => {
  const { data: user } = useGetUserDataQuery();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const close = () => setIsOpen(false);
  useOnClickOutside(close, ref);

  const Icon = isOpen ? Collapse : Expand;

  return (
    <Container ref={ref}>
      <StyledButton title="Åpne brukermeny" onClick={() => setIsOpen(!isOpen)}>
        <People />
        {user?.navn.sammensattNavn ?? 'Laster...'}
        <Icon />
      </StyledButton>
      <Menu isOpen={isOpen} />
    </Container>
  );
};

interface MenuProps {
  isOpen: boolean;
}

const Menu = ({ isOpen }: MenuProps) => {
  if (!isOpen) {
    return null;
  }

  const version = process.env.VERSION ?? 'UKJENT';

  return (
    <StyledList>
      <StyledLi>
        <StyledLink href="/logout">
          <Logout />
          Logg ut
        </StyledLink>
      </StyledLi>
      <StyledLi>
        <CopyButton title="Klikk for å kopiere versjonsnummeret" text={version}>
          <AutomaticSystem />
          KAKA Versjon: <VersionNumber>{version}</VersionNumber>
        </CopyButton>
      </StyledLi>
    </StyledList>
  );
};

const iconText = css`
  & {
    display: flex;
    gap: 8px;
    align-items: center;
  }
`;

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const VersionNumber = styled.code`
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledLink = styled.a`
  ${iconText}
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const StyledList = styled.ul`
  position: absolute;
  right: 0;
  top: 100%;
  list-style: none;
  background-color: #3e3832;
  color: #fff;
  padding: 0;
  margin: 0;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
`;

const StyledLi = styled.li`
  padding: 0;
  border-top: 1px solid #fff;
  white-space: nowrap;

  :hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const StyledButton = styled.button`
  ${iconText}
  border: none;
  padding: 0;
  padding-right: 16px;
  margin: 0;
  background: transparent;
  color: white;
  cursor: pointer;
  height: 100%;
`;
