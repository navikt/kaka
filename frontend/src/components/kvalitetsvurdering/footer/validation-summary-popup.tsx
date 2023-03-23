import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Alert } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isReduxValidationResponse } from '../../../functions/error-type-guard';
import { useKvalitetsvurderingIsFinished } from '../../../hooks/use-kvalitetsvurdering-is-finished';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
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
      <Alert variant="success" inline>
        Fullført kvalitetsvurdering
      </Alert>
    );
  }

  if (!isReduxValidationResponse(error) || error.data.sections.length === 0) {
    return null;
  }

  const toggleOpen = () => setOpen(!open);

  const Icon = open ? ChevronDownIcon : ChevronUpIcon;

  const statusText = hasErrors ? 'Feil i utfyllingen' : 'Under utfylling';
  const statusType = hasErrors ? 'warning' : 'info';

  return (
    <>
      <StyledButton onClick={toggleOpen}>
        <Alert variant={statusType} inline>
          <StyledAlertStripeText>
            <StyledStatusText>{statusText}</StyledStatusText>
            <Icon />
          </StyledAlertStripeText>
        </Alert>
      </StyledButton>
      {open && (
        <StyledPopup>
          <StyledIconButton onClick={toggleOpen}>
            <Icon />
          </StyledIconButton>
          <ValidationSummary sections={error.data.sections} />
        </StyledPopup>
      )}
    </>
  );
};

const StyledAlertStripeText = styled.div`
  display: flex;
  align-items: center;
`;

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
  white-space: nowrap;
`;

const StyledStatusText = styled.span`
  margin-right: 1em;
`;

const StyledIconButton = styled(StyledButton)`
  position: absolute;
  right: 0;
  padding: 1em;
`;
