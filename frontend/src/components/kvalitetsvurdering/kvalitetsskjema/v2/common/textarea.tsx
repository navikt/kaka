import { ContainerWithHelpText } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/common/container-with-helptext';
import type { TextParams } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/common/types';
import { useKvalitetsvurderingV2 } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/common/use-kvalitetsvurdering-v2';
import { useValidationError } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/common/use-validation-error';
import { SavedStatus } from '@app/components/saved-status/saved-status';
import { useCanEdit } from '@app/hooks/use-can-edit';
import type { IKvalitetsvurderingBooleans } from '@app/types/kvalitetsvurdering/v2';
import { BodyLong, Label, Textarea } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

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
        <StyledBodyLong id={field}>{kvalitetsvurdering[field]}</StyledBodyLong>
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
      <StatusContainer>
        <SavedStatus {...updateStatus} />
      </StatusContainer>
    </>
  );
};

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 4px;
`;

const StyledBodyLong = styled(BodyLong)`
  border-left: 2px solid var(--a-border-subtle);
  padding-left: 8px;
  margin-top: 4px;
`;
