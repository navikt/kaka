import { AppThemeSwitcher } from '@app/components/user-menu/app-theme';
import { ENVIRONMENT } from '@app/environment';
import { BranchingIcon, LeaveIcon } from '@navikt/aksel-icons';
import { ActionMenu, Tooltip } from '@navikt/ds-react';

export const UserDropdown = (): React.JSX.Element | null => {
  const { version } = ENVIRONMENT;

  return (
    <ActionMenu.Content className="w-auto max-w-75 overflow-visible">
      <ActionMenu.Group label="Tema">
        <ActionMenu.Item as={AppThemeSwitcher} />
      </ActionMenu.Group>

      <ActionMenu.Divider />

      <ActionMenu.Group label="Bruker">
        <ActionMenu.Item
          as="a"
          href="/oauth2/logout"
          data-testid="logout-link"
          className="cursor-pointer text-ax-text-danger"
          variant="danger"
          icon={<LeaveIcon />}
        >
          Logg ut
        </ActionMenu.Item>
      </ActionMenu.Group>

      <ActionMenu.Divider />

      <ActionMenu.Group label="System">
        <Tooltip content="Kopierer versjonsnummeret til versjonen du bruker nå" placement="left">
          <ActionMenu.Item
            title="Klikk for å kopiere versjonsnummeret"
            icon={<BranchingIcon aria-hidden />}
            onSelect={() => navigator.clipboard.writeText(version)}
            className="cursor-pointer"
          >
            Kaka-versjon: {version}
          </ActionMenu.Item>
        </Tooltip>
      </ActionMenu.Group>
    </ActionMenu.Content>
  );
};
