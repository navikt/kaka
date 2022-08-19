import { HelpText, Label } from '@navikt/ds-react';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React, { useMemo } from 'react';
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
  const validationError = useValidationError('hjemmelIdList');
  const lovKildeToRegistreringshjemler = useLovkildeToRegistreringshjemmelForYtelse(saksdata?.ytelseId ?? skipToken);

  const options = useMemo(
    () =>
      lovKildeToRegistreringshjemler.map(({ lovkilde, registreringshjemler }) => ({
        sectionHeader: { id: lovkilde.id, name: lovkilde.navn },
        sectionOptions: registreringshjemler.map(({ id, navn }) => ({ value: id, label: navn })),
      })),
    [lovKildeToRegistreringshjemler]
  );

  if (saksdata?.utfallId === UtfallEnum.TRUKKET) {
    return null;
  }

  if (!canEdit) {
    return (
      <section>
        <LabelWithHelpText />
        <SelectedHjemlerList />
      </section>
    );
  }

  const noHjemler = options.length === 0;

  const onLovhjemmelChange = (hjemmelIdList: string[]) => {
    if (typeof user === 'undefined') {
      return;
    }

    updateHjemler({ id: saksdataId, hjemmelIdList, saksbehandlerIdent: user.ident });
  };

  return (
    <section>
      <LabelWithHelpText />
      <LovhjemmelSelect
        disabled={!canEdit || noHjemler}
        options={options}
        selected={saksdata?.hjemmelIdList ?? []}
        onChange={onLovhjemmelChange}
        error={validationError}
        data-testid="lovhjemmel"
        showFjernAlle={false}
        show={canEdit}
        id="hjemmelIdList"
      />
      <SelectedHjemlerList />
    </section>
  );
};

const StyledLabel = styled(Label)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LabelWithHelpText = () => (
  <StyledLabel size="medium" spacing>
    Utfallet er basert på lovhjemmel:
    <HelpText placement="right">
      Hjemlene skal i utgangspunktet være de samme som i klagevedtaket. Dersom saken har flere klagetemaer og kvaliteten
      er bra nok på det ene og mangelfull på det andre, velger du de hjemlene kvalitetsavviket gjelder.
    </HelpText>
  </StyledLabel>
);
