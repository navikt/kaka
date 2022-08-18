import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../../hooks/use-can-edit';
import { useLovkildeToRegistreringshjemmelForYtelse } from '../../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../../hooks/use-validation-error';
import { useSetHjemlerMutation } from '../../../../redux-api/saksdata';
import { useUser } from '../../../../simple-api-state/use-user';
import { UtfallEnum } from '../../../../types/utfall';
import { LovhjemmelSelect } from './lovhjemmel-select';
import { SelectedHjemlerList } from './selected-hjemler-list';

export const Lovhjemmel = () => {
  const { data: user } = useUser();
  const [updateHjemler] = useSetHjemlerMutation();
  const saksdataId = useSaksdataId();
  const [saksdata] = useSaksdata();
  const canEdit = useCanEdit();
  const [localHjemler, setLocalHjemler] = useState<string[]>(saksdata?.hjemmelIdList ?? []);
  const validationError = useValidationError('hjemmelIdList');
  const lovKildeToRegistreringshjemler = useLovkildeToRegistreringshjemmelForYtelse(saksdata?.ytelseId ?? skipToken);

  useEffect(() => {
    if (typeof saksdata === 'undefined') {
      return;
    }

    setLocalHjemler(saksdata.hjemmelIdList);
  }, [saksdata, setLocalHjemler]);

  const options = useMemo(
    () =>
      lovKildeToRegistreringshjemler.map(({ lovkilde, registreringshjemler }) => ({
        sectionHeader: {
          id: lovkilde.id,
          name: lovkilde.navn,
        },
        sectionOptions: registreringshjemler.map(({ id, navn }) => ({
          value: id,
          label: navn,
        })),
      })),
    [lovKildeToRegistreringshjemler]
  );

  if (saksdata?.utfallId === UtfallEnum.TRUKKET) {
    return null;
  }

  if (!canEdit) {
    return (
      <>
        <StyledHeader>Utfallet er basert på lovhjemmel:</StyledHeader>
        <SelectedHjemlerList />
      </>
    );
  }

  const noHjemler = options.length === 0;

  const onLovhjemmelChange = (hjemmelIdList: string[]) => {
    if (typeof user === 'undefined') {
      return;
    }

    setLocalHjemler(hjemmelIdList);
    updateHjemler({ id: saksdataId, hjemmelIdList, saksbehandlerIdent: user.ident });
  };

  return (
    <>
      <StyledHeaderHelpTextWrapper>
        <StyledHeader>Utfallet er basert på lovhjemmel:</StyledHeader>
        <Hjelpetekst>
          Hjemlene skal i utgangspunktet være de samme som i klagevedtaket. Dersom saken har flere klagetemaer og
          kvaliteten er bra nok på det ene og mangelfull på det andre, velger du de hjemlene kvalitetsavviket gjelder.
        </Hjelpetekst>
      </StyledHeaderHelpTextWrapper>
      <LovhjemmelSelect
        disabled={!canEdit || noHjemler}
        options={options}
        selected={localHjemler}
        onChange={onLovhjemmelChange}
        error={validationError}
        data-testid="lovhjemmel"
        showFjernAlle={false}
        show={canEdit}
      />
      <SelectedHjemlerList />
    </>
  );
};

const StyledHeader = styled.h2`
  font-size: 16px;
  font-weight: bold;
`;

const StyledHeaderHelpTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
