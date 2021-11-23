import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useEnheterForYtelse } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useSetVedtaksinstansenhetMutation } from '../../../redux-api/saksdata';
import { EmptyOption } from './empty-option';
import { StyledItem } from './styled-components';

export const FraVedtaksenhet = () => {
  const saksdataId = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [setVedtaksenhet] = useSetVedtaksinstansenhetMutation();
  const canEdit = useCanEdit();
  const enheter = useEnheterForYtelse(saksdata?.ytelseId ?? skipToken);
  const validationError = useValidationError('vedtaksinstansEnhet');

  if (typeof saksdata === 'undefined') {
    return null;
  }

  const onChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const vedtaksinstansEnhet = target.value.length === 0 ? null : target.value;
    setVedtaksenhet({ id: saksdataId, vedtaksinstansEnhet });
  };

  const noEnheter = enheter.length === 0;

  return (
    <StyledItem>
      <Select
        feil={validationError}
        label="Fra vedtaksenhet:"
        onChange={onChange}
        disabled={!canEdit || noEnheter}
        bredde="m"
        value={saksdata.vedtaksinstansEnhet ?? ''}
        data-testid="fra-vedtaksenhet-select"
      >
        <EmptyOption show={saksdata.vedtaksinstansEnhet === null} />
        {enheter.map(({ id, beskrivelse }) => (
          <option key={id} value={id}>
            {beskrivelse}
          </option>
        ))}
      </Select>
    </StyledItem>
  );
};
