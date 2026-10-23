import { HStack, ToggleGroup } from '@navikt/ds-react';
import { useBehandlingstidParam } from './hooks/use-behandlingstid-param';
import { BehandlingstidEnum, isBehandlingstidEnum } from './types';

export const ToggleTotalOrKA = () => {
  const [behandlingstid, setBehandlingstid] = useBehandlingstidParam();

  return (
    <HStack justify="center">
      <ToggleGroup
        size="small"
        value={behandlingstid}
        onChange={(key) => {
          if (isBehandlingstidEnum(key)) {
            setBehandlingstid(key);
          }
        }}
      >
        <ToggleGroup.Item value={BehandlingstidEnum.VEDTAKSINSTANS} label="Vedtaksinstans" />
        <ToggleGroup.Item value={BehandlingstidEnum.KA} label="Klageinstans" />
        <ToggleGroup.Item value={BehandlingstidEnum.TOTAL} label="Total" />
      </ToggleGroup>
    </HStack>
  );
};
