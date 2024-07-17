import { Alert, Button, ButtonProps } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useLovkildeToRegistreringshjemmelForYtelse, useYtelseParams } from '@app/hooks/use-kodeverk-value';
import { useOnClickOutside } from '@app/hooks/use-on-click-outside';
import { GroupedDropdown } from '../../../dropdown/grouped-dropdown';
import { ErrorMessage } from '../../../error-message/error-message';

interface LovhjemmelSelectProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  disabled?: boolean;
  error?: string;
  'data-testid'?: string;
  showFjernAlle?: boolean;
  show: boolean;
  id?: string;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  children: string;
  icon?: React.ReactNode;
}

export const LovhjemmelSelect = ({
  onChange,
  selected,
  disabled,
  error,
  'data-testid': testId,
  showFjernAlle,
  show,
  id,
  size = 'medium',
  variant = 'primary',
  children,
  icon,
}: LovhjemmelSelectProps) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ytelseParams = useYtelseParams();
  const lovKildeToRegistreringshjemler = useLovkildeToRegistreringshjemmelForYtelse(ytelseParams);

  useOnClickOutside(() => setOpen(false), containerRef);

  const options = useMemo(
    () =>
      lovKildeToRegistreringshjemler.map(({ lovkilde, registreringshjemler }) => ({
        sectionHeader: { id: lovkilde.id, name: lovkilde.navn },
        sectionOptions: registreringshjemler.map(({ id: value, navn }) => ({ value, label: navn })),
      })),
    [lovKildeToRegistreringshjemler],
  );

  if (!show) {
    return null;
  }

  if (ytelseParams === skipToken) {
    return (
      <Alert inline variant="warning">
        Velg en ytelse for å se hjemler
      </Alert>
    );
  }

  const setSelected = (selectedId: string | null, active: boolean) => {
    if (selectedId === null) {
      onChange([]);

      return;
    }

    const newList = active
      ? [...selected, selectedId]
      : selected.filter((selectedValue: string) => selectedValue !== selectedId);

    onChange(newList);
  };

  const toggleOpen = () => setOpen(!open);
  const close = () => setOpen(false);

  return (
    <Container data-testid={testId} data-selected={selected.join(',')} ref={containerRef}>
      <StyledButton
        ref={buttonRef}
        id={id}
        variant={variant}
        size={size}
        onClick={toggleOpen}
        disabled={options.length === 0 || disabled}
        icon={icon}
      >
        {children}
      </StyledButton>

      <GroupedDropdown
        selected={selected}
        options={options}
        open={open}
        onChange={setSelected}
        close={close}
        showFjernAlle={showFjernAlle}
        maxHeight="400px"
        width="100%"
        testId="lovhjemmel-dropdown"
      />
      <ErrorMessage error={error} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;
