import { Textarea } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { useKlageenheter } from '@app/simple-api-state/use-kodeverk';
import { useUser } from '@app/simple-api-state/use-user';
import { ANNET_TEXTS } from '@app/types/kvalitetsvurdering/texts/texts';
import { HeadingWithHelpText } from './common/heading-with-helptext';
import { useKvalitetsvurderingV2 } from './common/use-kvalitetsvurdering-v2';
import { useValidationError } from './common/use-validation-error';

const { label, helpText, description } = ANNET_TEXTS.annetFritekst;

export const Annet = () => {
  const isInKlageenhet = useIsInKlageenhet();

  if (!isInKlageenhet) {
    return null;
  }

  return <CommentLoader />;
};

const useIsInKlageenhet = () => {
  const { data: user, isLoading: userIsLoading } = useUser();
  const { data: klageenheter, isLoading: klageenheterIsLoading } = useKlageenheter();

  if (userIsLoading || klageenheterIsLoading || typeof user === 'undefined' || typeof klageenheter === 'undefined') {
    return false;
  }

  return klageenheter.some(({ id }) => id === user.ansattEnhet.id);
};

const CommentLoader = () => {
  const { isLoading, kvalitetsvurdering, update } = useKvalitetsvurderingV2();
  const validationError = useValidationError('annetFritekst');

  if (isLoading) {
    return null;
  }

  const onChange = (annetFritekst: string) => update({ annetFritekst });

  return <Comment value={kvalitetsvurdering.annetFritekst} onChange={onChange} error={validationError} />;
};

interface CommentProps {
  value: string | null;
  error?: string;
  onChange: (value: string) => void;
}

const Comment = ({ onChange, value, error }: CommentProps) => {
  const [text, setText] = useState(value ?? '');
  const canEdit = useCanEdit();

  useEffect(() => {
    if (value === text) {
      return;
    }

    const timeout = setTimeout(() => onChange(text), 1000);

    return () => clearTimeout(timeout);
  }, [text, onChange, value]);

  return (
    <Textarea
      hideLabel={false}
      onChange={({ target }) => setText(target.value)}
      disabled={!canEdit}
      value={text}
      error={error}
      data-testid="annetFritekst"
      label={<HeadingWithHelpText helpText={helpText}>{label}</HeadingWithHelpText>}
      description={description}
    />
  );
};
