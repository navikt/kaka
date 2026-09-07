import type { RadiovalgField } from '@app/types/statistics/v1';
import { HStack, ToggleGroup } from '@navikt/ds-react';
import { isAllowedKey, KVALITETSVURDERING_OPTIONS } from './charts/kvalitetsvurderinger/kvalitetsvurdering-options';
import { useKvalitetsvurderingParam } from './hooks/use-kvalitetsvurdering-param';

export const ToggleKvalitetsvurdering = () => {
  const [field, setField] = useKvalitetsvurderingParam();

  const setKvalitetsvurdering = (kvalitetsvurderingId: RadiovalgField) => {
    setField(kvalitetsvurderingId);
  };

  return (
    <HStack justify="center">
      <ToggleGroup
        size="small"
        value={field}
        onChange={(key) => {
          if (isAllowedKey(key)) {
            setKvalitetsvurdering(key);
          }
        }}
      >
        {Object.entries(KVALITETSVURDERING_OPTIONS).map(([key, value]) => (
          <ToggleGroup.Item key={key} value={key}>
            {value.title}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
    </HStack>
  );
};
