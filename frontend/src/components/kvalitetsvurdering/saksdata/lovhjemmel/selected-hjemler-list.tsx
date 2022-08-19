import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React, { useMemo } from 'react';
import { useLovkildeToRegistreringshjemmelForYtelse } from '../../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../../hooks/use-saksdata';
import { ILovKildeToRegistreringshjemmel } from '../../../../types/kodeverk';
import {
  StyledListItem,
  StyledNoneSelected,
  StyledSelectedHjemler,
  StyledSelectedList,
  StyledSelectedSection,
  StyledSelectedSectionHeader,
} from './styled-components';

const EMPTY_LIST: string[] = [];

export const SelectedHjemlerList = () => {
  const [saksdata] = useSaksdata();
  const hjemler = useLovkildeToRegistreringshjemmelForYtelse(saksdata?.ytelseId ?? skipToken);

  const hjemmelIdList = saksdata?.hjemmelIdList ?? EMPTY_LIST;

  const list = useMemo<ILovKildeToRegistreringshjemmel[]>(
    () =>
      hjemler
        .map(({ lovkilde, registreringshjemler }) => ({
          lovkilde,
          registreringshjemler: registreringshjemler.filter((registreringshjemmel) =>
            hjemmelIdList.includes(registreringshjemmel.id)
          ),
        }))
        .filter(({ registreringshjemler }) => registreringshjemler.length !== 0),
    [hjemmelIdList, hjemler]
  );

  if (typeof saksdata === 'undefined') {
    return null;
  }

  return (
    <StyledSelectedHjemler>
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
        <StyledSelectedSection key={lovkilde.id}>
          <StyledSelectedSectionHeader>{lovkilde.navn}</StyledSelectedSectionHeader>

          <StyledSelectedList>
            {registreringshjemler.map(({ navn, id }) => (
              <StyledListItem key={id}>{navn}</StyledListItem>
            ))}
          </StyledSelectedList>
        </StyledSelectedSection>
      ))}
    </>
  );
};
