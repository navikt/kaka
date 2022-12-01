import { Textarea } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../../hooks/use-can-edit';
import { useKvalitetsvurdering } from '../../../../hooks/use-kvalitetsvurdering';
import { useUpdateKvalitetsvurderingMutation } from '../../../../redux-api/kvalitetsvurdering/v1';

interface CommentFieldProps {
  textareaId: string;
}

export const CommentField = ({ textareaId }: CommentFieldProps) => {
  const [kvalitetsvurdering, isLoading] = useKvalitetsvurdering();
  const [updateKvalitetsvurdering] = useUpdateKvalitetsvurderingMutation();
  const canEdit = useCanEdit();

  const [comment, setComment] = useState<string>(kvalitetsvurdering ? kvalitetsvurdering[textareaId] : '');

  useEffect(() => {
    if (typeof kvalitetsvurdering === 'undefined' || kvalitetsvurdering[textareaId] === comment) {
      return;
    }

    const { id } = kvalitetsvurdering;

    const timeout = setTimeout(() => {
      updateKvalitetsvurdering({ id, [textareaId]: comment });
    }, 1000);

    return () => clearTimeout(timeout); // Clear existing timer every time it runs.
  }, [comment, kvalitetsvurdering, textareaId, updateKvalitetsvurdering]);

  if (isLoading || typeof kvalitetsvurdering === 'undefined') {
    return null;
  }

  return (
    <StyledTextarea
      label="Oppsummert i stikkord"
      value={comment ?? ''}
      placeholder="NB: Ingen personopplysninger"
      maxLength={0}
      onChange={({ target }) => setComment(target.value)}
      disabled={!canEdit}
    />
  );
};

const StyledTextarea = styled(Textarea)`
  margin-left: 32px;
`;
