import Alertstripe from 'nav-frontend-alertstriper';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { IValidationError, IValidationSection } from '../../functions/error-type-guard';
import { useFieldName } from '../../hooks/use-field-name';
import { ValidationErrorContext } from './validation-error-context';

export const ValidationSummary = () => {
  const context = useContext(ValidationErrorContext);

  if (typeof context === 'undefined') {
    return null;
  }

  const sections: IValidationSection[] = context.validationSectionErrors;

  if (sections.length === 0) {
    return null;
  }

  const errorMessages = sections.map(({ section, properties }) => (
    <Section section={section} properties={properties} key={section} />
  ));

  return (
    <StyledAlertStripe type="advarsel">
      <StyledHeader>Feil i kvalitetsvurderingen</StyledHeader>
      <ValidationSummaryContainer>{errorMessages}</ValidationSummaryContainer>
    </StyledAlertStripe>
  );
};

const Section = ({ properties }: IValidationSection) => (
  <StyledSection>
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
  margin-bottom: 1em;
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

const StyledSection = styled.section`
  margin-top: 10px;
`;

const StyledHeader = styled.h2`
  margin-top: 0;
`;
