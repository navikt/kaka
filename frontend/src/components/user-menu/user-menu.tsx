import { CogRotationIcon, LeaveIcon } from '@navikt/aksel-icons';
import { Dropdown, Header } from '@navikt/ds-react-internal';
import React from 'react';
import { css, styled } from 'styled-components';
import { useUser } from '@app/simple-api-state/use-user';
import { CopyButton } from '../copy-button/copy-button';

export const UserMenu = () => {
  const { data: user } = useUser();

  return (
    <Dropdown>
      <Header.UserButton as={Dropdown.Toggle} name={user?.navn.sammensattNavn ?? 'Laster...'} />
      <UserDropdown />
    </Dropdown>
  );
};

const UserDropdown = () => {
  const version = process.env.VERSION ?? 'UKJENT';

  return (
    <Menu>
      <Dropdown.Menu.List>
        <Dropdown.Menu.List.Item as={StyledLogoutLink} href="/oauth2/logout">
          <LeaveIcon /> Logg ut
        </Dropdown.Menu.List.Item>
        <Dropdown.Menu.List.Item
          as={StyledCopyButton}
          title="Klikk for å kopiere versjonsnummeret"
          text={version}
          icon={<CogRotationIcon aria-hidden />}
        >
          Kaka-versjon: <VersionNumber>{getShortVersion(version)}</VersionNumber>
        </Dropdown.Menu.List.Item>
      </Dropdown.Menu.List>
    </Menu>
  );
};

const Menu = styled(Dropdown.Menu)`
  overflow: visible;
  width: auto;
  max-width: 300px;

  & .navds-body-short {
    font-size: 16px;
  }
`;

const VersionNumber = styled.code`
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const getShortVersion = (version: string): string => {
  if (version.length <= 7) {
    return version;
  }

  return version.substring(0, 7) + '...';
};

const linkStyle = css`
  & {
    display: flex;
    gap: 8px;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const StyledLink = styled.a`
  ${linkStyle}
`;

const StyledLogoutLink = styled(StyledLink)`
  color: #c30000;
`;

const StyledCopyButton = styled(CopyButton)`
  ${linkStyle}

  white-space: nowrap;
  width: 100%;
`;
