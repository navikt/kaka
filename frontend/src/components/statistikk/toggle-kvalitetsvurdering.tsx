import { ToggleGroup } from '@navikt/ds-react';
import { styled } from 'styled-components';
import type { KvalitetsvurderingProps } from './charts/kvalitetsvurderinger/kvalitetsvurdering';
import { KVALITETSVURDERING_OPTIONS, isAllowedKey } from './charts/kvalitetsvurderinger/kvalitetsvurdering-options';
import { useKvalitetsvurderingParam } from './hooks/use-kvalitetsvurdering-param';

export const ToggleKvalitetsvurdering = () => {
  const [field, setField] = useKvalitetsvurderingParam();

  const setKvalitetsvurdering = (kvalitetsvurderingId: KvalitetsvurderingProps['field']) => {
    setField(kvalitetsvurderingId);
  };

  return (
    <Container>
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
