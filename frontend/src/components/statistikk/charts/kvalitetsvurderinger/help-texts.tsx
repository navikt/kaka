import { Helptext } from '@navikt/ds-icons';
import { Knapp } from 'nav-frontend-knapper';
import React, { Fragment, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ReasonLabel } from '../../../kvalitetsvurdering/kvalitetsskjema/reasons-labels';

interface Props {
  relevantReasons: ReasonLabel[];
}

interface HelpfulReasonLabel extends ReasonLabel {
  helpText: string;
}

export const HelpTexts = ({ relevantReasons }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const relevantReasonHelpTexts = useMemo(() => relevantReasons.filter(hasHelpText), [relevantReasons]);

  const hasHelpTexts = relevantReasonHelpTexts.length !== 0;

  return (
    <>
      <ToggleButton onClick={() => setIsOpen(!isOpen)} disabled={!hasHelpTexts}>
        {getButtonPrefix(isOpen, hasHelpTexts)} hjelpetekster <Helptext />
      </ToggleButton>
      <ShowHelpTexts isOpen={isOpen} relevantReasons={relevantReasonHelpTexts} />
    </>
  );
};

const getButtonPrefix = (isOpen: boolean, hasHelpTexts: boolean) => {
  if (!hasHelpTexts) {
    return 'Ingen';
  }

  return isOpen ? 'Skjul' : 'Vis';
};

const hasHelpText = (reason: ReasonLabel): reason is HelpfulReasonLabel => typeof reason.helpText === 'string';

interface ShowProps {
  isOpen: boolean;
  relevantReasons: HelpfulReasonLabel[];
}

const ShowHelpTexts = ({ isOpen, relevantReasons }: ShowProps) => {
  if (!isOpen) {
    return null;
  }

  const descriptions = relevantReasons.map(({ label, helpText, id }) => (
    <Fragment key={id}>
      <Title>{label}</Title>
      <Description>{helpText}</Description>
    </Fragment>
  ));

  return <dl>{descriptions}</dl>;
};

const ToggleButton = styled(Knapp)`
  display: flex;
  gap: 8px;
`;

const Title = styled.dt`
  margin-top: 8px;
  font-weight: bold;
`;

const Description = styled.dd`
  margin: 0;
`;
