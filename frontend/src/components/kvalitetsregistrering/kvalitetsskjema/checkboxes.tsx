import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useUpdateKvalitetsvurderingMutation } from '../../../redux-api/kvalitetsvurdering';
import { CommentField } from './comment-field';
import { Reason } from './reasons';
import { StyledCheckboxContainer } from './styled-components';

export interface CheckboxesProps {
  reasons: Reason[];
  legendText?: string;
  error?: string | undefined;
}

export const Checkboxes = React.forwardRef<HTMLDivElement, CheckboxesProps>(({ reasons, legendText, error }, ref) => {
  const [kvalitetsvurdering, isLoading] = useKvalitetsvurdering();
  const [updateKvalitetsvurdering] = useUpdateKvalitetsvurderingMutation();
  const canEdit = useCanEdit();

  if (isLoading) {
    return <NavFrontendSpinner />;
  }

  if (typeof kvalitetsvurdering === 'undefined') {
    return null;
  }

  const { id } = kvalitetsvurdering;

  return (
    <Wrapper ref={ref}>
      <CheckboxGruppe legend={legendText} feil={error}>
        {reasons
          .filter((reason) => reason.show !== false)
          .map((reason) => {
            const showTextArea = reason.checked === true && typeof reason.textareaId !== 'undefined';
            return (
              <Fragment key={String(reason.id)}>
                <StyledCheckboxContainer>
                  <Checkbox
                    label={reason.label}
                    value={reason.id}
                    checked={reason.checked}
                    onChange={({ target }) =>
                      updateKvalitetsvurdering({
                        id,
                        [reason.id]: target.checked,
                      })
                    }
                    disabled={!canEdit}
                  />
                  <HjelpetekstDisplay helpText={reason.helpText} />
                </StyledCheckboxContainer>
                <CommentFieldDisplay textareaId={reason.textareaId} show={showTextArea} />
              </Fragment>
            );
          })}
      </CheckboxGruppe>
    </Wrapper>
  );
});

Checkboxes.displayName = 'Checkboxes';

const Wrapper = styled.div`
  margin-top: 10px;
`;

interface CommentFieldDisplayProps {
  textareaId: string | undefined;
  show: boolean;
}

const CommentFieldDisplay = ({ textareaId, show }: CommentFieldDisplayProps) => {
  if (!show || typeof textareaId === 'undefined') {
    return null;
  }

  return <CommentField textareaId={textareaId} />;
};

interface HjelpetekstDisplayProps {
  helpText: string | undefined;
}

const HjelpetekstDisplay = ({ helpText }: HjelpetekstDisplayProps) => {
  if (typeof helpText === 'undefined') {
    return null;
  }

  return <Hjelpetekst>{helpText}</Hjelpetekst>;
};
