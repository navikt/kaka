import { KvalitetsskjemaTextarea } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/common/textarea';
import type { IKvalitetsvurderingBooleans, IKvalitetsvurderingData } from '@app/types/kvalitetsvurdering/v2';
import { CheckboxGroup } from '@navikt/ds-react';
import { useMemo } from 'react';
import { AllRegistreringshjemler } from './all-registreringshjemler';
import { KvalitetsskjemaCheckbox } from './kvalitetsvurdering-checkbox';
import { Saksdatahjemler } from './saksdatahjemler';
import { SubSection } from './styled-components';
import { type CheckboxParams, type GroupErrorField, type InputParams, TypeEnum } from './types';
import { useKvalitetsvurderingV2 } from './use-kvalitetsvurdering-v2';
import { useValidationError } from './use-validation-error';

interface Props {
  kvalitetsvurdering: IKvalitetsvurderingData;
  update: (data: Partial<IKvalitetsvurderingData>) => void;
  childList: InputParams[];
  groupErrorField?: GroupErrorField;
  hideLegend?: boolean;
  label: string;
  parentKey?: keyof IKvalitetsvurderingBooleans;
}

export const Checkboxes = ({
  kvalitetsvurdering,
  label,
  update,
  childList,
  groupErrorField,
  hideLegend,
  parentKey,
}: Props) => {
  const allFields = useMemo(() => getFields(childList), [childList]);
  const value = useMemo(() => allFields.filter((f) => kvalitetsvurdering[f]), [allFields, kvalitetsvurdering]);
  const error = useValidationError(groupErrorField);

  const onChange = (fields: string[]) => {
    for (let i = allFields.length - 1; i >= 0; i--) {
      // biome-ignore lint/style/noNonNullAssertion: Is always defined
      const field = allFields[i]!;
      const isFieldChecked = fields.includes(field);
      const hasChange = kvalitetsvurdering[field] !== isFieldChecked;

      if (hasChange) {
        update({ [field]: isFieldChecked });
        break;
      }
    }
  };

  return (
    <SubSection>
      <CheckboxGroup
        legend={label}
        hideLegend={hideLegend}
        value={value}
        onChange={onChange}
        error={error}
        id={groupErrorField}
      >
        {childList.map((m) => {
          if (isCheckbox(m)) {
            return <Checkbox key={m.field} checkbox={m} />;
          }

          return <KvalitetsskjemaTextarea key={m.field} {...m} parentKey={parentKey} />;
        })}
      </CheckboxGroup>
    </SubSection>
  );
};

interface CheckboxProps {
  checkbox: CheckboxParams;
}

const Checkbox = ({ checkbox }: CheckboxProps) => {
  const { field, label, helpText, saksdatahjemler, allRegistreringshjemler, childList, groupErrorField } = checkbox;

  const { kvalitetsvurdering, isLoading, update } = useKvalitetsvurderingV2();

  if (isLoading) {
    return null;
  }

  const show = childList !== undefined && childList.length !== 0 && kvalitetsvurdering[field] === true;

  return (
    <>
      <KvalitetsskjemaCheckbox field={field} helpText={helpText}>
        {label}
      </KvalitetsskjemaCheckbox>
      {typeof saksdatahjemler === 'undefined' ? null : <Saksdatahjemler field={saksdatahjemler} parentKey={field} />}
      {typeof allRegistreringshjemler === 'undefined' ? null : (
        <AllRegistreringshjemler field={allRegistreringshjemler} parentKey={field} />
      )}
      {show ? (
        <Checkboxes
          kvalitetsvurdering={kvalitetsvurdering}
          childList={childList}
          label={label}
          hideLegend
          groupErrorField={groupErrorField}
          update={update}
          parentKey={field}
        />
      ) : null}
    </>
  );
};

const getFields = (checkboxes: InputParams[]): (keyof IKvalitetsvurderingBooleans)[] =>
  checkboxes.filter(isCheckbox).flatMap((checkbox) => [checkbox.field, ...getFields(checkbox.childList ?? [])]);

const isCheckbox = (checkbox: InputParams): checkbox is CheckboxParams => checkbox.type === TypeEnum.CHECKBOX;
