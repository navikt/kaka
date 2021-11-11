import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { Fragment } from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useUpdateKvalitetsvurderingMutation } from '../../../redux-api/kvalitetsvurdering';
import { IKvalitetsvurderingBooleans } from '../../../types/kvalitetsvurdering';
import { CommentField } from './comment-field';
import { ReasonsField, StyledCheckboxContainer } from './styled-components';

interface ReasonsProps {
  reasons: Reason[];
  show?: boolean;
  legendText?: string;
}

export interface Reason {
  id: keyof IKvalitetsvurderingBooleans;
  label: string;
  textareaId?: string;
  helpText?: string;
  show?: boolean;
  checked: boolean;
}

export const Reasons = ({ show = true, legendText = '', reasons }: ReasonsProps) => {
  const [kvalitetsvurdering, isLoading] = useKvalitetsvurdering();
  const [updateKvalitetsvurdering] = useUpdateKvalitetsvurderingMutation();
  const canEdit = useCanEdit();

  if (isLoading) {
    return <NavFrontendSpinner />;
  }

  if (!show || typeof kvalitetsvurdering === 'undefined') {
    return null;
  }

  const { id } = kvalitetsvurdering;

  return (
    <ReasonsField>
      <CheckboxGruppe legend={legendText}>
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
    </ReasonsField>
  );
};

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
