import AlertStripe from 'nav-frontend-alertstriper';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isReduxValidationResponse } from '../../../functions/error-type-guard';
import { useKvalitetsvurderingIsFinished } from '../../../hooks/use-kvalitetsvurdering-is-finished';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { ArrowDown } from '../../../icons/arrow-down';
import { ArrowUp } from '../../../icons/arrow-up';
import { useFullfoerMutation } from '../../../redux-api/saksdata';
import { ValidationSummary } from './validation-summary';

interface Props {
  hasErrors: boolean;
}

export const ValidationSummaryPopup = ({ hasErrors }: Props) => {
  const [open, setOpen] = useState(true);
  const id = useSaksdataId();
  const [, { error }] = useFullfoerMutation({ fixedCacheKey: id });
  const isFullfoert = useKvalitetsvurderingIsFinished();

  useEffect(() => {
    if (!isReduxValidationResponse(error)) {
      return;
    }

    if (error.data.sections.length !== 0) {
      setOpen(true);
    }
  }, [error]);

  if (isFullfoert) {
    return (
      <AlertStripe type="suksess" form="inline">
        Fullført kvalitetsvurdering
      </AlertStripe>
    );
  }

  if (!isReduxValidationResponse(error) || error.data.sections.length === 0) {
    return null;
  }

  const toggleOpen = () => setOpen(!open);

  const icon = open ? <ArrowDown fill="#262626" /> : <ArrowUp fill="#262626" />;

  const statusText = hasErrors ? 'Feil i utfyllingen' : 'Under utfylling';
  const statusType = hasErrors ? 'advarsel' : 'info';

  return (
    <>
      <StyledButton onClick={toggleOpen}>
        <AlertStripe type={statusType} form="inline">
          <StyledStatusText>{statusText}</StyledStatusText>
          {icon}
        </AlertStripe>
      </StyledButton>
      {open && (
        <StyledPopup>
          <StyledIconButton onClick={toggleOpen}>{icon}</StyledIconButton>
          <ValidationSummary sections={error.data.sections} />
        </StyledPopup>
      )}
    </>
  );
};

const StyledPopup = styled.div`
  position: absolute;
  bottom: 4em;
  right: 1em;
  width: 400px;
`;

const StyledButton = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
`;

const StyledStatusText = styled.span`
  margin-right: 1em;
`;

const StyledIconButton = styled(StyledButton)`
  position: absolute;
  right: 0;
  padding: 1em;
`;
