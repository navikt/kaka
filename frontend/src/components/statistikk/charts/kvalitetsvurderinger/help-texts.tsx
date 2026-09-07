import { BodyShort, Button, HStack, Label } from '@navikt/ds-react';
import { Fragment, useMemo, useState } from 'react';
import type { ReasonLabel } from '../../../kvalitetsvurdering/kvalitetsskjema/v1/reasons-labels';

interface Props {
  relevantReasons: ReasonLabel[];
}

interface HelpfulReasonLabel extends ReasonLabel {
  helpText: string;
}

export const HelpTexts = ({ relevantReasons }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const relevantReasonHelpTexts = useMemo(() => relevantReasons.filter(hasHelpText), [relevantReasons]);

  const hasHelpTexts = relevantReasonHelpTexts.length > 0;

  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)} disabled={!hasHelpTexts} size="small" iconPosition="right">
        <HStack as="span" gap="space-8">
          {getButtonPrefix(isOpen, hasHelpTexts)} hjelpetekster
        </HStack>
      </Button>
      <ShowHelpTexts isOpen={isOpen} relevantReasons={relevantReasonHelpTexts} />
    </div>
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
      <Label>{label}</Label>
      <BodyShort size="small" spacing>
        {helpText}
      </BodyShort>
    </Fragment>
  ));

  return <dl>{descriptions}</dl>;
};
