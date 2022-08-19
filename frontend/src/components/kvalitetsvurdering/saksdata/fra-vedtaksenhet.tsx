import { Label } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useEnheterForYtelse, useKlageenheterForYtelse } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useSetVedtaksinstansenhetMutation } from '../../../redux-api/saksdata';
import { IKodeverkSimpleValue } from '../../../types/kodeverk';
import { SakstypeEnum } from '../../../types/sakstype';
import { SingleSelectDropdown } from '../../dropdown/single-select-dropdown';
import { ErrorMessage } from '../../error-message/error-message';
import { ToggleButton } from '../../toggle/toggle-button';

export const FraVedtaksenhet = () => {
  const saksdataId = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [setVedtaksenhet] = useSetVedtaksinstansenhetMutation();
  const canEdit = useCanEdit();
  const enheter = useEnheterForYtelse(saksdata?.ytelseId ?? skipToken); // Sakstype klage uses enheter
  const klageenheter = useKlageenheterForYtelse(saksdata?.ytelseId ?? skipToken); // Sakstype anke uses klageenheter
  const validationError = useValidationError('vedtaksinstansEnhet');
  const [open, setOpen] = useState(false);

  const options = useMemo(() => {
    if (saksdata?.sakstypeId === SakstypeEnum.ANKE) {
      return klageenheter;
    }

    if (saksdata?.sakstypeId === SakstypeEnum.KLAGE) {
      return enheter;
    }

    return [];
  }, [saksdata?.sakstypeId, klageenheter, enheter]);

  const selectedEnhetName = useEnhetName(options, saksdata?.vedtaksinstansEnhet);

  if (typeof saksdata === 'undefined') {
    return null;
  }

  if (typeof saksdata === 'undefined') {
    return null;
  }

  if (!canEdit) {
    return (
      <div>
        <StyledLabel size="medium" spacing>
          Fra vedtaksenhet
        </StyledLabel>
        <Container data-testid="fra-vedtaksenhet-select">{selectedEnhetName ?? 'Ingen enhet'}</Container>
        <ErrorMessage error={validationError} />
      </div>
    );
  }

  if (saksdata.ytelseId === null) {
    return (
      <div>
        <StyledLabel size="medium" spacing>
          Fra vedtaksenhet
        </StyledLabel>
        <Container data-testid="fra-vedtaksenhet-select">Velg ytelse</Container>
        <ErrorMessage error={validationError} />
      </div>
    );
  }

  const noEnheter = options.length === 0;

  if (noEnheter) {
    return (
      <div>
        <StyledLabel size="medium" spacing>
          Fra vedtaksenhet
        </StyledLabel>
        <Container data-testid="fra-vedtaksenhet-select">Ingen enheter</Container>
        <ErrorMessage error={validationError} />
      </div>
    );
  }

  const onChange = (vedtaksinstansEnhet: string) => {
    setVedtaksenhet({ id: saksdataId, vedtaksinstansEnhet });
    close();
  };

  const close = () => setOpen(false);

  return (
    <div>
      <StyledLabel size="medium" spacing htmlFor="vedtaksinstansEnhet">
        Fra vedtaksenhet
      </StyledLabel>
      <Container data-testid="fra-vedtaksenhet-select">
        <ToggleButton
          id="vedtaksinstansEnhet"
          theme={{ open }}
          onClick={() => setOpen(!open)}
          error={typeof validationError !== 'undefined'}
        >
          {selectedEnhetName ?? 'Ingen enhet'}
        </ToggleButton>
        <SingleSelectDropdown
          selected={saksdata.vedtaksinstansEnhet}
          kodeverk={options}
          open={open}
          onChange={onChange}
          close={close}
          labelFn={({ id, navn }) => `${id} - ${navn}`}
        />
      </Container>
      <ErrorMessage error={validationError} />
    </div>
  );
};

const useEnhetName = (options: IKodeverkSimpleValue[], enhetsNummer: string | null | undefined) =>
  useMemo(() => {
    if (typeof enhetsNummer !== 'string') {
      return 'Ingen enhet';
    }

    const enhet = options.find((option) => option.id === enhetsNummer);

    if (typeof enhet === 'undefined') {
      return 'Ingen enhet';
    }

    return `${enhet.id} - ${enhet.navn}`;
  }, [options, enhetsNummer]);

const Container = styled.section`
  position: relative;
  z-index: 5;
`;

const StyledLabel = styled(Label)`
  display: block;
`;
