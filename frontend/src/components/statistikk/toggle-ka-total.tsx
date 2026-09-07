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
        <ToggleGroup.Item value={BehandlingstidEnum.VEDTAKSINSTANS}>Vedtaksinstans</ToggleGroup.Item>
        <ToggleGroup.Item value={BehandlingstidEnum.KA}>Klageinstans</ToggleGroup.Item>
        <ToggleGroup.Item value={BehandlingstidEnum.TOTAL}>Total</ToggleGroup.Item>
      </ToggleGroup>
    </HStack>
  );
};
