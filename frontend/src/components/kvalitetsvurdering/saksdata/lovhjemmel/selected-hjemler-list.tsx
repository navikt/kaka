import { useLovkildeToRegistreringshjemmelForYtelse, useYtelseParams } from '@app/hooks/use-kodeverk-value';
import type { ILovKildeToRegistreringshjemmel } from '@app/types/kodeverk';
import { useMemo } from 'react';
import {
  StyledNoneSelected,
  StyledSelectedHjemler,
  StyledSelectedList,
  StyledSelectedSectionHeader,
} from './styled-components';

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
        .filter(({ registreringshjemler }) => registreringshjemler.length !== 0),
    [selected, hjemler],
  );

  return (
    <StyledSelectedHjemler data-testid="selected-hjemler-list">
      <SelectedChildren registreringshjemmelIdList={list} />
    </StyledSelectedHjemler>
  );
};

const SelectedChildren = ({
  registreringshjemmelIdList,
}: {
  registreringshjemmelIdList: ILovKildeToRegistreringshjemmel[];
}) => {
  if (registreringshjemmelIdList.length === 0) {
    return <StyledNoneSelected>Ingen valgte hjemler</StyledNoneSelected>;
  }

  return (
    <>
      {registreringshjemmelIdList.map(({ lovkilde, registreringshjemler }) => (
        <div key={lovkilde.id}>
          <StyledSelectedSectionHeader>{lovkilde.navn}</StyledSelectedSectionHeader>

          <StyledSelectedList>
            {registreringshjemler.map(({ navn, id }) => (
              <li key={id} data-testid={`selected-hjemmel-${id}`}>
                {navn}
              </li>
            ))}
          </StyledSelectedList>
        </div>
      ))}
    </>
  );
};
