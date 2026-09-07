import { sortWithOrdinals } from '@app/functions/sort-with-ordinals';
import { useLovkildeToRegistreringshjemmelForYtelse, useYtelseParams } from '@app/hooks/use-kodeverk-value';
import type { ILovKildeToRegistreringshjemmel } from '@app/types/kodeverk';
import { VStack } from '@navikt/ds-react';
import { useMemo } from 'react';

interface Props {
  selected: string[];
}

export const SelectedHjemlerList = ({ selected }: Props) => {
  const hjemler = useLovkildeToRegistreringshjemmelForYtelse(useYtelseParams());

  const list = useMemo<ILovKildeToRegistreringshjemmel[]>(
    () =>
      hjemler
        .map(({ lovkilde, registreringshjemler }) => ({
          lovkilde,
          registreringshjemler: registreringshjemler.filter((registreringshjemmel) =>
            selected.includes(registreringshjemmel.id),
          ),
        }))
        .filter(({ registreringshjemler }) => registreringshjemler.length > 0),
    [selected, hjemler],
  );

  return (
    <VStack
      gap="space-16"
      className="mt-2.5 border-ax-border-neutral-subtle border-l-2 pl-4"
      data-testid="selected-hjemler-list"
    >
      <SelectedChildren registreringshjemmelIdList={list} />
    </VStack>
  );
};

const SelectedChildren = ({
  registreringshjemmelIdList,
}: {
  registreringshjemmelIdList: ILovKildeToRegistreringshjemmel[];
}) => {
  if (registreringshjemmelIdList.length === 0) {
    return <p className="m-0 text-ax-text-neutral-subtle">Ingen valgte hjemler</p>;
  }

  return (
    <>
      {registreringshjemmelIdList
        .toSorted((a, b) => sortWithOrdinals(a.lovkilde.navn, b.lovkilde.navn))
        .map(({ lovkilde, registreringshjemler }) => (
          <div key={lovkilde.id}>
            <h3 className="mt-0 mb-1 font-bold text-base">{lovkilde.navn}</h3>

            <VStack as="ul" gap="space-4" className="m-0 list-none pl-2.5">
              {registreringshjemler
                .toSorted((a, b) => sortWithOrdinals(a.navn, b.navn))
                .map(({ navn, id }) => (
                  <li key={id} data-testid={`selected-hjemmel-${id}`}>
                    {navn}
                  </li>
                ))}
            </VStack>
          </div>
        ))}
    </>
  );
};
