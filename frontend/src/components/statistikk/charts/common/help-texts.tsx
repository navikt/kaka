import type { HelpTextContainer } from '@app/components/statistikk/types/common';
import { BodyShort, Heading, Label, ReadMore, VStack } from '@navikt/ds-react';

interface Props {
  helpTexts: HelpTextContainer[];
}

export const HelpTexts = ({ helpTexts }: Props) => (
  <ReadMore header="Hjelpetekster">
    <ShowHelpTexts show helpTexts={helpTexts} />
  </ReadMore>
);

interface ShowHelpTextsProps extends Props {
  show: boolean;
}

const ShowHelpTexts = ({ show, helpTexts }: ShowHelpTextsProps) => {
  if (!show || helpTexts.length === 0) {
    return null;
  }

  const children = helpTexts.map(({ label, texts, key }) => {
    if (typeof label !== 'string') {
      return <HelpText key={key} texts={texts} />;
    }

    const hasTexts = Object.values(texts).some(({ helpText }) => helpText !== undefined);

    if (!hasTexts) {
      return null;
    }

    return (
      <section key={key}>
        <Heading size="medium" spacing>
          {label}
        </Heading>
        <HelpText texts={texts} />
      </section>
    );
  });

  return (
    <VStack as="section" gap="space-16">
      {children}
    </VStack>
  );
};

const HelpText = ({ texts }: Pick<HelpTextContainer, 'texts'>) => {
  const children = Object.entries(texts).map(([key, { label, helpText }]) => {
    if (typeof helpText === 'undefined') {
      return null;
    }

    return (
      <section key={key}>
        <Label>{label}</Label>
        <BodyShort size="small" spacing>
          {helpText}
        </BodyShort>
      </section>
    );
  });

  return <>{children}</>;
};
