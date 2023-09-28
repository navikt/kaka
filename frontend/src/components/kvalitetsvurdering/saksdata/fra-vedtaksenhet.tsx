import { Label } from '@navikt/ds-react';
import React, { useMemo, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { useEnheterForYtelse, useKlageenheterForYtelse, useYtelseParams } from '@app/hooks/use-kodeverk-value';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useValidationError } from '@app/hooks/use-validation-error';
import { useSetVedtaksinstansenhetMutation } from '@app/redux-api/saksdata';
import { IKodeverkSimpleValue } from '@app/types/kodeverk';
import { SakstypeEnum } from '@app/types/sakstype';
import { SingleSelectDropdown } from '../../dropdown/single-select-dropdown';
import { ErrorMessage } from '../../error-message/error-message';
import { ToggleButton } from '../../toggle/toggle-button';

export const FraVedtaksenhet = () => {
  const saksdataId = useSaksdataId();
  const { data: saksdata } = useSaksdata();
  const [setVedtaksenhet] = useSetVedtaksinstansenhetMutation();
  const canEdit = useCanEdit();
  const ytelseParams = useYtelseParams();
  const enheter = useEnheterForYtelse(ytelseParams); // Sakstype klage uses enheter
  const klageenheter = useKlageenheterForYtelse(ytelseParams); // Sakstype anke uses klageenheter
  const validationError = useValidationError('vedtaksinstansEnhet');
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
        <SelectedEnhet data-testid="selected-vedtaksenhet" data-value={saksdata.vedtaksinstansEnhet}>
          {selectedEnhetName ?? 'Ingen enhet'}
        </SelectedEnhet>
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
        <SelectedEnhet data-testid="selected-vedtaksenhet">Velg ytelse</SelectedEnhet>
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
        <SelectedEnhet data-testid="selected-vedtaksenhet">Ingen enheter</SelectedEnhet>
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
    <Container>
      <StyledLabel size="medium" spacing htmlFor="vedtaksinstansEnhet">
        Fra vedtaksenhet
      </StyledLabel>
      <ToggleButton
        id="vedtaksinstansEnhet"
        $open={open}
        onClick={() => setOpen(!open)}
        $error={typeof validationError !== 'undefined'}
        data-value={saksdata.vedtaksinstansEnhet}
        ref={buttonRef}
      >
        {selectedEnhetName ?? 'Ingen enhet'}
      </ToggleButton>
      <SingleSelectDropdown
        buttonRef={buttonRef.current}
        selected={saksdata.vedtaksinstansEnhet}
        kodeverk={options}
        open={open}
        onChange={onChange}
        close={close}
        labelFn={({ id, navn }) => `${id} - ${navn}`}
        testId="fra-vedtaksenhet-dropdown"
        width="100%"
      />
      <ErrorMessage error={validationError} />
    </Container>
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

const SelectedEnhet = styled.section`
  position: relative;
  z-index: 5;
`;

const StyledLabel = styled(Label)`
  display: block;
`;

const Container = styled.div`
  position: relative;
`;
