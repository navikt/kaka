import { Checkbox, CheckboxGroup, HelpText } from '@navikt/ds-react';
import React, { Fragment, forwardRef } from 'react';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { useKvalitetsvurdering } from '@app/hooks/use-kvalitetsvurdering';
import { useUpdateKvalitetsvurderingMutation } from '@app/redux-api/kvalitetsvurdering/v1';
import { IKvalitetsvurderingTexts } from '@app/types/kvalitetsvurdering/v1';
import { CommentField } from './comment-field';
import { StyledCheckboxContainer } from './styled-components';
import { Reason } from './types';

export interface CheckboxesProps {
  reasons: Reason[];
  legendText?: string;
  error?: string | undefined;
}

export const Checkboxes = forwardRef<HTMLDivElement, CheckboxesProps>(({ reasons, legendText, error }, ref) => {
  const [kvalitetsvurdering, isLoading] = useKvalitetsvurdering();
  const [updateKvalitetsvurdering] = useUpdateKvalitetsvurderingMutation();
  const canEdit = useCanEdit();

  if (isLoading) {
    return null;
  }

  if (typeof kvalitetsvurdering === 'undefined') {
    return null;
  }

  const { id } = kvalitetsvurdering;
  const value = reasons.filter(({ checked }) => checked).map((r) => r.id);

  return (
    <div ref={ref}>
      <CheckboxGroup legend={legendText} error={error} value={value}>
        {reasons
          .filter((reason) => reason.show !== false)
          .map((reason) => {
            const showTextArea = reason.checked && typeof reason.textareaId !== 'undefined';

            return (
              <Fragment key={reason.id}>
                <StyledCheckboxContainer>
                  <Checkbox
                    value={reason.id}
                    onChange={({ target }) => updateKvalitetsvurdering({ id, [reason.id]: target.checked })}
                    disabled={!canEdit}
                  >
                    {reason.label}
                  </Checkbox>
                  <HjelpetekstDisplay helpText={reason.helpText} />
                </StyledCheckboxContainer>
                <CommentFieldDisplay textareaId={reason.textareaId} show={showTextArea} />
              </Fragment>
            );
          })}
      </CheckboxGroup>
    </div>
  );
});

Checkboxes.displayName = 'Checkboxes';

interface CommentFieldDisplayProps {
  textareaId: keyof IKvalitetsvurderingTexts | undefined;
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

  return <HelpText placement="right">{helpText}</HelpText>;
};
