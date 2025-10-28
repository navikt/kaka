import { SubSection } from '@app/components/kvalitetsvurdering/kvalitetsskjema/common/styled-components';
import { useKvalitetsvurderingV3 } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/common/use-kvalitetsvurdering-v3';
import { sortWithOrdinals } from '@app/functions/sort-with-ordinals';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { usePrevious } from '@app/hooks/use-previous';
import { useRegistreringshjemlerMap } from '@app/simple-api-state/use-kodeverk';
import type {
  KvalitetsvurderingSaksdataHjemlerV3,
  KvalitetsvurderingV3Boolean,
} from '@app/types/kvalitetsvurdering/v3';
import { BodyShort, Checkbox, CheckboxGroup, Heading, VStack } from '@navikt/ds-react';
import { useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import { useValidationError } from './use-validation-error';

const EMPTY_ARRAY: string[] = [];

interface SaksdatahjemlerProps {
  field: keyof KvalitetsvurderingSaksdataHjemlerV3;
  parentKey?: keyof KvalitetsvurderingV3Boolean;
}

export const Saksdatahjemler = ({ field, parentKey }: SaksdatahjemlerProps) => {
  const { hjemler, kvalitetsvurdering, update, isLoading } = useKvalitetsvurderingV3();
  const { data: registreringshjemlerMap, isLoading: registreringshjemlerMapIsLoading } = useRegistreringshjemlerMap();
  const canEdit = useCanEdit();
  const validationError = useValidationError(field);

  const previousSaksdataHjemmelIdList = usePrevious(isLoading ? undefined : hjemler);
  const selectedHjemmelIdList = isLoading ? undefined : kvalitetsvurdering[field];

  useEffect(() => {
    if (!canEdit || isLoading || selectedHjemmelIdList === undefined || previousSaksdataHjemmelIdList === undefined) {
      return;
    }

    if (hjemler.length === 0 || hjemler.length === 1) {
      if (hjemmelIdListsEquals(selectedHjemmelIdList, hjemler)) {
        return;
      }

      update({ [field]: hjemler });

      return;
    }

    if (selectedHjemmelIdList.length > 0) {
      const isUnchanged = hjemmelIdListsEquals(previousSaksdataHjemmelIdList, hjemler);

      if (!isUnchanged) {
        update({ [field]: EMPTY_ARRAY });
      }
    }
  }, [field, isLoading, selectedHjemmelIdList, previousSaksdataHjemmelIdList, hjemler, update, canEdit]);

  if (isLoading || registreringshjemlerMapIsLoading || typeof registreringshjemlerMap === 'undefined') {
    return null;
  }

  const show = parentKey === undefined || kvalitetsvurdering[parentKey];

  if (!show) {
    return null;
  }

  const onChange = (newHjemler: string[]) => {
    if (hjemler.length === 1) {
      return;
    }
    update({ [field]: newHjemler });
  };

  const value = kvalitetsvurdering[field];

  return (
    <SubSection>
      <CheckboxGroup
        legend="Hjemler"
        onChange={onChange}
        value={value}
        disabled={!canEdit}
        error={validationError}
        id={field}
        data-testid={field}
      >
        <HjemmelCheckboxes hjemmelIdList={hjemler} />
      </CheckboxGroup>
    </SubSection>
  );
};

interface HjemmelCheckboxesProps {
  hjemmelIdList: string[];
}

const HjemmelCheckboxes = ({ hjemmelIdList }: HjemmelCheckboxesProps) => {
  const { data: registreringshjemlerMap = {} } = useRegistreringshjemlerMap();

  const children = useMemo(() => {
    if (hjemmelIdList.length === 0) {
      return <ItalicBodyShort>Ingen hjemler valgt under saksdata.</ItalicBodyShort>;
    }

    const map: Record<string, { hjemler: { id: string; label: string }[]; lovkildeLabel: string }> = {};

    for (const hjemmelId of hjemmelIdList) {
      const hjemmel = registreringshjemlerMap[hjemmelId];

      if (hjemmel === undefined) {
        map[UNKNOWN] = map[UNKNOWN] || { hjemler: [], lovkildeLabel: 'Ukjent lovkilde' };
        map[UNKNOWN].hjemler.push({ id: hjemmelId, label: hjemmelId });

        continue;
      }

      const { id } = hjemmel.lovkilde;

      map[id] = map[id] || { hjemler: [], lovkildeLabel: hjemmel.lovkilde.navn };
      map[id].hjemler.push({ id: hjemmelId, label: hjemmel.hjemmelnavn });
    }

    return Object.entries(map)
      .toSorted(([, a], [, b]) => sortWithOrdinals(a.lovkildeLabel, b.lovkildeLabel))
      .map(([lovkildeId, details]) => (
        <div key={lovkildeId} className="ml-4">
          <Heading size="xsmall">{lovkildeId === UNKNOWN ? 'Ukjent lovkilde' : details.lovkildeLabel}</Heading>

          <div>
            {details.hjemler
              .toSorted((a, b) => sortWithOrdinals(a.label, b.label))
              .map(({ id: hjemmelId, label }) => (
                <Checkbox key={hjemmelId} value={hjemmelId}>
                  {label}
                </Checkbox>
              ))}
          </div>
        </div>
      ));
  }, [hjemmelIdList, registreringshjemlerMap]);

  return <VStack gap="4">{children}</VStack>;
};

const hjemmelIdListsEquals = (a: string[] = [], b: string[] = []) => {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((id) => b.includes(id));
};

const ItalicBodyShort = styled(BodyShort)`
  font-style: italic;
`;

const UNKNOWN = 'UNKNOWN';
