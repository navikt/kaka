import { ErrorMessage } from '@app/components/error-message/error-message';
import { SelectHjemler } from '@app/components/filters/common/select-hjemler';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useYtelserLatest } from '@app/simple-api-state/use-kodeverk';
import { Button, type ButtonProps, InlineMessage, VStack } from '@navikt/ds-react';
import { useMemo } from 'react';

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
  variant: ButtonProps['variant'];
  children: string;
  icon?: React.ReactNode;
}

export const LovhjemmelSelect = ({
  onChange,
  selected,
  disabled,
  error,
  'data-testid': testId,
  show,
  id,
  size = 'medium',
  variant,
  children,
  icon,
}: LovhjemmelSelectProps) => {
  const { data } = useSaksdata();
  const { data: ytelser = [] } = useYtelserLatest();

  const ytelse = useMemo(() => ytelser.find((ytelse) => ytelse.id === data?.ytelseId), [data?.ytelseId, ytelser]);

  if (!show) {
    return null;
  }

  if (ytelse === undefined) {
    return <InlineMessage status="warning">Velg en ytelse for å se hjemler</InlineMessage>;
  }

  return (
    <VStack gap="space-4">
      <SelectHjemler
        trigger={
          <Button variant={variant} icon={icon} size={size} data-testid={testId} id={id} disabled={disabled}>
            {children}
          </Button>
        }
        relevantYtelser={[ytelse]}
        selectedHjemler={selected}
        setSelectedHjemler={onChange}
      />
      <ErrorMessage error={error} />
    </VStack>
  );
};
