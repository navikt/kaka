import { BodyShort, Heading, Label, ReadMore } from '@navikt/ds-react';
import React from 'react';
import { styled } from 'styled-components';
import { HelpTextContainer } from '@app/components/statistikk/types/common';

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

    return (
      <section key={key}>
        <Heading size="medium" spacing>
          {label}
        </Heading>
        <HelpText texts={texts} />
      </section>
    );
  });

  return <HelpTextsWrapper>{children}</HelpTextsWrapper>;
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

const HelpTextsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
