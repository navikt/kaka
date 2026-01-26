import { sortWithOrdinals } from '@app/functions/sort-with-ordinals';
import { useLovkildeToRegistreringshjemler } from '@app/simple-api-state/use-kodeverk';
import type { IYtelse } from '@app/types/kodeverk';
import { ActionMenu, Button, Checkbox, CheckboxGroup, HStack, TextField, VStack } from '@navikt/ds-react';
import { type ReactElement, useMemo, useState } from 'react';

interface Props {
  relevantYtelser: IYtelse[];
  selectedHjemler: string[];
  setSelectedHjemler: (hjemler: string[]) => void;
  trigger: ReactElement;
}

type Option = {
  lovkildeLabel: string;
  lovkildeId: string;
  hjemler: { label: string; value: string }[];
};

export const SelectHjemler = ({ relevantYtelser, selectedHjemler, setSelectedHjemler, trigger }: Props) => {
  const [value, setValue] = useState('');
  const options: Option[] = useOptions(relevantYtelser);
  const filteredOptions = useFilteredOptions(options, value);

  const filteredItems = useMemo(
    () =>
      filteredOptions.map(({ lovkildeLabel: label, lovkildeId, hjemler }) => (
        <CheckboxGroup key={lovkildeId} legend={label} value={selectedHjemler} onChange={setSelectedHjemler}>
          {hjemler.map(({ label: hjemmelLabel, value: hjemmelId }) => (
            // <Checkbox> renders much faster than <ActionMenu.CheckboxItem>
            <Checkbox size="small" key={hjemmelId} value={hjemmelId}>
              {hjemmelLabel}
            </Checkbox>
          ))}
        </CheckboxGroup>
      )),
    [filteredOptions, selectedHjemler, setSelectedHjemler],
  );

  const all = useMemo(() => options.flatMap(({ hjemler }) => hjemler.map(({ value }) => value)), [options]);

  return (
    <ActionMenu>
      <ActionMenu.Trigger>{trigger}</ActionMenu.Trigger>
      <ActionMenu.Content className="relative">
        <HStack wrap={false} className="sticky top-0 z-1 bg-ax-bg-default">
          <TextField
            size="small"
            autoFocus
            className="grow"
            placeholder="Filtrer"
            label="Registreringshjemler"
            hideLabel
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Button onClick={() => setSelectedHjemler(all)} size="small" variant="secondary" style={{ marginLeft: 8 }}>
            Velg alle
          </Button>

          <Button
            data-color="danger"
            onClick={() => setSelectedHjemler([])}
            size="small"
            variant="primary"
            style={{ marginLeft: 8 }}
          >
            Fjern alle
          </Button>
        </HStack>

        <ActionMenu.Divider />

        <VStack gap="space-8">{filteredItems}</VStack>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

const useOptions = (relevantYtelser: IYtelse[]): Option[] => {
  const { data: lovkildeToRegistreringshjemler = [] } = useLovkildeToRegistreringshjemler();

  return useMemo(() => {
    const hjemler: Map<string, Map<string, string>> = new Map();

    // Create map with unique entries
    for (const ytelse of relevantYtelser) {
      for (const { registreringshjemler, lovkilde } of ytelse.lovKildeToRegistreringshjemler) {
        for (const hjemmel of registreringshjemler) {
          const existing = hjemler.get(lovkilde.id);

          if (existing === undefined) {
            hjemler.set(lovkilde.id, new Map().set(hjemmel.id, hjemmel.navn));
          } else {
            existing.set(hjemmel.id, hjemmel.navn);
          }
        }
      }
    }

    // Create (iterable) array and sort
    return Array.from(hjemler.entries())
      .map(([lovkildeId, hjemlerMap]) => ({
        lovkildeId,
        lovkildeLabel: lovkildeToRegistreringshjemler.find((l) => l.id === lovkildeId)?.navn ?? lovkildeId,
        hjemler: Array.from(hjemlerMap.entries())
          .toSorted(([, a], [, b]) => sortWithOrdinals(a, b))
          .map(([value, label]) => ({ label, value })),
      }))
      .toSorted((a, b) => sortWithOrdinals(a.lovkildeLabel, b.lovkildeLabel));
  }, [relevantYtelser, lovkildeToRegistreringshjemler]);
};

const useFilteredOptions = (options: Option[], value: string) =>
  useMemo(() => {
    let isFilteredByHjemmel = false;

    const filteredByHjemmel = options
      .map(({ hjemler, ...rest }) => ({
        ...rest,
        hjemler: hjemler.filter(({ label }) => {
          const filtered = label.toLowerCase().includes(value.toLowerCase());

          if (filtered) {
            isFilteredByHjemmel = true;
          }

          return filtered;
        }),
      }))
      .filter(({ hjemler }) => hjemler.length > 0);

    if (isFilteredByHjemmel) {
      return filteredByHjemmel;
    }

    // Filter by lovkilde instead
    return options.filter((option) => option.lovkildeLabel.toLowerCase().includes(value.toLowerCase()));
  }, [options, value]);
