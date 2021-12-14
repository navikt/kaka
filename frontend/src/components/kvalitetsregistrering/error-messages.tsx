import Alertstripe from 'nav-frontend-alertstriper';
import React from 'react';
import styled from 'styled-components';
import { IValidationError, IValidationSection, isReduxValidationResponse } from '../../functions/error-type-guard';
import { useFieldName } from '../../hooks/use-field-name';
import { useSectionTitle } from '../../hooks/use-section-title';
import { FULLFOER_FIXED_CACHE_KEY, useFullfoerMutation } from '../../redux-api/saksdata';

export const ValidationSummary = () => {
  const [, { error }] = useFullfoerMutation({
    fixedCacheKey: FULLFOER_FIXED_CACHE_KEY,
  });

  if (!isReduxValidationResponse(error)) {
    return null;
  }

  const { sections } = error.data;

  if (sections.length === 0) {
    return null;
  }

  const errorMessages = sections.map(({ section, properties }) => (
    <Section section={section} properties={properties} key={section} />
  ));

  return (
    <StyledAlertStripe type="advarsel">
      <StyledHeader>Kan ikke fullføre vurdering. Dette mangler:</StyledHeader>
      <ValidationSummaryContainer>{errorMessages}</ValidationSummaryContainer>
    </StyledAlertStripe>
  );
};

const Section = ({ properties, section }: IValidationSection) => (
  <StyledSection>
    <SectionTitle>{useSectionTitle(section)}</SectionTitle>

    <StyledFieldList>
      {properties.map((p) => (
        <Field key={p.field} {...p} />
      ))}
    </StyledFieldList>
  </StyledSection>
);

const Field = ({ field, reason }: IValidationError) => (
  <li>
    <strong>{`${useFieldName(field)}: `}</strong>
    <span>{reason}</span>
  </li>
);

const StyledAlertStripe = styled(Alertstripe)`
  position: absolute;
  right: 1em;
  bottom: calc(100% + 1em);
`;

const ValidationSummaryContainer = styled.article`
  margin: 0;
  margin-top: 10px;
  padding: 0;
`;

const StyledFieldList = styled.ul`
  margin: 0;
  padding: 0;
  padding-left: 1em;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
`;

const StyledSection = styled.section`
  margin-top: 10px;
`;

const StyledHeader = styled.h3`
  margin-top: 0;
  font-size: 16px;
`;
