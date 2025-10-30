import { AddOptionButton } from '@app/components/filters/comparison/comparison-values/add-option-button';
import { ColorPicker } from '@app/components/filters/comparison/comparison-values/color-picker';
import { DEFAULT_OPTIONS } from '@app/components/filters/comparison/comparison-values/default-options';
import { StyledComparisonItem } from '@app/components/filters/comparison/comparison-values/styled-components';
import { useOnchange } from '@app/components/filters/comparison/comparison-values/use-onchange';
import type { ColorToken } from '@app/components/statistikk/colors/token-name';
import { useLovkildeToRegistreringshjemler, useRegistreringshjemlerMap } from '@app/simple-api-state/use-kodeverk';
import type { IKodeverkSimpleValue } from '@app/types/kodeverk';
import type { OptionValue } from '@app/types/statistics/common';
import { ChevronDownIcon, TrashIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button, Heading, VStack } from '@navikt/ds-react';
import { useMemo } from 'react';

const useNextOption = (data: IKodeverkSimpleValue[]): string | undefined => {
  const { selectedValues } = useOnchange();
  const options = useMemo(() => [...data, ...DEFAULT_OPTIONS], [data]);
  const availableOptions = useMemo(
    () => options.filter((e) => !selectedValues.some(([id]) => id === e.id)),
    [options, selectedValues],
  );
  const availableOptionIds = availableOptions.map((e) => e.id);
  const [nextOption] = availableOptionIds;

  return nextOption;
};

export const Hjemler = () => {
  const { selectedValues, add } = useOnchange();
  const { data: registreringshjemlerMap = {} } = useRegistreringshjemlerMap();

  const ids = useMemo(
    () =>
      Object.entries(registreringshjemlerMap).map(([id, { hjemmelnavn }]) => ({
        id,
        navn: hjemmelnavn,
      })),
    [registreringshjemlerMap],
  );

  const nextOption = useNextOption(ids);

  return (
    <>
      <AddOptionButton option={nextOption} onAdd={add} />

      {selectedValues.map(([id, color]) => (
        <HjemmelSelect key={id} value={id} color={color} />
      ))}
    </>
  );
};

const useLovkildeToRegistreringshjemlerOptions = (selectedValues: OptionValue[]) => {
  const { data = [] } = useLovkildeToRegistreringshjemler();

  const selectedIds = useMemo(() => selectedValues.map(([v]) => v), [selectedValues]);

  const hjemmelOptions = useMemo(
    () =>
      data.map(({ id, navn, registreringshjemler }) => ({
        sectionHeader: { id, name: navn },
        sectionOptions: registreringshjemler.map((h) => ({ value: h.id, label: h.navn })),
      })),
    [data],
  );

  const defaultOptions = useMemo(
    () =>
      DEFAULT_OPTIONS.filter(({ id }) => !selectedIds.includes(id)).map(({ id, navn }) => ({ value: id, label: navn })),
    [selectedIds],
  );

  if (defaultOptions.length === 0) {
    return hjemmelOptions;
  }

  return [...hjemmelOptions, { sectionHeader: { id: 'default', name: 'Statistikk' }, sectionOptions: defaultOptions }];
};

const HjemmelSelect = ({ value, color }: { value: string; color: ColorToken }) => {
  const { selectedValues, remove, setId, setColor } = useOnchange();
  const options = useLovkildeToRegistreringshjemlerOptions(selectedValues);

  const { data: hjemler = {} } = useRegistreringshjemlerMap();

  const label = hjemler[value]?.hjemmelnavn ?? DEFAULT_OPTIONS.find(({ id }) => id === value)?.navn ?? value;

  return (
    <StyledComparisonItem>
      <ActionMenu>
        <ActionMenu.Trigger>
          <Button
            variant="secondary-neutral"
            icon={<ChevronDownIcon aria-hidden />}
            iconPosition="right"
            size="small"
            className="justify-between! flex grow"
          >
            {label}
          </Button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <VStack gap="2">
            {options.map(({ sectionHeader, sectionOptions }) => (
              <VStack key={sectionHeader.id}>
                <Heading size="small">{sectionHeader.name ?? 'Ukjent'}</Heading>
                {sectionOptions.map(({ value: hjemmelId, label: hjemmelLabel }) => (
                  <Button
                    size="small"
                    variant={value === hjemmelId ? 'primary-neutral' : 'tertiary-neutral'}
                    className="justify-start! flex"
                    key={hjemmelId}
                    onClick={() => setId(value, hjemmelId)}
                  >
                    {hjemmelLabel}
                  </Button>
                ))}
              </VStack>
            ))}
          </VStack>
        </ActionMenu.Content>
      </ActionMenu>

      <ColorPicker color={color} onChange={(newColor) => setColor(value, newColor)} />
      <Button onClick={() => remove(value)} size="small" icon={<TrashIcon aria-hidden />} variant="danger" />
    </StyledComparisonItem>
  );
};
