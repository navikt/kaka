import { ContainerWithHelpText } from '@app/components/kvalitetsvurdering/kvalitetsskjema/common/container-with-helptext';
import type { TextParams } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/common/types';
import { useKvalitetsvurderingV2 } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/common/use-kvalitetsvurdering-v2';
import { useValidationError } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/common/use-validation-error';
import { SavedStatus } from '@app/components/saved-status/saved-status';
import { useCanEdit } from '@app/hooks/use-can-edit';
import type { IKvalitetsvurderingBooleans } from '@app/types/kvalitetsvurdering/v2';
import { BodyLong, HStack, Label, Textarea } from '@navikt/ds-react';
import { useEffect, useState } from 'react';

interface Props extends TextParams {
  parentKey?: keyof IKvalitetsvurderingBooleans;
}

export const KvalitetsskjemaTextarea = (props: Props) => {
  const { kvalitetsvurdering, isLoading } = useKvalitetsvurderingV2();
  const canEdit = useCanEdit();

  if (isLoading) {
    return null;
  }

  const { label, helpText, field } = props;

  if (!canEdit) {
    return (
      <div>
        <ContainerWithHelpText helpText={helpText}>
          <Label htmlFor={field}>{label}</Label>
        </ContainerWithHelpText>
        <BodyLong id={field} className="mt-1 border-ax-border-neutral-subtle border-l-2 pl-2">
          {kvalitetsvurdering[field]}
        </BodyLong>
      </div>
    );
  }

  return <KvalitetsskjemaTextareaInternal {...props} initialValue={kvalitetsvurdering[field] ?? ''} />;
};

interface InternalProps extends Props {
  initialValue: string;
}

const KvalitetsskjemaTextareaInternal = ({
  label,
  helpText,
  field,
  parentKey,
  description,
  initialValue,
}: InternalProps) => {
  const { kvalitetsvurdering, isLoading, update, updateStatus } = useKvalitetsvurderingV2();
  const [localValue, setLocalValue] = useState<string>(initialValue);
  const error = useValidationError(field);

  useEffect(() => {
    if (
      isLoading ||
      localValue === kvalitetsvurdering[field] ||
      (localValue === '' && kvalitetsvurdering[field] === null)
    ) {
      return;
    }

    const timeout = setTimeout(() => update({ [field]: localValue?.length === 0 ? null : localValue }), 1000);

    return () => clearTimeout(timeout);
  }, [field, isLoading, kvalitetsvurdering, localValue, update]);

  if (isLoading || localValue === null) {
    return null;
  }

  const show = parentKey === undefined ? true : kvalitetsvurdering[parentKey];

  if (!show) {
    return null;
  }

  return (
    <>
      <Textarea
        label={<ContainerWithHelpText helpText={helpText}>{label}</ContainerWithHelpText>}
        value={localValue}
        onChange={({ target }) => setLocalValue(target.value)}
        description={description}
        error={error}
      />
      <HStack justify="end" align="center" className="mt-1">
        <SavedStatus {...updateStatus} />
      </HStack>
    </>
  );
};
