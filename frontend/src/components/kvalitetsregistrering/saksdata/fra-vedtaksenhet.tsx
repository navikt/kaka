import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useEnheterForYtelse, useKlageenheterForYtelse } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useSetVedtaksinstansenhetMutation } from '../../../redux-api/saksdata';
import { IKodeverkValue } from '../../../types/kodeverk';
import { SakstypeEnum } from '../../../types/sakstype';
import { SingleSelectDropdown } from '../../dropdown/single-select-dropdown';
import { ErrorMessage } from '../../error-message/error-message';
import { ToggleButton } from '../../toggle/toggle-button';
import { StyledHeader, StyledItem } from './styled-components';

export const FraVedtaksenhet = () => {
  const saksdataId = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [setVedtaksenhet] = useSetVedtaksinstansenhetMutation();
  const canEdit = useCanEdit();
  const enheter = useEnheterForYtelse(saksdata?.ytelseId ?? skipToken); // Sakstype klage uses enheter
  const ankeenheter = useKlageenheterForYtelse(saksdata?.ytelseId ?? skipToken); // Sakstype anke uses klageenheter
  const validationError = useValidationError('vedtaksinstansEnhet');
  const [open, setOpen] = useState(false);

  const options = useMemo(() => {
    if (typeof saksdata === 'undefined') {
      return [];
    }

    return saksdata.sakstypeId === SakstypeEnum.ANKE ? ankeenheter : enheter;
  }, [saksdata, ankeenheter, enheter]);

  const selectedEnhetName = useEnhetName(options, saksdata?.vedtaksinstansEnhet ?? null);

  if (typeof saksdata === 'undefined') {
    return null;
  }

  if (typeof saksdata === 'undefined') {
    return null;
  }

  if (!canEdit) {
    return (
      <StyledItem>
        <StyledHeader>Fra vedtaksenhet:</StyledHeader>
        <Container data-testid="fra-vedtaksenhet-select">{selectedEnhetName ?? 'Ingen enhet'}</Container>
        <ErrorMessage error={validationError} />
      </StyledItem>
    );
  }

  if (saksdata.ytelseId === null) {
    return (
      <StyledItem>
        <StyledHeader>Fra vedtaksenhet:</StyledHeader>
        <Container data-testid="fra-vedtaksenhet-select">Velg ytelse</Container>
        <ErrorMessage error={validationError} />
      </StyledItem>
    );
  }

  const noEnheter = options.length === 0;

  if (noEnheter) {
    return (
      <StyledItem>
        <StyledHeader>Fra vedtaksenhet:</StyledHeader>
        <Container data-testid="fra-vedtaksenhet-select">Ingen enheter</Container>
        <ErrorMessage error={validationError} />
      </StyledItem>
    );
  }

  const onChange = (vedtaksinstansEnhet: string) => {
    setVedtaksenhet({ id: saksdataId, vedtaksinstansEnhet });
    close();
  };

  const close = () => setOpen(false);

  return (
    <StyledItem>
      <StyledHeader>Fra vedtaksenhet:</StyledHeader>
      <Container data-testid="fra-vedtaksenhet-select">
        <ToggleButton theme={{ open }} onClick={() => setOpen(!open)} error={typeof validationError !== 'undefined'}>
          {selectedEnhetName ?? 'Ingen enhet'}
        </ToggleButton>
        <SingleSelectDropdown
          selected={saksdata.vedtaksinstansEnhet}
          kodeverk={options}
          open={open}
          onChange={onChange}
          close={close}
          labelFn={({ navn, beskrivelse }) => `${navn} - ${beskrivelse}`}
        />
      </Container>
      <ErrorMessage error={validationError} />
    </StyledItem>
  );
};

const useEnhetName = (options: IKodeverkValue[], id: string | null) =>
  useMemo<string | null>(
    () => (id !== null ? options.find((option) => option.id === id)?.beskrivelse ?? null : null),
    [options, id]
  );

const Container = styled.section`
  position: relative;
  z-index: 5;
  min-width: 210px;
  width: fit-content;
`;
